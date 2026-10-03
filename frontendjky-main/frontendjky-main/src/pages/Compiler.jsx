import { useEffect, useRef, useState } from "react"

const PLACEHOLDER = `let count: int = 10;
if count > 5 {
  return true;
}`

const KEYWORDS = new Set([
  "let",
  "fn",
  "return",
  "if",
  "else",
  "while",
  "true",
  "false",
])

const TYPES = new Set([
  "int",
  "float",
  "bool",
  "string",
])

const OPERATORS = new Set([
  "+",
  "-",
  "*",
  "/",
  "%",
  "=",
  "==",
  "!=",
  ">=",
  "<=",
  ">",
  "<",
  "&&",
  "||",
  "!",
])


/*
|--------------------------------------------------------------------------
| Read the plain text from the editor
|--------------------------------------------------------------------------
*/

function getEditorText(root) {
  if (!root) {
    return ""
  }

  return root.innerText.replace(/\u00a0/g, " ")
}


/*
|--------------------------------------------------------------------------
| Insert text at the current cursor position
|--------------------------------------------------------------------------
*/

function insertTextAtCursor(text) {

  const selection =
    window.getSelection()

  if (
    !selection ||
    selection.rangeCount === 0
  ) {
    return false
  }

  const range =
    selection.getRangeAt(0)

  const editor =
    document.querySelector(
      ".jocky-code-input"
    )

  if (
    !editor ||
    !editor.contains(
      selection.anchorNode
    )
  ) {
    return false
  }

  range.deleteContents()

  const node =
    document.createTextNode(
      text.replace(/\r\n/g, "\n")
    )

  range.insertNode(node)

  range.setStartAfter(node)

  range.collapse(true)

  selection.removeAllRanges()

  selection.addRange(range)

  return true
}


/*
|--------------------------------------------------------------------------
| Install the variable highlight style
|--------------------------------------------------------------------------
|
| The rest of the highlight colours already exist in index.css.
|
| We only need one additional colour for ordinary variables.
|
| This lets us keep the change isolated to Compiler.jsx.
|--------------------------------------------------------------------------
*/

function ensureVariableHighlightStyle() {

  if (
    document.getElementById(
      "jocky-variable-highlight-style"
    )
  ) {
    return
  }

  const style =
    document.createElement("style")

  style.id =
    "jocky-variable-highlight-style"

  style.textContent = `
    ::highlight(jocky-variable) {
      color: #f4f4f4;
    }
  `

  document.head.appendChild(style)
}


/*
|--------------------------------------------------------------------------
| Create syntax highlight ranges
|--------------------------------------------------------------------------
|
| IMPORTANT:
|
| We NEVER modify editor.innerHTML here.
|
| The contentEditable remains the single source of truth.
|
| CSS Custom Highlights only paint colours over the existing
| text. This prevents the duplication/caret problems we had earlier.
|--------------------------------------------------------------------------
*/

function createHighlightRanges(
  root,
  source
) {

  if (
    !root ||
    !source ||
    !window.CSS?.highlights
  ) {
    return
  }


  /*
  ------------------------------------------------------------------------
  Make sure the variable colour exists.
  ------------------------------------------------------------------------
  */

  ensureVariableHighlightStyle()


  /*
  ------------------------------------------------------------------------
  Highlight groups
  ------------------------------------------------------------------------
  */

  const highlightNames = [

    "jocky-comment",

    "jocky-string",

    "jocky-number",

    "jocky-keyword",

    "jocky-type",

    "jocky-operator",

    "jocky-variable",

    "jocky-declaration",

    "jocky-function",

  ]


  /*
  ------------------------------------------------------------------------
  Remove old ranges
  ------------------------------------------------------------------------
  */

  highlightNames.forEach(
    (name) => {

      window.CSS.highlights.delete(
        name
      )

    }
  )


  /*
  ------------------------------------------------------------------------
  Create new highlight objects
  ------------------------------------------------------------------------
  */

  const highlights =
    new Map(

      highlightNames.map(
        (name) => [

          name,

          new Highlight(),

        ]
      )

    )


  /*
  ------------------------------------------------------------------------
  Find every text node inside the editor.

  We do NOT change these nodes.
  ------------------------------------------------------------------------
  */

  const textNodes = []

  const walker =
    document.createTreeWalker(
      root,
      NodeFilter.SHOW_TEXT
    )

  let node

  while (
    (node = walker.nextNode())
  ) {

    textNodes.push(node)

  }


  if (
    !textNodes.length
  ) {

    return

  }


  /*
  ------------------------------------------------------------------------
  Convert a character position in the source string into a DOM position.
  ------------------------------------------------------------------------
  */

  const locatePosition =
    (position) => {

      let remaining =
        position


      for (
        const textNode
        of textNodes
      ) {

        const length =
          textNode.textContent.length


        if (
          remaining <= length
        ) {

          return {

            node: textNode,

            offset: remaining,

          }

        }


        remaining -= length

      }


      const last =
        textNodes[
          textNodes.length - 1
        ]


      return {

        node: last,

        offset:
          last.textContent.length,

      }

    }


  /*
  ------------------------------------------------------------------------
  Add a highlight range
  ------------------------------------------------------------------------
  */

  const addRange =
    (
      name,
      start,
      end
    ) => {

      if (
        end <= start
      ) {

        return

      }


      const from =
        locatePosition(start)

      const to =
        locatePosition(end)


      const range =
        new Range()


      range.setStart(
        from.node,
        from.offset
      )

      range.setEnd(
        to.node,
        to.offset
      )


      highlights
        .get(name)
        .add(range)

    }


  /*
  ------------------------------------------------------------------------
  JOCKY lexer pattern
  ------------------------------------------------------------------------
  */

  const tokenPattern =
    /(\/\/[^\n]*|"(?:\\.|[^"\\])*"|\b\d+(?:\.\d+)?\b|\b[A-Za-z_][A-Za-z0-9_]*\b|==|!=|>=|<=|&&|\|\||[+\-*/%=!<>])/g


  let match


  /*
  ------------------------------------------------------------------------
  Walk through every token
  ------------------------------------------------------------------------
  */

  while (
    (match =
      tokenPattern.exec(source)) !== null
  ) {

    const token =
      match[0]

    const start =
      match.index

    const end =
      start + token.length


    /*
    ----------------------------------------------------------------------
    Comments
    ----------------------------------------------------------------------
    */

    if (
      token.startsWith("//")
    ) {

      addRange(
        "jocky-comment",
        start,
        end
      )

      continue

    }


    /*
    ----------------------------------------------------------------------
    Strings
    ----------------------------------------------------------------------
    */

    if (
      token.startsWith('"')
    ) {

      addRange(
        "jocky-string",
        start,
        end
      )

      continue

    }


    /*
    ----------------------------------------------------------------------
    Numbers

    Example:

    10
    100
    3.14
    ----------------------------------------------------------------------
    */

    if (
      /^\d/.test(token)
    ) {

      addRange(
        "jocky-number",
        start,
        end
      )

      continue

    }


    /*
    ----------------------------------------------------------------------
    Keywords

    Example:

    let
    if
    else
    return
    while
    fn
    true
    false
    ----------------------------------------------------------------------
    */

    if (
      KEYWORDS.has(token)
    ) {

      addRange(
        "jocky-keyword",
        start,
        end
      )

      continue

    }


    /*
    ----------------------------------------------------------------------
    Types

    Example:

    int
    float
    bool
    string
    ----------------------------------------------------------------------
    */

    if (
      TYPES.has(token)
    ) {

      addRange(
        "jocky-type",
        start,
        end
      )

      continue

    }


    /*
    ----------------------------------------------------------------------
    Operators

    Example:

    =
    +
    -
    >
    ==
    &&
    ----------------------------------------------------------------------
    */

    if (
      OPERATORS.has(token)
    ) {

      addRange(
        "jocky-operator",
        start,
        end
      )

      continue

    }


    /*
    ----------------------------------------------------------------------
    Identifiers / Variables
    ----------------------------------------------------------------------

    Anything matching:

    username
    count
    result
    print
    value

    is an identifier.

    We then specialize it if it is:

    1. A variable declaration
    2. A function call

    Otherwise it gets ordinary variable styling.
    ----------------------------------------------------------------------
    */

    if (
      /^[A-Za-z_]/.test(token)
    ) {

      const before =
        source.slice(
          0,
          start
        )

      const after =
        source.slice(
          end
        )


      /*
      --------------------------------------------------------------------
      Variable declaration

      Example:

      let count

      "count" gets declaration styling.
      --------------------------------------------------------------------
      */

      if (
        /\blet\s*$/.test(
          before
        )
      ) {

        addRange(
          "jocky-declaration",
          start,
          end
        )

        continue

      }


      /*
      --------------------------------------------------------------------
      Function call

      Example:

      calculate()

      print()

      scan()
      --------------------------------------------------------------------
      */

      if (
        /^\s*\(/.test(after)
      ) {

        addRange(
          "jocky-function",
          start,
          end
        )

        continue

      }


      /*
      --------------------------------------------------------------------
      NORMAL VARIABLE / IDENTIFIER

      This was the missing part in the previous version.

      Example:

      count
      username
      result
      value

      These now receive their own highlight.
      --------------------------------------------------------------------
      */

      addRange(
        "jocky-variable",
        start,
        end
      )

    }

  }


  /*
  ------------------------------------------------------------------------
  Register all highlight groups with the browser.
  ------------------------------------------------------------------------
  */

  highlights.forEach(
    (highlight, name) => {

      if (
        highlight.size > 0
      ) {

        window.CSS.highlights.set(
          name,
          highlight
        )

      }

    }
  )

}


/*
|--------------------------------------------------------------------------
| Code Editor
|--------------------------------------------------------------------------
*/

function CodeEditor({
  value,
  onChange,
}) {

  const editorRef =
    useRef(null)

  const gutterRef =
    useRef(null)

  const initializedRef =
    useRef(false)


  /*
  ------------------------------------------------------------------------
  Number of lines
  ------------------------------------------------------------------------
  */

  const lineCount =
    Math.max(
      1,
      value.split("\n").length
    )


  /*
  ------------------------------------------------------------------------
  Initialize editor once
  ------------------------------------------------------------------------
  */

  useEffect(() => {

    const editor =
      editorRef.current


    if (
      !editor ||
      initializedRef.current
    ) {

      return

    }


    editor.textContent =
      value

    initializedRef.current =
      true

  }, [value])


  /*
  ------------------------------------------------------------------------
  Update syntax highlighting whenever source changes
  ------------------------------------------------------------------------
  */

  useEffect(() => {

    const editor =
      editorRef.current


    if (!editor) {

      return

    }


    const current =
      getEditorText(editor)


    /*
    IMPORTANT:

    Do NOT write editor.textContent here.

    That would destroy the cursor and selection.

    The user is already editing the correct DOM.
    */

    if (
      current !== value
    ) {

      return

    }


    /*
    Only paint highlights.
    */

    createHighlightRanges(
      editor,
      value
    )


    /*
    Cleanup old highlight groups when leaving the page.
    */

    return () => {

      const names = [

        "jocky-comment",

        "jocky-string",

        "jocky-number",

        "jocky-keyword",

        "jocky-type",

        "jocky-operator",

        "jocky-variable",

        "jocky-declaration",

        "jocky-function",

      ]


      if (
        window.CSS?.highlights
      ) {

        names.forEach(
          (name) => {

            window.CSS.highlights.delete(
              name
            )

          }
        )

      }

    }

  }, [value])


  /*
  ------------------------------------------------------------------------
  Input
  ------------------------------------------------------------------------
  */

  function handleInput() {

    const editor =
      editorRef.current


    if (!editor) {

      return

    }


    onChange(
      getEditorText(editor)
    )

  }


  /*
  ------------------------------------------------------------------------
  Tab handling
  ------------------------------------------------------------------------
  */

  function handleKeyDown(event) {

    if (
      event.key === "Tab"
    ) {

      event.preventDefault()


      if (
        insertTextAtCursor("  ")
      ) {

        handleInput()

      }

    }

  }


  /*
  ------------------------------------------------------------------------
  Paste handling
  ------------------------------------------------------------------------
  */

  function handlePaste(event) {

    event.preventDefault()


    const text =
      event.clipboardData.getData(
        "text/plain"
      )


    if (
      insertTextAtCursor(text)
    ) {

      handleInput()

    }

  }


  /*
  ------------------------------------------------------------------------
  Scroll handling
  ------------------------------------------------------------------------
  */

  function handleScroll(event) {

    if (
      gutterRef.current
    ) {

      gutterRef.current.scrollTop =
        event.currentTarget.scrollTop

    }

  }


  return (

    <div className="jocky-code-body">


      {/* ================================================================
          LINE NUMBERS
      ================================================================ */}

      <div
        ref={gutterRef}
        className="jocky-code-gutter"
        aria-hidden="true"
      >

        {Array.from(
          {
            length:
              lineCount,
          },

          (_, index) => (

            <span
              key={index}
            >
              {index + 1}
            </span>

          )

        )}

      </div>


      {/* ================================================================
          EDITOR
      ================================================================ */}

      <div
        className="jocky-code-stage"
        onScroll={handleScroll}
      >

        <div
          ref={editorRef}
          className="jocky-code-input"
          contentEditable
          suppressContentEditableWarning
          spellCheck={false}
          autoCorrect="off"
          autoCapitalize="off"
          autoComplete="off"
          role="textbox"
          aria-multiline="true"
          aria-label="JOCKY source editor"
          data-placeholder={PLACEHOLDER}
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
        />

      </div>

    </div>

  )
}


/*
|--------------------------------------------------------------------------
| Compiler Page
|--------------------------------------------------------------------------
*/

function Compiler() {

  const [source, setSource] =
    useState("")

  const [submitted, setSubmitted] =
    useState(false)


  /*
  ------------------------------------------------------------------------
  Source update
  ------------------------------------------------------------------------
  */

  function updateSource(value) {

    setSource(value)

    setSubmitted(false)

  }


  /*
  ------------------------------------------------------------------------
  Submit
  ------------------------------------------------------------------------
  */

  function handleSubmit(event) {

    event.preventDefault()


    if (
      source.trim()
    ) {

      setSubmitted(true)

    }

  }


  /*
  ------------------------------------------------------------------------
  Render
  ------------------------------------------------------------------------
  */

  return (

    <main className="jocky-page">

      <div>


        {/* ==============================================================
            HEADER
        ============================================================== */}

        <header
          className="jocky-page-header"
        >

          <div>

            <div className="jocky-eyebrow">
              BUILD / COMPILER
            </div>

            <h1>
              Compiler
            </h1>

            <p>
              Write and submit JOCKY source using the language grammar.
            </p>

          </div>


          <div className="jocky-page-header-meta">
            
          </div>

        </header>


        {/* ==============================================================
            COMPILER
        ============================================================== */}

        <form
          onSubmit={handleSubmit}
        >


          <section
            className="jocky-editor-panel"
          >


            {/* ----------------------------------------------------------
                EDITOR TOOLBAR
            ---------------------------------------------------------- */}

            <div
              className="jocky-code-toolbar"
            >

              <div
                className="jocky-code-toolbar-file"
              >

                <span
                  className="jocky-code-dot"
                />

                <span>
                  source.jocky
                </span>

              </div>


              <span
                className="jocky-code-toolbar-meta"
              >
                JOCKY LANG · UTF-8 · LF
              </span>

            </div>


            {/* ----------------------------------------------------------
                ACTUAL EDITOR
            ---------------------------------------------------------- */}

            <CodeEditor
              value={source}
              onChange={updateSource}
            />

          </section>


          {/* ============================================================
              ACTIONS
          ============================================================ */}

          <div
            className="jocky-editor-actions"
          >

            <button
              type="submit"
              className="jocky-carbon-button"
              disabled={!source.trim()}
            >
              Submit source
            </button>


            <button
              type="button"
              className="jocky-carbon-button secondary"
              onClick={() =>
                updateSource("")
              }
            >
              Clear
            </button>


            {submitted && (

              <span
                className="jocky-inline-success"
              >
                Source submitted
              </span>

            )}

          </div>

        </form>


        {/* ==============================================================
            GRAMMAR REFERENCE
        ============================================================== */}

        <section
          className="jocky-grammar-strip"
        >

          <div>

            <span
              className="jocky-grammar-keyword"
            >
              Keywords
            </span>

            {" "}
            let · fn · return · if · else · while

          </div>


          <div>

            <span
              className="jocky-grammar-keyword"
            >
              Types
            </span>

            {" "}
            int · float · bool · string

          </div>


          <div>

            <span
              className="jocky-grammar-keyword"
            >
              Operators
            </span>

            {" "}
            + · - · * · / · % · == · != · && · ||

          </div>

        </section>

      </div>

    </main>

  )
}


export default Compiler
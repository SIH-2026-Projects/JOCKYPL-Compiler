import { useEffect, useMemo, useRef, useState } from "react"
import { Bell, Command, Search, UserRound, X } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"

const searchIndex = [
  { label: "Dashboard", path: "/", section: "Operations", keywords: "command center operations overview hosts jobs findings" },
  { label: "Hosts", path: "/hosts", section: "Operations", keywords: "machines nodes systems collection" },
  { label: "Jobs", path: "/jobs", section: "Operations", keywords: "jobs collection runs status" },
  { label: "Evidence", path: "/evidence", section: "Operations", keywords: "evidence files forensic artifacts" },
  { label: "Timeline", path: "/timeline", section: "Operations", keywords: "events chronology forensic" },
  { label: "Findings", path: "/findings", section: "Operations", keywords: "findings alerts severity correlation" },
  { label: "Compiler", path: "/compiler", section: "Build", keywords: "code compiler source syntax variables types" },
  { label: "Pipelines", path: "/pipelines", section: "Build", keywords: "pipeline build workflow" },
  { label: "Artifacts", path: "/artifacts", section: "Build", keywords: "artifacts variants binaries hashes" },
  { label: "Research & Simulation", path: "/research", section: "Research", keywords: "research simulation benchmark polymorphism" },
]

function TopBar() {
  const navigate = useNavigate()
  const location = useLocation()
  const inputRef = useRef(null)
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return searchIndex.slice(0, 6)
    return searchIndex
      .filter((item) => `${item.label} ${item.section} ${item.keywords}`.toLowerCase().includes(normalized))
      .slice(0, 7)
  }, [query])

  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        inputRef.current?.focus()
        setOpen(true)
      }
      if (event.key === "Escape") {
        setOpen(false)
        inputRef.current?.blur()
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  function go(item) {
    navigate(item.path)
    setQuery("")
    setOpen(false)
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" && results[0]) {
      event.preventDefault()
      go(results[0])
    }
  }

  return (
    <header className="jocky-topbar">
      <div className="jocky-topbar-brand">
        <div className="jocky-mark" aria-hidden="true">
          <Command size={17} strokeWidth={2.5} />
        </div>
        <div className="jocky-brand-copy">
          <div className="jocky-wordmark">JOCKY</div>
          <div className="jocky-product">FORENSIC ENGINEERING</div>
        </div>
      </div>

      <div className="jocky-topbar-center">
        <div className={`jocky-search${open ? " is-open" : ""}`}>
          <Search size={15} aria-hidden="true" />
          <input
            ref={inputRef}
            aria-label="Search JOCKY"
            placeholder="Search the workspace"
            value={query}
            onFocus={() => setOpen(true)}
            onChange={(event) => {
              setQuery(event.target.value)
              setOpen(true)
            }}
            onKeyDown={handleKeyDown}
          />
          {query ? (
            <button className="jocky-search-clear" type="button" onClick={() => setQuery("")} aria-label="Clear search">
              <X size={14} />
            </button>
          ) : (
            <kbd>⌘ K</kbd>
          )}

          {open && (
            <div className="jocky-search-results" role="listbox">
              <div className="jocky-search-heading">{query ? "MATCHES" : "NAVIGATE"}</div>
              {results.length > 0 ? results.map((item) => (
                <button key={item.path} type="button" className={`jocky-search-result${location.pathname === item.path ? " current" : ""}`} onMouseDown={(event) => event.preventDefault()} onClick={() => go(item)}>
                  <span className="jocky-search-result-name">{item.label}</span>
                  <span className="jocky-search-result-section">{item.section}</span>
                </button>
              )) : (
                <div className="jocky-search-empty">No local matches</div>
              )}
              <div className="jocky-search-hint">Enter to open · Esc to close</div>
            </div>
          )}
        </div>
      </div>

      <div className="jocky-topbar-meta">
        <button className="jocky-icon-button" aria-label="Notifications" title="Notifications"><Bell size={16} /></button>
        <button className="jocky-avatar" aria-label="Account" title="Account"><UserRound size={15} /></button>
      </div>
    </header>
  )
}

export default TopBar

import {
  LayoutDashboard,
  Server,
  BriefcaseBusiness,
  FileSearch,
  Clock3,
  CircleCheck,
  TerminalSquare,
  Workflow,
  Package,
  FlaskConical,
} from "lucide-react"

import { NavLink } from "react-router-dom"

const navigation = [
  { label: "Dashboard", path: "/", icon: LayoutDashboard },
  { label: "Hosts", path: "/hosts", icon: Server },
  { label: "Jobs", path: "/jobs", icon: BriefcaseBusiness },
  { label: "Evidence", path: "/evidence", icon: FileSearch },
  { label: "Timeline", path: "/timeline", icon: Clock3 },
  { label: "Findings", path: "/findings", icon: CircleCheck },
  { label: "Compiler", path: "/compiler", icon: TerminalSquare },
  { label: "Pipelines", path: "/pipelines", icon: Workflow },
  { label: "Artifacts", path: "/artifacts", icon: Package },
  { label: "Research", path: "/research", icon: FlaskConical },
]

function Sidebar() {
  return (
    <aside
      className="jocky-sidebar"
      style={{
        width: "248px",
        minWidth: "248px",
        flexBasis: "248px",
        background: "#ffffff",
        borderRight: "1px solid #e0e0e0",
      }}
    >
      <nav
        className="jocky-nav"
        style={{
          width: "100%",
          paddingTop: "8px",
          paddingBottom: "8px",
        }}
      >
        <div
          style={{
            padding: "8px 16px 7px 20px",
            color: "#6f6f6f",
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: "9px",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Workspace
        </div>

        <div
          className="jocky-nav-group"
          style={{
            borderBottom: "1px solid #e0e0e0",
            paddingBottom: "8px",
          }}
        >
          {navigation.map(
            ({
              label,
              path,
              icon: Icon,
            }) => (
              <NavLink
                key={path}
                to={path}
                end={path === "/"}
                className={({ isActive }) =>
                  `jocky-nav-link ${
                    isActive ? "is-active" : ""
                  }`
                }
                style={({ isActive }) => ({
                  width: "248px",
                  height: "44px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  gap: "14px",
                  padding:
                    "0 16px 0 20px",
                  boxSizing: "border-box",
                  color:
                    isActive
                      ? "#161616"
                      : "#525252",
                  background:
                    isActive
                      ? "#e0e0e0"
                      : "transparent",
                  borderLeft:
                    isActive
                      ? "3px solid #0f62fe"
                      : "3px solid transparent",
                  textDecoration: "none",
                  fontFamily:
                    '"IBM Plex Sans", sans-serif',
                  fontSize: "13px",
                  fontWeight:
                    isActive
                      ? 500
                      : 400,
                  transition:
                    "background-color 120ms ease-out, color 120ms ease-out",
                })}
              >
                <Icon
                  size={18}
                  strokeWidth={1.7}
                  style={{
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    position: "static",
                    width: "auto",
                    height: "auto",
                    minWidth: 0,
                    overflow: "visible",
                    clip: "auto",
                    clipPath: "none",
                    whiteSpace: "nowrap",
                    display: "block",
                    visibility: "visible",
                    opacity: 1,
                    color: "inherit",
                    lineHeight: "1.2",
                  }}
                >
                  {label}
                </span>
              </NavLink>
            )
          )}
        </div>
      </nav>

      <div
        style={{
          borderTop:
            "1px solid #e0e0e0",
          padding:
            "12px 16px",
          background:
            "#f4f4f4",
        }}
      >
        <div
          style={{
            color: "#161616",
            fontFamily:
              '"IBM Plex Mono", monospace',
            fontSize: "10px",
            fontWeight: 600,
            letterSpacing: "0.04em",
          }}
        >
          JOCKY
        </div>
        <div
          style={{
            marginTop: "3px",
            color: "#6f6f6f",
            fontFamily:
              '"IBM Plex Mono", monospace',
            fontSize: "9px",
          }}
        >
          FORENSIC ENGINEERING
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
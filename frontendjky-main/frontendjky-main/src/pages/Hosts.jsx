import { useState } from "react"

const hosts = [
  {
    id: "host-001",
    hostname: "DESKTOP-FORENSICS",
    type: "REAL",
    status: "ONLINE",
  },
  {
    id: "host-002",
    hostname: "UBUNTU-LAB",
    type: "SIMULATED",
    status: "ONLINE",
  },
  {
    id: "host-003",
    hostname: "ARCH-LEGACY",
    type: "SIMULATED",
    status: "OFFLINE",
  },
]

function StatusIndicator({ status }) {
  const isOnline = status === "ONLINE"
  const isOffline = status === "OFFLINE"

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        fontFamily: '"IBM Plex Mono", monospace',
        fontSize: "12px",
        color: "#161616",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: "7px",
          height: "7px",
          borderRadius: "50%",
          background: isOnline
            ? "#198038"
            : isOffline
              ? "#da1e28"
              : "#8d8d8d",
        }}
      />
      {status}
    </span>
  )
}

function Metric({ label, value, inverted = false }) {
  return (
    <div
      style={{
        minHeight: "112px",
        padding: "18px 20px",
        background: inverted ? "#161616" : "#ffffff",
        color: inverted ? "#ffffff" : "#161616",
        borderRight: inverted ? "1px solid #393939" : "1px solid #d0d0d0",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          marginBottom: "24px",
          fontFamily: '"IBM Plex Sans", sans-serif',
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: inverted ? "#c6c6c6" : "#6f6f6f",
        }}
      >
        {label}
      </div>

      <div
        style={{
          fontFamily: '"IBM Plex Mono", monospace',
          fontSize: "32px",
          lineHeight: 1,
          fontWeight: 400,
        }}
      >
        {value}
      </div>
    </div>
  )
}

function Hosts() {
  const [selectedHost, setSelectedHost] = useState(hosts[0])

  const online = hosts.filter((host) => host.status === "ONLINE").length
  const offline = hosts.filter((host) => host.status === "OFFLINE").length
  const simulated = hosts.filter((host) => host.type === "SIMULATED").length

  return (
    <main
      className="jocky-page min-w-0 flex-1 overflow-auto"
      style={{
        background: "#f4f4f4",
        color: "#161616",
      }}
    >
      <div
        style={{
          maxWidth: "1600px",
          margin: "0 auto",
          padding: "32px 36px 48px",
          boxSizing: "border-box",
        }}
      >
        {/* =========================================================
            PAGE HEADER
        ========================================================= */}

        <header
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "32px",
            paddingBottom: "24px",
            borderBottom: "1px solid #a8a8a8",
          }}
        >
          <div>
            <div
              style={{
                marginBottom: "10px",
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#6f6f6f",
              }}
            >
              Endpoint Management / Workspace
            </div>

            <h1
              style={{
                margin: 0,
                fontFamily: '"IBM Plex Sans", sans-serif',
                fontSize: "36px",
                lineHeight: 1.1,
                fontWeight: 400,
                letterSpacing: "-0.02em",
              }}
            >
              Hosts
            </h1>

            <p
              style={{
                margin: "10px 0 0",
                fontFamily: '"IBM Plex Sans", sans-serif',
                fontSize: "14px",
                color: "#525252",
              }}
            >
              Managed endpoints registered with the platform
            </p>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "stretch",
              gap: "8px",
            }}
          >
            <button
              type="button"
              onClick={() => setSelectedHost(hosts[0])}
              style={{
                height: "40px",
                padding: "0 18px",
                border: "1px solid #8d8d8d",
                background: "#ffffff",
                color: "#161616",
                fontFamily: '"IBM Plex Sans", sans-serif',
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              Refresh
            </button>

            <button
              type="button"
              style={{
                height: "40px",
                padding: "0 18px",
                border: "1px solid #161616",
                background: "#161616",
                color: "#ffffff",
                fontFamily: '"IBM Plex Sans", sans-serif',
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              + Add host
            </button>
          </div>
        </header>

        {/* =========================================================
            BLACK STATUS BANNER
        ========================================================= */}

        <section
          style={{
            marginTop: "24px",
            display: "grid",
            gridTemplateColumns: "minmax(260px, 1.5fr) repeat(3, 1fr)",
            background: "#161616",
            color: "#ffffff",
            border: "1px solid #161616",
          }}
        >
          <div
            style={{
              padding: "22px 24px",
              minHeight: "128px",
              boxSizing: "border-box",
              borderRight: "1px solid #393939",
            }}
          >
            <div
              style={{
                marginBottom: "28px",
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: "10px",
                letterSpacing: "0.1em",
                color: "#a8a8a8",
              }}
            >
              SYSTEM / ENDPOINT INVENTORY
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "14px",
              }}
            >
              <span
                style={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: "42px",
                  lineHeight: 1,
                }}
              >
                {String(hosts.length).padStart(2, "0")}
              </span>

              <span
                style={{
                  fontFamily: '"IBM Plex Sans", sans-serif',
                  fontSize: "13px",
                  color: "#c6c6c6",
                }}
              >
                registered endpoints
              </span>
            </div>
          </div>

          <Metric label="Online" value={String(online).padStart(2, "0")} inverted />
          <Metric label="Offline" value={String(offline).padStart(2, "0")} inverted />
          <Metric
            label="Simulated"
            value={String(simulated).padStart(2, "0")}
            inverted
          />
        </section>

        {/* =========================================================
            TABLE
        ========================================================= */}

        <section style={{ marginTop: "36px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: "12px",
            }}
          >
            <div>
              <h2
                style={{
                  margin: 0,
                  fontFamily: '"IBM Plex Sans", sans-serif',
                  fontSize: "18px",
                  fontWeight: 600,
                }}
              >
                Managed hosts
              </h2>

              <p
                style={{
                  margin: "5px 0 0",
                  fontFamily: '"IBM Plex Sans", sans-serif',
                  fontSize: "12px",
                  color: "#6f6f6f",
                }}
              >
                Select an endpoint to inspect its current registration.
              </p>
            </div>

            <span
              style={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: "10px",
                color: "#6f6f6f",
              }}
            >
              {String(hosts.length).padStart(2, "0")} ENDPOINTS
            </span>
          </div>

          <div
            style={{
              border: "1px solid #c6c6c6",
              background: "#ffffff",
              overflowX: "auto",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                tableLayout: "fixed",
              }}
            >
              <thead>
                <tr style={{ background: "#e0e0e0" }}>
                  {["Host", "Hostname", "Type", "Status", ""].map(
                    (heading, index) => (
                      <th
                        key={`${heading}-${index}`}
                        style={{
                          height: "42px",
                          padding: "0 16px",
                          textAlign: "left",
                          fontFamily: '"IBM Plex Sans", sans-serif',
                          fontSize: "11px",
                          fontWeight: 600,
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                          color: "#525252",
                          borderBottom: "1px solid #a8a8a8",
                          width:
                            index === 0
                              ? "18%"
                              : index === 1
                                ? "30%"
                                : index === 2
                                  ? "18%"
                                  : index === 3
                                    ? "24%"
                                    : "10%",
                        }}
                      >
                        {heading}
                      </th>
                    )
                  )}
                </tr>
              </thead>

              <tbody>
                {hosts.map((host) => {
                  const selected = selectedHost.id === host.id

                  return (
                    <tr
                      key={host.id}
                      tabIndex={0}
                      onClick={() => setSelectedHost(host)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault()
                          setSelectedHost(host)
                        }
                      }}
                      style={{
                        height: "58px",
                        cursor: "pointer",
                        background: selected ? "#e8f1ff" : "#ffffff",
                        boxShadow: selected
                          ? "inset 4px 0 0 #0f62fe"
                          : "inset 4px 0 0 transparent",
                      }}
                    >
                      <td
                        style={{
                          padding: "0 16px",
                          borderBottom: "1px solid #e0e0e0",
                          fontFamily: '"IBM Plex Mono", monospace',
                          fontSize: "12px",
                          color: "#0f62fe",
                        }}
                      >
                        {host.id}
                      </td>

                      <td
                        style={{
                          padding: "0 16px",
                          borderBottom: "1px solid #e0e0e0",
                          fontFamily: '"IBM Plex Mono", monospace',
                          fontSize: "12px",
                          color: "#161616",
                        }}
                      >
                        {host.hostname}
                      </td>

                      <td
                        style={{
                          padding: "0 16px",
                          borderBottom: "1px solid #e0e0e0",
                          fontFamily: '"IBM Plex Sans", sans-serif',
                          fontSize: "12px",
                          color: "#525252",
                        }}
                      >
                        {host.type}
                      </td>

                      <td
                        style={{
                          padding: "0 16px",
                          borderBottom: "1px solid #e0e0e0",
                        }}
                      >
                        <StatusIndicator status={host.status} />
                      </td>

                      <td
                        style={{
                          padding: "0 16px",
                          textAlign: "right",
                          borderBottom: "1px solid #e0e0e0",
                          fontFamily: '"IBM Plex Sans", sans-serif',
                          fontSize: "18px",
                          color: selected ? "#0f62fe" : "#6f6f6f",
                        }}
                      >
                        →
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================
            SELECTED HOST / BLACK DETAIL PANEL
        ========================================================= */}

        <section style={{ marginTop: "36px" }}>
          <div
            style={{
              marginBottom: "12px",
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#6f6f6f",
            }}
          >
            Selected endpoint
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(280px, 1.15fr) 1fr 1fr",
              background: "#161616",
              color: "#ffffff",
              border: "1px solid #161616",
            }}
          >
            <div
              style={{
                padding: "24px",
                borderRight: "1px solid #393939",
              }}
            >
              <div
                style={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: "11px",
                  color: "#8d8d8d",
                  marginBottom: "10px",
                }}
              >
                HOST ID
              </div>

              <div
                style={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: "22px",
                  color: "#ffffff",
                }}
              >
                {selectedHost.id}
              </div>

              <div
                style={{
                  marginTop: "8px",
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: "12px",
                  color: "#c6c6c6",
                }}
              >
                {selectedHost.hostname}
              </div>
            </div>

            <div
              style={{
                padding: "24px",
                borderRight: "1px solid #393939",
              }}
            >
              <div
                style={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: "11px",
                  color: "#8d8d8d",
                  marginBottom: "14px",
                }}
              >
                CONFIGURATION
              </div>

              <div
                style={{
                  display: "grid",
                  gap: "12px",
                  fontFamily: '"IBM Plex Sans", sans-serif',
                  fontSize: "12px",
                }}
              >
                <div>
                  <span style={{ color: "#8d8d8d" }}>TYPE</span>
                  <span style={{ marginLeft: "18px", color: "#ffffff" }}>
                    {selectedHost.type}
                  </span>
                </div>

                <div>
                  <span style={{ color: "#8d8d8d" }}>STATUS</span>
                  <span style={{ marginLeft: "12px" }}>
                    <StatusIndicator status={selectedHost.status} />
                  </span>
                </div>
              </div>
            </div>

            <div
              style={{
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "20px",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: "11px",
                    color: "#8d8d8d",
                    marginBottom: "14px",
                  }}
                >
                  AVAILABLE ACTIONS
                </div>

                <div
                  style={{
                    fontFamily: '"IBM Plex Sans", sans-serif',
                    fontSize: "12px",
                    lineHeight: 1.6,
                    color: "#c6c6c6",
                  }}
                >
                  Inspect the endpoint or collect its latest system
                  information.
                </div>
              </div>

              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  type="button"
                  style={{
                    height: "36px",
                    padding: "0 14px",
                    border: "1px solid #8d8d8d",
                    background: "#ffffff",
                    color: "#161616",
                    fontFamily: '"IBM Plex Sans", sans-serif',
                    fontSize: "12px",
                    cursor: "pointer",
                  }}
                >
                  Inspect
                </button>

                <button
                  type="button"
                  style={{
                    height: "36px",
                    padding: "0 14px",
                    border: "1px solid #ffffff",
                    background: "#161616",
                    color: "#ffffff",
                    fontFamily: '"IBM Plex Sans", sans-serif',
                    fontSize: "12px",
                    cursor: "pointer",
                  }}
                >
                  Collect
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SYSTEM INFORMATION
        ========================================================= */}

        <section
          style={{
            marginTop: "36px",
            borderTop: "1px solid #a8a8a8",
            paddingTop: "22px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "20px",
              alignItems: "flex-start",
            }}
          >
            <div>
              <h2
                style={{
                  margin: 0,
                  fontFamily: '"IBM Plex Sans", sans-serif',
                  fontSize: "17px",
                  fontWeight: 600,
                }}
              >
                System information
              </h2>

              <p
                style={{
                  margin: "5px 0 0",
                  fontFamily: '"IBM Plex Sans", sans-serif',
                  fontSize: "12px",
                  color: "#6f6f6f",
                }}
              >
                Configuration gathered from the host collection adapter.
              </p>
            </div>

            <span
              style={{
                padding: "5px 8px",
                background: "#161616",
                color: "#ffffff",
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: "9px",
                letterSpacing: "0.08em",
              }}
            >
              HOST ADAPTER
            </span>
          </div>

          <div
            style={{
              marginTop: "18px",
              padding: "16px",
              background: "#ffffff",
              border: "1px solid #d0d0d0",
              borderLeft: "4px solid #161616",
              fontFamily: '"IBM Plex Sans", sans-serif',
              fontSize: "12px",
              color: "#525252",
            }}
          >
            System information is returned by the host system-info endpoint.
          </div>
        </section>
      </div>
    </main>
  )
}

export default Hosts

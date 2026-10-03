import { useMemo, useState } from "react"

const initialFindings = [
  {
    id: "finding-001",
    title: "Suspicious Process/Network Correlation",
    description:
      "A process start was followed by an outbound network connection within a 2-second window.",
    severity: "HIGH",
    status: "OPEN",
    host_id: "host-001",
    created_at: "2026-09-28T10:35:00Z",
    evidence_ids: ["evidence-001", "evidence-009"],
  },
  {
    id: "finding-002",
    host_id: "host-001",
    severity: "MEDIUM",
    status: "REVIEWED",
    evidence_ids: [],
  },
  {
    id: "finding-003",
    host_id: "host-002",
    severity: "INFO",
    status: "DISMISSED",
    evidence_ids: [],
  },
  {
    id: "finding-004",
    host_id: "host-001",
    severity: "CRITICAL",
    status: "OPEN",
    evidence_ids: [],
  },
  {
    id: "finding-005",
    host_id: "host-002",
    severity: "LOW",
    status: "OPEN",
    evidence_ids: [],
  },
]

const severityColors = {
  CRITICAL: "var(--state-critical)",
  HIGH: "var(--state-critical)",
  MEDIUM: "var(--state-warning)",
  LOW: "var(--state-success)",
  INFO: "var(--text-muted)",
}

function Severity({ value }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: severityColors[value] }}
      />
      <span>{value}</span>
    </span>
  )
}

function Status({ value }) {
  return (
    <span
      style={{
        color:
          value === "OPEN"
            ? "var(--state-critical)"
            : value === "DISMISSED"
              ? "var(--text-muted)"
              : "var(--text-secondary)",
      }}
    >
      {value}
    </span>
  )
}

function Findings() {
  const [findings, setFindings] = useState(initialFindings)
  const [severityFilter, setSeverityFilter] = useState("ALL")
  const [statusFilter, setStatusFilter] = useState("ALL")
  const [selectedId, setSelectedId] = useState(null)

  const filteredFindings = useMemo(() => {
    return findings.filter((finding) => {
      const severityMatch =
        severityFilter === "ALL" || finding.severity === severityFilter

      const statusMatch =
        statusFilter === "ALL" || finding.status === statusFilter

      return severityMatch && statusMatch
    })
  }, [findings, severityFilter, statusFilter])

  const selectedFinding =
    findings.find((finding) => finding.id === selectedId) || null

  const openCount = findings.filter((f) => f.status === "OPEN").length
  const reviewedCount = findings.filter(
    (f) => f.status === "REVIEWED",
  ).length
  const dismissedCount = findings.filter(
    (f) => f.status === "DISMISSED",
  ).length

  function dismissFinding() {
    if (!selectedFinding || selectedFinding.status !== "OPEN") return

    setFindings((current) =>
      current.map((finding) =>
        finding.id === selectedFinding.id
          ? {
            ...finding,
            status: "DISMISSED",
          }
          : finding,
      ),
    )
  }

  return (
    <main
      className="jocky-page min-w-0 flex-1 overflow-auto"
      style={{ background: "#f4f4f4" }}
    >
      <div className="px-8 py-6">
        <header className="jocky-page-header">
          <h1
            className="text-[20px] font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            Findings
          </h1>

          <p
            className="mt-1 text-[13px]"
            style={{ color: "var(--text-secondary)" }}
          >
            Review correlation alerts and rule evaluation outputs
          </p>
        </header>

        {/* Carbon system ribbon — presentation only; existing functionality remains unchanged. */}
        <section
          aria-label="FINDINGS system status"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(240px, 1.5fr) repeat(2, 1fr)",
            margin: "24px 0 28px",
            background: "#161616",
            color: "#ffffff",
            border: "1px solid #161616",
          }}
        >
          <div style={{ padding: "18px 20px", borderRight: "1px solid #393939" }}>
            <div style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: "10px", letterSpacing: "0.1em", color: "#8d8d8d", marginBottom: "9px" }}>
              FINDINGS
            </div>
            <div style={{ fontFamily: '"IBM Plex Sans", sans-serif', fontSize: "16px", fontWeight: 500 }}>
              CORRELATION REVIEW
            </div>
          </div>
          <div style={{ padding: "18px 20px", borderRight: "1px solid #393939" }}>
            <div style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: "10px", color: "#8d8d8d", marginBottom: "9px" }}>
              SYSTEM
            </div>
            <div style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: "12px" }}>NOMINAL</div>
          </div>
          <div style={{ padding: "18px 20px" }}>
            <div style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: "10px", color: "#8d8d8d", marginBottom: "9px" }}>
              INTERFACE
            </div>
            <div style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: "12px" }}>JOCKY / CARBON</div>
          </div>
        </section>

        {/* Summary */}
        <div
          className="jocky-findings-summary mb-6 flex w-full items-center"
          style={{
            borderTop: "1px solid var(--hairline)",
            borderBottom: "1px solid var(--hairline)",
          }}
        >
          <div className="flex-1 px-4 py-3 pl-0">

            <div
              className="text-[12px]"
              style={{ color: "var(--text-muted)" }}
            >
              Total findings
            </div>

            <div
              className="font-mono text-[28px]"
              style={{ color: "var(--text-primary)" }}
            >
              {findings.length}
            </div>
          </div>

          <div
            className="h-10"
            style={{ borderLeft: "1px solid var(--hairline)" }}
          />

          <div className="flex-1 px-4 py-3">

            <div
              className="text-[12px]"
              style={{ color: "var(--text-muted)" }}
            >
              Open
            </div>

            <div
              className="font-mono text-[28px]"
              style={{ color: "var(--state-critical)" }}
            >
              {openCount}
            </div>
          </div>

          <div
            className="h-10"
            style={{ borderLeft: "1px solid var(--hairline)" }}
          />

          <div className="flex-1 px-4 py-3">

            <div
              className="text-[12px]"
              style={{ color: "var(--text-muted)" }}
            >
              Reviewed
            </div>

            <div
              className="font-mono text-[28px]"
              style={{ color: "var(--text-primary)" }}
            >
              {reviewedCount}
            </div>
          </div>

          <div
            className="h-10"
            style={{ borderLeft: "1px solid var(--hairline)" }}
          />

          <div className="flex-1 px-4 py-3">

            <div
              className="text-[12px]"
              style={{ color: "var(--text-muted)" }}
            >
              Dismissed
            </div>
            <div
              className="font-mono text-[28px]"
              style={{ color: "var(--text-muted)" }}
            >
              {dismissedCount}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {["ALL", "CRITICAL", "HIGH", "MEDIUM", "LOW", "INFO"].map(
            (severity) => (
              <button
                key={severity}
                type="button"
                onClick={() => setSeverityFilter(severity)}
                className="px-3 py-1.5 text-[12px]"
                style={{
                  color:
                    severityFilter === severity
                      ? "var(--text-primary)"
                      : "var(--text-secondary)",
                  background:
                    severityFilter === severity
                      ? "var(--surface)"
                      : "transparent",
                  border:
                    severityFilter === severity
                      ? "1px solid var(--hairline)"
                      : "1px solid transparent",
                  borderRadius: "var(--radius-control)",
                }}
              >
                {severity}
              </button>
            ),
          )}

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="ml-auto h-8 px-2 text-[12px]"
            aria-label="Filter by status"
          >
            <option value="ALL">All statuses</option>
            <option value="OPEN">Open</option>
            <option value="REVIEWED">Reviewed</option>
            <option value="DISMISSED">Dismissed</option>
          </select>
        </div>

        {/* Findings table */}
        <section>
          <div
            className="overflow-x-auto"
            style={{ borderTop: "1px solid var(--hairline)" }}
          >
            <table className="w-full border-collapse">
              <thead>
                <tr
                  className="h-[34px] text-left text-[12px] font-medium"
                  style={{
                    color: "var(--text-muted)",
                    background: "var(--surface)",
                  }}
                >
                  <th className="px-3 font-medium">Finding</th>
                  <th className="px-3 font-medium">Host</th>
                  <th className="px-3 font-medium">Severity</th>
                  <th className="px-3 font-medium">Status</th>
                  <th className="px-3 font-medium">Evidence</th>
                </tr>
              </thead>

              <tbody>
                {filteredFindings.map((finding) => (
                  <tr
                    key={finding.id}
                    tabIndex={0}
                    onClick={() => setSelectedId(finding.id)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        setSelectedId(finding.id)
                      }
                    }}
                    className="h-[34px] cursor-pointer text-[13px]"
                    style={{
                      borderTop: "1px solid var(--hairline)",
                      color: "var(--text-primary)",
                    }}
                  >
                    <td className="px-3">
                      <span className="font-mono">{finding.id}</span>
                      {finding.title && (
                        <span
                          className="ml-3"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {finding.title}
                        </span>
                      )}
                    </td>

                    <td className="px-3 font-mono">{finding.host_id}</td>

                    <td className="px-3">
                      <Severity value={finding.severity} />
                    </td>

                    <td className="px-3">
                      <Status value={finding.status} />
                    </td>

                    <td className="px-3 font-mono">
                      {finding.evidence_ids?.length || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredFindings.length === 0 && (
              <div
                className="py-8 text-center text-[13px]"
                style={{ color: "var(--text-muted)" }}
              >
                No findings match the selected filters.
              </div>
            )}
          </div>
        </section>

        {/* Finding details */}
        {selectedFinding && (
          <section
            className="mt-8 pt-6"
            style={{ borderTop: "1px solid var(--hairline)" }}
          >
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h2
                  className="text-[13px] font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Finding details
                </h2>

                <div
                  className="mt-1 font-mono text-[12px]"
                  style={{ color: "var(--text-muted)" }}
                >
                  {selectedFinding.id}
                </div>
              </div>

              {selectedFinding.status === "OPEN" && (
                <button
                  type="button"
                  onClick={dismissFinding}
                  className="h-8 px-3 text-[12px]"
                  style={{
                    color: "var(--text-primary)",
                    background: "var(--surface)",
                    border: "1px solid var(--hairline)",
                    borderRadius: "var(--radius-control)",
                  }}
                >
                  Dismiss finding
                </button>
              )}
            </div>

            <div className="grid max-w-3xl grid-cols-2 gap-x-8 gap-y-4">
              {selectedFinding.title && (
                <div className="col-span-2">
                  <div
                    className="mb-1 text-[12px]"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Title
                  </div>
                  <div style={{ color: "var(--text-primary)" }}>
                    {selectedFinding.title}
                  </div>
                </div>
              )}

              {selectedFinding.description && (
                <div className="col-span-2">
                  <div
                    className="mb-1 text-[12px]"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Description
                  </div>
                  <div style={{ color: "var(--text-secondary)" }}>
                    {selectedFinding.description}
                  </div>
                </div>
              )}

              <div>
                <div
                  className="mb-1 text-[12px]"
                  style={{ color: "var(--text-muted)" }}
                >
                  Host
                </div>
                <div className="font-mono">{selectedFinding.host_id}</div>
              </div>

              <div>
                <div
                  className="mb-1 text-[12px]"
                  style={{ color: "var(--text-muted)" }}
                >
                  Severity
                </div>
                <Severity value={selectedFinding.severity} />
              </div>

              <div>
                <div
                  className="mb-1 text-[12px]"
                  style={{ color: "var(--text-muted)" }}
                >
                  Status
                </div>
                <Status value={selectedFinding.status} />
              </div>

              {selectedFinding.created_at && (
                <div>
                  <div
                    className="mb-1 text-[12px]"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Created
                  </div>
                  <div className="font-mono text-[12px]">
                    {selectedFinding.created_at}
                  </div>
                </div>
              )}

              <div className="col-span-2">
                <div
                  className="mb-1 text-[12px]"
                  style={{ color: "var(--text-muted)" }}
                >
                  Evidence IDs
                </div>

                <div className="font-mono text-[12px]">
                  {selectedFinding.evidence_ids?.length
                    ? selectedFinding.evidence_ids.join(", ")
                    : "—"}
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  )
}

export default Findings
import { useMemo, useState } from "react"

const evidence = [
  { id: "evidence-001", type: "PROCESS", host_id: "host-001", job_id: "job-001", hash: "e3b0c44" },
  { id: "evidence-002", type: "PROCESS", host_id: "host-001", job_id: "job-001", hash: "8d969ee1" },
  { id: "evidence-003", type: "PROCESS", host_id: "host-001", job_id: "job-001", hash: "7d157d7" },
  { id: "evidence-004", type: "PROCESS", host_id: "host-001", job_id: "job-001", hash: "9f86d08" },
  { id: "evidence-005", type: "PROCESS", host_id: "host-002", job_id: "job-003", hash: "b1b3773" },
  { id: "evidence-006", type: "PROCESS", host_id: "host-002", job_id: "job-003", hash: "4a0c8b6" },
  { id: "evidence-007", type: "PROCESS", host_id: "host-002", job_id: "job-003", hash: "c5f5904" },
  { id: "evidence-008", type: "PROCESS", host_id: "host-002", job_id: "job-003", hash: "fc22d56" },

  { id: "evidence-009", type: "NETWORK", host_id: "host-001", job_id: "job-001", hash: "1115dd86" },
  { id: "evidence-010", type: "NETWORK", host_id: "host-001", job_id: "job-001", hash: "3a6eb075" },
  { id: "evidence-011", type: "NETWORK", host_id: "host-001", job_id: "job-005", hash: "cfb6814t" },
  { id: "evidence-012", type: "NETWORK", host_id: "host-001", job_id: "job-005", hash: "2c51086" },
  { id: "evidence-013", type: "NETWORK", host_id: "host-002", job_id: "job-004", hash: "a591a6d" },
  { id: "evidence-014", type: "NETWORK", host_id: "host-002", job_id: "job-004", hash: "dbb4076" },
  { id: "evidence-015", type: "NETWORK", host_id: "host-002", job_id: "job-004", hash: "ef2d127" },
  { id: "evidence-016", type: "NETWORK", host_id: "host-002", job_id: "job-004", hash: "62c66a7" },

  { id: "evidence-017", type: "FILESYSTEM", host_id: "host-001", job_id: "job-002", hash: "9e811" },
  { id: "evidence-018", type: "FILESYSTEM", host_id: "host-001", job_id: "job-002", hash: "d473" },
  { id: "evidence-019", type: "FILESYSTEM", host_id: "host-001", job_id: "job-002", hash: "4e074" },
  { id: "evidence-020", type: "FILESYSTEM", host_id: "host-001", job_id: "job-002", hash: "4b22" },
  { id: "evidence-021", type: "FILESYSTEM", host_id: "host-002", job_id: "job-008", hash: "ef53" },
  { id: "evidence-022", type: "FILESYSTEM", host_id: "host-002", job_id: "job-008", hash: "6b861" },
]

const filters = ["ALL", "PROCESS", "NETWORK", "FILESYSTEM"]

function Evidence() {
  const [filter, setFilter] = useState("ALL")
  const [selectedEvidence, setSelectedEvidence] = useState(null)

  const filteredEvidence = useMemo(() => {
    if (filter === "ALL") {
      return evidence
    }

    return evidence.filter((item) => item.type === filter)
  }, [filter])

  return (
    <main
      className="jocky-page min-w-0 flex-1 overflow-auto"
      style={{ background: "#f4f4f4" }}
    >
      <div className="px-8 py-6">
        {/* Header */}
        <header className="jocky-page-header">
          <h1
            className="text-[20px] font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            Forensic Evidence
          </h1>

          <p
            className="mt-1 text-[13px]"
            style={{ color: "var(--text-secondary)" }}
          >
            Explore normalized forensic evidence records
          </p>
        </header>

        {/* Carbon system ribbon — presentation only; existing functionality remains unchanged. */}
        <section
          aria-label="EVIDENCE system status"
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
              EVIDENCE
            </div>
            <div style={{ fontFamily: '"IBM Plex Sans", sans-serif', fontSize: "16px", fontWeight: 500 }}>
              COLLECTION INVENTORY
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
        <section
          className="mb-8 border-y py-4"
          style={{ borderColor: "var(--hairline)" }}
          aria-label="Evidence summary"
        >
          <div className="grid grid-cols-4">
            <div className="pr-6">
              <p
                className="text-[12px] font-medium"
                style={{ color: "var(--text-muted)" }}
              >
                Total records
              </p>

              <p
                className="mono mt-1 text-[28px] font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                {evidence.length}
              </p>
            </div>

            <div
              className="border-l px-6"
              style={{ borderColor: "var(--hairline)" }}
            >
              <p
                className="text-[12px] font-medium"
                style={{ color: "var(--text-muted)" }}
              >
                Process
              </p>

              <p
                className="mono mt-1 text-[28px] font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                {evidence.filter((item) => item.type === "PROCESS").length}
              </p>
            </div>

            <div
              className="border-l px-6"
              style={{ borderColor: "var(--hairline)" }}
            >
              <p
                className="text-[12px] font-medium"
                style={{ color: "var(--text-muted)" }}
              >
                Network
              </p>

              <p
                className="mono mt-1 text-[28px] font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                {evidence.filter((item) => item.type === "NETWORK").length}
              </p>
            </div>

            <div
              className="border-l px-6"
              style={{ borderColor: "var(--hairline)" }}
            >
              <p
                className="text-[12px] font-medium"
                style={{ color: "var(--text-muted)" }}
              >
                Filesystem
              </p>

              <p
                className="mono mt-1 text-[28px] font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                {evidence.filter((item) => item.type === "FILESYSTEM").length}
              </p>
            </div>
          </div>
        </section>

        {/* Evidence Explorer */}
        <section>
          <div className="mb-4 flex items-end justify-between">
            <div>
              <h2
                className="text-[13px] font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                Evidence explorer
              </h2>

              <p
                className="mt-1 text-[12px]"
                style={{ color: "var(--text-muted)" }}
              >
                Filter normalized evidence records
              </p>
            </div>

            {/* Filter */}
            <div
              className="flex items-center gap-1"
              role="group"
              aria-label="Evidence type filter"
            >
              {filters.map((item) => {
                const active = filter === item

                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setFilter(item)}
                    className="px-2 py-1 text-[12px]"
                    style={{
                      color: active
                        ? "var(--text-primary)"
                        : "var(--text-secondary)",
                      background: active
                        ? "var(--surface)"
                        : "transparent",
                      border: active
                        ? "1px solid var(--hairline)"
                        : "1px solid transparent",
                      borderRadius: "var(--radius-control)",
                      cursor: "pointer",
                    }}
                  >
                    {item}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr
                  className="h-[34px] text-left"
                  style={{
                    background: "var(--surface)",
                    borderBottom: "1px solid var(--hairline)",
                  }}
                >
                  <th
                    className="px-3 text-[12px] font-medium"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Evidence
                  </th>

                  <th
                    className="px-3 text-[12px] font-medium"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Type
                  </th>

                  <th
                    className="px-3 text-[12px] font-medium"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Host
                  </th>

                  <th
                    className="px-3 text-[12px] font-medium"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Job
                  </th>

                  <th
                    className="px-3 text-[12px] font-medium"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Hash
                  </th>

                  <th
                    className="px-3 text-right text-[12px] font-medium"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Record
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredEvidence.map((item) => (
                  <tr
                    key={item.id}
                    className="h-[42px] cursor-pointer"
                    style={{
                      borderBottom: "1px solid var(--hairline)",
                    }}
                    onClick={() => setSelectedEvidence(item)}
                  >
                    <td
                      className="mono px-3 text-[13px]"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {item.id}
                    </td>

                    <td
                      className="px-3 text-[13px]"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {item.type}
                    </td>

                    <td
                      className="mono px-3 text-[13px]"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {item.host_id}
                    </td>

                    <td
                      className="mono px-3 text-[13px]"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {item.job_id}
                    </td>

                    <td
                      className="mono px-3 text-[13px]"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {item.hash}
                    </td>

                    <td className="px-3 text-right">
                      <button
                        type="button"
                        className="text-[12px] font-medium"
                        style={{
                          color: "var(--accent)",
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          padding: 0,
                        }}
                        onClick={(event) => {
                          event.stopPropagation()
                          setSelectedEvidence(item)
                        }}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredEvidence.length === 0 && (
            <div
              className="py-8 text-center text-[13px]"
              style={{ color: "var(--text-muted)" }}
            >
              No evidence records match this filter.
            </div>
          )}
        </section>

        {/* Evidence Record */}
        {selectedEvidence && (
          <section
            className="mt-8 border-t pt-6"
            style={{ borderColor: "var(--hairline)" }}
          >
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h2
                  className="text-[13px] font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Evidence record
                </h2>

                <p
                  className="mono mt-1 text-[12px]"
                  style={{ color: "var(--text-muted)" }}
                >
                  {selectedEvidence.id}
                </p>
              </div>

              <button
                type="button"
                className="text-[12px]"
                style={{
                  color: "var(--text-secondary)",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                }}
                onClick={() => setSelectedEvidence(null)}
              >
                Close
              </button>
            </div>

            <div
              className="grid grid-cols-4 border-y"
              style={{ borderColor: "var(--hairline)" }}
            >
              <div className="py-4 pr-6">
                <p
                  className="text-[12px] font-medium"
                  style={{ color: "var(--text-muted)" }}
                >
                  Evidence
                </p>

                <p
                  className="mono mt-1 text-[13px]"
                  style={{ color: "var(--text-primary)" }}
                >
                  {selectedEvidence.id}
                </p>
              </div>

              <div
                className="border-l px-6 py-4"
                style={{ borderColor: "var(--hairline)" }}
              >
                <p
                  className="text-[12px] font-medium"
                  style={{ color: "var(--text-muted)" }}
                >
                  Type
                </p>

                <p
                  className="mt-1 text-[13px]"
                  style={{ color: "var(--text-primary)" }}
                >
                  {selectedEvidence.type}
                </p>
              </div>

              <div
                className="border-l px-6 py-4"
                style={{ borderColor: "var(--hairline)" }}
              >
                <p
                  className="text-[12px] font-medium"
                  style={{ color: "var(--text-muted)" }}
                >
                  Host
                </p>

                <p
                  className="mono mt-1 text-[13px]"
                  style={{ color: "var(--text-primary)" }}
                >
                  {selectedEvidence.host_id}
                </p>
              </div>

              <div
                className="border-l px-6 py-4"
                style={{ borderColor: "var(--hairline)" }}
              >
                <p
                  className="text-[12px] font-medium"
                  style={{ color: "var(--text-muted)" }}
                >
                  Job
                </p>

                <p
                  className="mono mt-1 text-[13px]"
                  style={{ color: "var(--text-primary)" }}
                >
                  {selectedEvidence.job_id}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <p
                className="text-[12px] font-medium"
                style={{ color: "var(--text-muted)" }}
              >
                Hash
              </p>

              <div
                className="mono mt-2 px-3 py-3 text-[13px]"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--hairline)",
                  borderRadius: "var(--radius-control)",
                  color: "var(--text-primary)",
                }}
              >
                {selectedEvidence.hash}
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  )
}

export default Evidence
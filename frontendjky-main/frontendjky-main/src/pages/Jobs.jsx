import { useState } from "react"

const initialJobs = [
  {
    id: "job-001",
    host_id: "host-001",
    type: "PROCESS COLLECTION",
    status: "COMPLETED",
  },
  {
    id: "job-002",
    host_id: "host-001",
    type: "FULL SWEEP",
    status: "RUNNING",
    progress: 45,
  },
  {
    id: "job-004",
    host_id: "host-002",
    type: "SYSTEM AUDIT",
    status: "DISPATCHED",
  },
  {
    id: "job-003",
    host_id: "host-002",
    type: "PROCESS COLLECTION",
    status: "COMPLETED",
  },
  {
    id: "job-005",
    host_id: "host-001",
    type: "NETWORK TRACE",
    status: "PARTIAL",
  },
  {
    id: "job-006",
    host_id: "host-003",
    type: "FULL SWEEP",
    status: "FAILED",
  },
  {
    id: "job-007",
    host_id: "host-001",
    type: "MEMORY INSPECTION",
    status: "CANCELLED",
  },
  {
    id: "job-008",
    host_id: "host-002",
    type: "FILESYSTEM SCAN",
    status: "COLLECTING",
  },
  {
    id: "job-009",
    host_id: "host-001",
    type: "PROCESS COLLECTION",
    status: "PACKAGING",
  },
  {
    id: "job-010",
    host_id: "host-001",
    type: "PROCESS COLLECTION",
    status: "QUEUED",
  },
]

const cancellableStatuses = [
  "QUEUED",
  "DISPATCHED",
  "RUNNING",
  "COLLECTING",
  "PACKAGING",
  "UPLOADING",
]

const retryableStatuses = [
  "FAILED",
  "PARTIAL",
  "CANCELLED",
]

function Status({ value }) {
  let state = "var(--text-secondary)"

  if (value === "COMPLETED") {
    state = "var(--state-success)"
  } else if (value === "FAILED") {
    state = "var(--state-critical)"
  } else if (value === "PARTIAL") {
    state = "var(--state-warning)"
  } else if (
    [
      "QUEUED",
      "DISPATCHED",
      "RUNNING",
      "COLLECTING",
      "PACKAGING",
      "UPLOADING",
    ].includes(value)
  ) {
    state = "var(--state-warning)"
  }

  return (
    <span className="inline-flex items-center gap-2">
      <span
        aria-hidden="true"
        className="h-[6px] w-[6px] rounded-full"
        style={{ background: state }}
      />
      <span>{value}</span>
    </span>
  )
}

function Jobs() {
  const [jobs, setJobs] = useState(initialJobs)
  const [selectedJob, setSelectedJob] = useState(null)

  function handleCancel(jobId) {
    setJobs((currentJobs) =>
      currentJobs.map((job) =>
        job.id === jobId
          ? {
              ...job,
              status: "CANCELLED",
            }
          : job
      )
    )

    if (selectedJob?.id === jobId) {
      setSelectedJob((current) => ({
        ...current,
        status: "CANCELLED",
      }))
    }
  }

  function handleRetry(jobId) {
    setJobs((currentJobs) =>
      currentJobs.map((job) =>
        job.id === jobId
          ? {
              ...job,
              status: "QUEUED",
              progress: undefined,
            }
          : job
      )
    )

    if (selectedJob?.id === jobId) {
      setSelectedJob((current) => ({
        ...current,
        status: "QUEUED",
        progress: undefined,
      }))
    }
  }

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
            Jobs
          </h1>

          <p
            className="mt-1 text-[13px]"
            style={{ color: "var(--text-secondary)" }}
          >
            Collection and execution jobs
          </p>
        </header>

        {/* Carbon system ribbon — presentation only; existing functionality remains unchanged. */}
        <section
          aria-label="JOB CONTROL system status"
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
              JOB CONTROL
            </div>
            <div style={{ fontFamily: '"IBM Plex Sans", sans-serif', fontSize: "16px", fontWeight: 500 }}>
              EXECUTION QUEUE
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
          aria-label="Job summary"
        >
          <div className="grid grid-cols-4">
            <div className="pr-6">
              <p
                className="text-[12px] font-medium"
                style={{ color: "var(--text-muted)" }}
              >
                Total jobs
              </p>

              <p
                className="mono mt-1 text-[28px] font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                {jobs.length}
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
                Active
              </p>

              <p
                className="mono mt-1 text-[28px] font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                {
                  jobs.filter((job) =>
                    [
                      "QUEUED",
                      "DISPATCHED",
                      "RUNNING",
                      "COLLECTING",
                      "PACKAGING",
                      "UPLOADING",
                    ].includes(job.status)
                  ).length
                }
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
                Completed
              </p>

              <p
                className="mono mt-1 text-[28px] font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                {jobs.filter((job) => job.status === "COMPLETED").length}
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
                Attention
              </p>

              <p
                className="mono mt-1 text-[28px] font-semibold"
                style={{
                  color:
                    jobs.filter((job) =>
                      ["FAILED", "PARTIAL"].includes(job.status)
                    ).length > 0
                      ? "var(--state-critical)"
                      : "var(--text-primary)",
                }}
              >
                {
                  jobs.filter((job) =>
                    ["FAILED", "PARTIAL"].includes(job.status)
                  ).length
                }
              </p>
            </div>
          </div>
        </section>

        {/* Job Queue */}
        <section>
          <div className="mb-3 flex items-end justify-between">
            <div>
              <h2
                className="text-[13px] font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                Job queue
              </h2>

              <p
                className="mt-1 text-[12px]"
                style={{ color: "var(--text-muted)" }}
              >
                Browse collection and execution jobs
              </p>
            </div>
          </div>

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
                    Job
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
                    Type
                  </th>

                  <th
                    className="px-3 text-[12px] font-medium"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Status
                  </th>

                  <th
                    className="px-3 text-right text-[12px] font-medium"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Progress
                  </th>

                  <th
                    className="px-3 text-right text-[12px] font-medium"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {jobs.map((job) => {
                  const canCancel = cancellableStatuses.includes(job.status)
                  const canRetry = retryableStatuses.includes(job.status)

                  return (
                    <tr
                      key={job.id}
                      className="h-[42px] cursor-pointer"
                      style={{
                        borderBottom: "1px solid var(--hairline)",
                      }}
                      onClick={() => setSelectedJob(job)}
                    >
                      <td
                        className="mono px-3 text-[13px]"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {job.id}
                      </td>

                      <td
                        className="mono px-3 text-[13px]"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {job.host_id}
                      </td>

                      <td
                        className="px-3 text-[13px]"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {job.type}
                      </td>

                      <td
                        className="px-3 text-[13px]"
                        style={{ color: "var(--text-primary)" }}
                      >
                        <Status value={job.status} />
                      </td>

                      <td
                        className="mono px-3 text-right text-[13px]"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {job.progress !== undefined
                          ? `${job.progress}%`
                          : "—"}
                      </td>

                      <td className="px-3 text-right">
                        {canCancel && (
                          <button
                            type="button"
                            className="mr-3 text-[12px] font-medium"
                            style={{
                              color: "var(--state-critical)",
                              background: "transparent",
                              border: "none",
                              cursor: "pointer",
                              padding: 0,
                            }}
                            onClick={(event) => {
                              event.stopPropagation()
                              handleCancel(job.id)
                            }}
                          >
                            Cancel
                          </button>
                        )}

                        {canRetry && (
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
                              handleRetry(job.id)
                            }}
                          >
                            Retry
                          </button>
                        )}

                        {!canCancel && !canRetry && (
                          <span
                            className="text-[12px]"
                            style={{ color: "var(--text-muted)" }}
                          >
                            —
                          </span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Job Details */}
        {selectedJob && (
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
                  Job details
                </h2>

                <p
                  className="mono mt-1 text-[12px]"
                  style={{ color: "var(--text-muted)" }}
                >
                  {selectedJob.id}
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
                onClick={() => setSelectedJob(null)}
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
                  Job
                </p>

                <p
                  className="mono mt-1 text-[13px]"
                  style={{ color: "var(--text-primary)" }}
                >
                  {selectedJob.id}
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
                  {selectedJob.host_id}
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
                  {selectedJob.type}
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
                  Status
                </p>

                <p
                  className="mt-1 text-[13px]"
                  style={{ color: "var(--text-primary)" }}
                >
                  <Status value={selectedJob.status} />
                </p>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  )
}

export default Jobs
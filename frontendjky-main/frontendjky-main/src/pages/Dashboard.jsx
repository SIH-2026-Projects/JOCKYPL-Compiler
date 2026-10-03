const summary = {
  totalHosts: 3,
  onlineHosts: 2,
  offlineHosts: 1,
  activeJobs: 4,
  completedJobs: 3,
  failedJobs: 1,
  totalEvidence: 22,
  openFindings: 3,
}

const recentJobs = [
  { id: "job-002", host: "host-001", operation: "Full Forensic Sweep", status: "RUNNING" },
  { id: "job-001", host: "host-001", operation: "Host Collection", status: "COMPLETED" },
]

const recentFindings = [
  { id: "finding-001", title: "Suspicious Process Correlation", severity: "HIGH", host: "host-001", status: "OPEN" },
]

function Status({ value }) {
  const state = value === "COMPLETED"
    ? "var(--state-success)"
    : value === "FAILED"
      ? "var(--state-critical)"
      : value === "RUNNING"
        ? "var(--state-warning)"
        : "var(--text-secondary)"

  return (
    <span className="inline-flex items-center gap-2">
      <span aria-hidden="true" className="h-[6px] w-[6px] rounded-full" style={{ background: state }} />
      <span>{value}</span>
    </span>
  )
}

function Dashboard() {
  return (
    <main className="jocky-page min-w-0 flex-1 overflow-auto">
      <div>
        <header className="jocky-page-header">
          <div>
            <div className="mb-2 font-mono text-[9px] tracking-[0.12em] text-neutral-500">OPERATIONS</div>
            <h1 className="text-[30px] font-semibold leading-none text-neutral-950">Command Center</h1>
            <p className="mt-2 text-[13px] text-neutral-600">Forensic collection, build integrity and correlation activity in one field view.</p>
          </div>
        </header>

        <section className="jocky-dashboard-grid mb-7" aria-label="Command overview">
          <article className="jocky-dashboard-panel dark">
            <div className="eyebrow">LIVE OPERATIONS</div>
            <h2>Collection node / 01</h2>
            <p>Primary forensic workload is active. Evidence intake and correlation services are responding normally.</p>
            <div className="jocky-dashboard-big-number">{summary.activeJobs}</div>
            <div className="jocky-dashboard-rule" />
            <div className="flex items-center justify-between font-mono text-[10px] text-neutral-300">
              <span>ACTIVE JOBS</span>
              <span>{summary.completedJobs} COMPLETE / {summary.failedJobs} FAILED</span>
            </div>
          </article>

          <article className="jocky-dashboard-panel">
            <div className="eyebrow">FIELD STATUS</div>
            <h2>{summary.totalHosts} collection hosts</h2>
            <p>{summary.onlineHosts} nodes online. One node is currently outside the collection window.</p>
            <div className="jocky-dashboard-mini-grid">
              <div className="jocky-dashboard-mini">
                <div className="label">Online</div>
                <div className="value text-[#16724b]">{summary.onlineHosts}</div>
              </div>
              <div className="jocky-dashboard-mini">
                <div className="label">Offline</div>
                <div className="value">{summary.offlineHosts}</div>
              </div>
              <div className="jocky-dashboard-mini">
                <div className="label">Evidence</div>
                <div className="value">{summary.totalEvidence}</div>
              </div>
              <div className="jocky-dashboard-mini">
                <div className="label">Findings</div>
                <div className="value text-[#b51b1b]">{summary.openFindings}</div>
              </div>
            </div>
          </article>
        </section>

        <section className="mb-7">
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="text-[15px] font-semibold text-neutral-950">Recent job activity</h2>
            <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-neutral-500">LIVE FEED</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead><tr className="h-[36px] text-left">
                <th className="px-3 text-[10px] font-medium text-neutral-500">Job</th>
                <th className="px-3 text-[10px] font-medium text-neutral-500">Host</th>
                <th className="px-3 text-[10px] font-medium text-neutral-500">Operation</th>
                <th className="px-3 text-[10px] font-medium text-neutral-500">Status</th>
              </tr></thead>
              <tbody>{recentJobs.map((job) => (
                <tr key={job.id} className="h-[40px]" style={{ borderBottom: "1px solid var(--hairline)" }}>
                  <td className="mono px-3 text-[12px] text-neutral-900">{job.id}</td>
                  <td className="mono px-3 text-[12px] text-neutral-600">{job.host}</td>
                  <td className="px-3 text-[12px] text-neutral-900">{job.operation}</td>
                  <td className="px-3 text-[12px] text-neutral-900"><Status value={job.status} /></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </section>

        <section>
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="text-[15px] font-semibold text-neutral-950">Correlation findings</h2>
            <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-neutral-500">REVIEW QUEUE / {summary.openFindings}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead><tr className="h-[36px] text-left">
                <th className="px-3 text-[10px] font-medium text-neutral-500">Finding</th>
                <th className="px-3 text-[10px] font-medium text-neutral-500">Severity</th>
                <th className="px-3 text-[10px] font-medium text-neutral-500">Host</th>
                <th className="px-3 text-[10px] font-medium text-neutral-500">Status</th>
              </tr></thead>
              <tbody>{recentFindings.map((finding) => (
                <tr key={finding.id} className="h-[40px]" style={{ borderBottom: "1px solid var(--hairline)" }}>
                  <td className="px-3 text-[12px] text-neutral-900">{finding.title}</td>
                  <td className="px-3 font-mono text-[11px] font-semibold text-[#b51b1b]">{finding.severity}</td>
                  <td className="mono px-3 text-[12px] text-neutral-600">{finding.host}</td>
                  <td className="px-3 text-[12px] text-neutral-900"><Status value={finding.status} /></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  )
}

export default Dashboard

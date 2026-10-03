import { useState } from "react"

const simulations = [
  {
    id: "sim-001",
    name: "Compilation Variation Benchmark",
    category: "POLYMORPHISM_SIMULATION",
  },
  {
    id: "sim-002",
    name: "Synthetic Memory Execution Benchmark",
    category: "MEMORY_EXECUTION_SIMULATION",
  },
  {
    id: "sim-003",
    name: "Network Behavior Benchmark",
    category: "NETWORK_BEHAVIOR_SIMULATION",
  },
]

const documentedRun = {
  id: "run-001",
  simulation_id: "sim-001",
  status: "COMPLETED",
  created_at: "2026-09-28T18:10:00Z",
  result: {
    variants_generated: 10,
    unique_hashes_confirmed: true,
    benchmark_duration_ms: 1450,
  },
}

function statusColor(status) {
  if (status === "COMPLETED") return "var(--state-success)"
  if (status === "QUEUED") return "var(--state-warning)"
  if (status === "FAILED") return "var(--state-critical)"
  return "var(--text-muted)"
}

function Research() {
  const [selectedSimulation, setSelectedSimulation] = useState(
    simulations[0]
  )

  const [showRunModal, setShowRunModal] = useState(false)

  const [iterations, setIterations] = useState(10)
  const [noiseLevel, setNoiseLevel] = useState("LOW")

  const [selectedRun, setSelectedRun] = useState(null)

  function handleRun() {
    /*
      Mock equivalent of:

      POST /api/research/simulations/:simulationId/run

      {
        iterations: 10,
        synthetic_noise_level: "LOW"
      }

      The documented completed response is only for sim-001,
      so we use that exact fixture here.
    */

    if (selectedSimulation.id !== "sim-001") {
      setShowRunModal(false)
      return
    }

    setSelectedRun({
      ...documentedRun,
      status: "QUEUED",
    })

    setShowRunModal(false)

    // Simulate the documented run becoming available.
    setTimeout(() => {
      setSelectedRun(documentedRun)
    }, 500)
  }

  const completedRuns = selectedRun?.status === "COMPLETED" ? 1 : 0

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
            Research & Simulation
          </h1>

          <p
            className="mt-1 text-[13px]"
            style={{ color: "var(--text-secondary)" }}
          >
            Isolated simulation catalog and synthetic benchmark runs
          </p>
        </header>

        {/* Carbon system ribbon — presentation only; existing functionality remains unchanged. */}
        <section
          aria-label="RESEARCH system status"
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
              RESEARCH
            </div>
            <div style={{ fontFamily: '"IBM Plex Sans", sans-serif', fontSize: "16px", fontWeight: 500 }}>
              SIMULATION WORKSPACE
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
          className="mb-8 flex w-full"
          style={{
            borderTop: "1px solid var(--hairline)",
            borderBottom: "1px solid var(--hairline)",
          }}
        >
          <div className="flex-1 py-3">
            <div
              className="text-[12px]"
              style={{ color: "var(--text-muted)" }}
            >
              Simulations
            </div>

            <div
              className="mt-1 font-mono text-[28px]"
              style={{ color: "var(--text-primary)" }}
            >
              {simulations.length}
            </div>
          </div>

          <div
            className="w-px"
            style={{ background: "var(--hairline)" }}
          />

          <div className="flex-1 px-4 py-3">
            <div
              className="text-[12px]"
              style={{ color: "var(--text-muted)" }}
            >
              Selected
            </div>

            <div
              className="mt-1 font-mono text-[28px]"
              style={{ color: "var(--text-primary)" }}
            >
              1
            </div>
          </div>

          <div
            className="w-px"
            style={{ background: "var(--hairline)" }}
          />

          <div className="flex-1 px-4 py-3">
            <div
              className="text-[12px]"
              style={{ color: "var(--text-muted)" }}
            >
              Completed runs
            </div>

            <div
              className="mt-1 font-mono text-[28px]"
              style={{ color: "var(--text-primary)" }}
            >
              {completedRuns}
            </div>
          </div>
        </section>

        {/* Simulation catalog */}
        <section className="mb-8">
          <div className="mb-3 flex items-center justify-between">
            <div
              className="text-[13px] font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              Simulation catalog
            </div>

            <button
              type="button"
              onClick={() => setShowRunModal(true)}
              className="h-8 px-3 text-[12px]"
              style={{
                color: "var(--surface)",
                background: "var(--accent)",
                border: "1px solid var(--accent)",
                borderRadius: "var(--radius-control)",
              }}
            >
              Run simulation
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr
                  style={{
                    height: "34px",
                    background: "var(--surface)",
                    borderBottom: "1px solid var(--hairline)",
                  }}
                >
                  <th
                    className="px-3 text-left text-[12px] font-medium"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Simulation
                  </th>

                  <th
                    className="px-3 text-left text-[12px] font-medium"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Name
                  </th>

                  <th
                    className="px-3 text-left text-[12px] font-medium"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Category
                  </th>
                </tr>
              </thead>

              <tbody>
                {simulations.map((simulation) => {
                  const selected = selectedSimulation.id === simulation.id

                  return (
                    <tr
                      key={simulation.id}
                      onClick={() => setSelectedSimulation(simulation)}
                      tabIndex={0}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          setSelectedSimulation(simulation)
                        }
                      }}
                      className="cursor-pointer"
                      style={{
                        height: "34px",
                        background: selected
                          ? "var(--surface)"
                          : "transparent",
                        borderBottom: "1px solid var(--hairline)",
                      }}
                    >
                      <td className="px-3">
                        <span
                          className="font-mono text-[12px]"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {simulation.id}
                        </span>
                      </td>

                      <td className="px-3">
                        <span
                          className="text-[12px]"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {simulation.name}
                        </span>
                      </td>

                      <td className="px-3">
                        <span
                          className="font-mono text-[12px]"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {simulation.category}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Selected simulation */}
        <section
          className="mb-8 pt-6"
          style={{ borderTop: "1px solid var(--hairline)" }}
        >
          <div className="mb-4">
            <div
              className="text-[13px] font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              Simulation details
            </div>

            <div
              className="mt-1 font-mono text-[12px]"
              style={{ color: "var(--text-muted)" }}
            >
              {selectedSimulation.id}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <div>
              <div
                className="text-[12px]"
                style={{ color: "var(--text-muted)" }}
              >
                Simulation ID
              </div>

              <div
                className="mt-1 font-mono text-[12px]"
                style={{ color: "var(--text-primary)" }}
              >
                {selectedSimulation.id}
              </div>
            </div>

            <div>
              <div
                className="text-[12px]"
                style={{ color: "var(--text-muted)" }}
              >
                Name
              </div>

              <div
                className="mt-1 text-[12px]"
                style={{ color: "var(--text-primary)" }}
              >
                {selectedSimulation.name}
              </div>
            </div>

            <div>
              <div
                className="text-[12px]"
                style={{ color: "var(--text-muted)" }}
              >
                Category
              </div>

              <div
                className="mt-1 font-mono text-[12px]"
                style={{ color: "var(--text-primary)" }}
              >
                {selectedSimulation.category}
              </div>
            </div>
          </div>
        </section>

        {/* Run results */}
        <section
          className="pt-6"
          style={{ borderTop: "1px solid var(--hairline)" }}
        >
          <div className="mb-4">
            <div
              className="text-[13px] font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              Run results
            </div>

            <div
              className="mt-1 text-[12px]"
              style={{ color: "var(--text-muted)" }}
            >
              Synthetic benchmark output
            </div>
          </div>

          {!selectedRun ? (
            <div
              className="py-8 text-center text-[12px]"
              style={{
                color: "var(--text-muted)",
                borderTop: "1px solid var(--hairline)",
                borderBottom: "1px solid var(--hairline)",
              }}
            >
              No simulation run selected.
            </div>
          ) : (
            <>
              <div
                className="mb-6 flex w-full"
                style={{
                  borderTop: "1px solid var(--hairline)",
                  borderBottom: "1px solid var(--hairline)",
                }}
              >
                <div className="flex-1 py-3">
                  <div
                    className="text-[12px]"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Run
                  </div>

                  <div
                    className="mt-1 font-mono text-[12px]"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {selectedRun.id}
                  </div>
                </div>

                <div
                  className="w-px"
                  style={{ background: "var(--hairline)" }}
                />

                <div className="flex-1 px-4 py-3">
                  <div
                    className="text-[12px]"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Status
                  </div>

                  <div className="mt-1 flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className="h-[6px] w-[6px] rounded-full"
                      style={{
                        background: statusColor(selectedRun.status),
                      }}
                    />

                    <span
                      className="font-mono text-[12px]"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {selectedRun.status}
                    </span>
                  </div>
                </div>

                <div
                  className="w-px"
                  style={{ background: "var(--hairline)" }}
                />

                <div className="flex-1 px-4 py-3">
                  <div
                    className="text-[12px]"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Created
                  </div>

                  <div
                    className="mt-1 font-mono text-[12px]"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {selectedRun.created_at}
                  </div>
                </div>
              </div>

              {selectedRun.status === "COMPLETED" &&
                selectedRun.result && (
                  <div
                    className="grid grid-cols-1 gap-5 md:grid-cols-3"
                    style={{
                      borderBottom: "1px solid var(--hairline)",
                      paddingBottom: "24px",
                    }}
                  >
                    <div>
                      <div
                        className="text-[12px]"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Variants generated
                      </div>

                      <div
                        className="mt-1 font-mono text-[20px]"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {selectedRun.result.variants_generated}
                      </div>
                    </div>

                    <div>
                      <div
                        className="text-[12px]"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Unique hashes confirmed
                      </div>

                      <div
                        className="mt-1 font-mono text-[20px]"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {selectedRun.result.unique_hashes_confirmed
                          ? "true"
                          : "false"}
                      </div>
                    </div>

                    <div>
                      <div
                        className="text-[12px]"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Benchmark duration
                      </div>

                      <div
                        className="mt-1 font-mono text-[20px]"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {selectedRun.result.benchmark_duration_ms} ms
                      </div>
                    </div>
                  </div>
                )}
            </>
          )}
        </section>
      </div>

      {/* Run modal */}
      {showRunModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{
            background: "rgba(0, 0, 0, 0.28)",
          }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowRunModal(false)
            }
          }}
        >
          <div
            className="w-full max-w-[520px]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="run-simulation-title"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--hairline)",
              borderRadius: "var(--radius-control)",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
            }}
          >
            <div
              className="px-5 py-4"
              style={{ borderBottom: "1px solid var(--hairline)" }}
            >
              <h2
                id="run-simulation-title"
                className="text-[13px] font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                Run simulation
              </h2>

              <div
                className="mt-1 font-mono text-[12px]"
                style={{ color: "var(--text-muted)" }}
              >
                {selectedSimulation.id}
              </div>
            </div>

            <div className="space-y-5 px-5 py-5">
              <div>
                <label
                  htmlFor="iterations"
                  className="mb-2 block text-[12px] font-medium"
                  style={{ color: "var(--text-muted)" }}
                >
                  Iterations
                </label>

                <input
                  id="iterations"
                  type="number"
                  min="1"
                  value={iterations}
                  onChange={(event) =>
                    setIterations(Number(event.target.value))
                  }
                  className="h-8 w-full px-2 font-mono text-[12px]"
                />
              </div>

              <div>
                <label
                  htmlFor="noise-level"
                  className="mb-2 block text-[12px] font-medium"
                  style={{ color: "var(--text-muted)" }}
                >
                  Synthetic noise level
                </label>

                <select
                  id="noise-level"
                  value={noiseLevel}
                  onChange={(event) => setNoiseLevel(event.target.value)}
                  className="h-8 w-full px-2 text-[12px]"
                >
                  <option value="LOW">LOW</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="HIGH">HIGH</option>
                </select>
              </div>

              {selectedSimulation.id !== "sim-001" && (
                <div
                  className="text-[12px]"
                  style={{
                    color: "var(--text-muted)",
                    borderTop: "1px solid var(--hairline)",
                    paddingTop: "12px",
                  }}
                >
                  A completed mock run response is currently documented only
                  for sim-001.
                </div>
              )}
            </div>

            <div
              className="flex justify-end gap-3 px-5 py-4"
              style={{ borderTop: "1px solid var(--hairline)" }}
            >
              <button
                type="button"
                onClick={() => setShowRunModal(false)}
                className="h-8 px-3 text-[12px]"
                style={{
                  color: "var(--text-secondary)",
                  background: "transparent",
                  border: "1px solid var(--hairline)",
                  borderRadius: "var(--radius-control)",
                }}
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleRun}
                disabled={selectedSimulation.id !== "sim-001"}
                className="h-8 px-3 text-[12px]"
                style={{
                  color: "var(--surface)",
                  background: "var(--accent)",
                  border: "1px solid var(--accent)",
                  borderRadius: "var(--radius-control)",
                }}
              >
                Run simulation
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default Research
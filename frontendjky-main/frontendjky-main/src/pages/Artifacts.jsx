import { useState } from "react"

const artifacts = [
  {
    id: "artifact-001",
    name: "jocky_collector",
    version: "0.1.0",
  },
  {
    id: "artifact-002",
    name: "jocky_auditor",
    version: "0.1.1",
  },
]

const variantsByArtifact = {
  "artifact-001": [
    {
      id: "variant-001",
      artifact_id: "artifact-001",
      label: "Variant A (Default Optimization)",
      profile: "00",
      version: "0.1.0",
      sha256:
        "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92",
      size: 409600,
      created_at: "2026-09-28T14:02:15Z",
      status: "AVAILABLE",
      signed: true,
      authority: "Central KMS Authority",
    },
    {
      id: "variant-002",
      artifact_id: "artifact-001",
      label: "Variant B (Speed Optimized)",
      profile: "03",
      version: "0.1.0",
      sha256:
        "b1b3773a05c0ed0176787a4f1574ff0075f7521e671f11e0e8efbb291a03e6db",
      size: 395000,
      created_at: "2026-09-28T14:05:00Z",
      status: "AVAILABLE",
      signed: true,
      authority: "Central KMS Authority",
    },
  ],

  "artifact-002": [
    {
      id: "variant-003",
      artifact_id: "artifact-002",
      label: "—",
      profile: "00",
      version: "—",
      sha256:
        "3a6eb0790f39ac87c94f3856b2dd2c5d110e6c7d4b4b4a7d7a4e9c5f7d2c1a8b",
      size: null,
      created_at: null,
      status: "—",
      signed: null,
      authority: null,
    },
    {
      id: "variant-004",
      artifact_id: "artifact-002",
      label: "—",
      profile: "Os",
      version: "—",
      sha256:
        "cfb6814b5c3e7f1d8a2b4c6d9e0f123456789abcdef0123456789abcdef012345",
      size: null,
      created_at: null,
      status: "—",
      signed: null,
      authority: null,
    },
  ],
}

function Artifacts() {
  const [selectedArtifact, setSelectedArtifact] = useState(artifacts[0])

  const variants = variantsByArtifact[selectedArtifact.id] || []

  const availableCount = variants.filter(
    (variant) => variant.status === "AVAILABLE"
  ).length

  return (
    <main
      className="jocky-page min-w-0 flex-1 overflow-auto"
      style={{ background: "#f4f4f4" }}
    >
      <div className="px-8 py-6">
        {/* Header */}
        <header className="jocky-page-header">
          <h1
            className="text-[28px] font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            Artifacts
          </h1>

          <p
            className="mt-1 text-[13px]"
            style={{ color: "var(--text-secondary)" }}
          >
            Inspect generated artifacts and their controlled variants
          </p>
        </header>

        {/* Carbon system ribbon — presentation only; existing functionality remains unchanged. */}
        <section
          aria-label="ARTIFACTS system status"
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
              ARTIFACTS
            </div>
            <div style={{ fontFamily: '"IBM Plex Sans", sans-serif', fontSize: "16px", fontWeight: 500 }}>
              CONTROLLED OUTPUTS
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
              Total artifacts
            </div>

            <div
              className="mt-1 font-mono text-[28px]"
              style={{ color: "var(--text-primary)" }}
            >
              {artifacts.length}
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
              Selected variants
            </div>

            <div
              className="mt-1 font-mono text-[28px]"
              style={{ color: "var(--text-primary)" }}
            >
              {variants.length}
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
              Available
            </div>

            <div
              className="mt-1 font-mono text-[28px]"
              style={{ color: "var(--text-primary)" }}
            >
              {availableCount}
            </div>
          </div>
        </section>

        {/* Artifact list */}
        <section className="mb-8">
          <div
            className="mb-3 text-[13px] font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            Artifacts
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
                    Artifact
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
                    Version
                  </th>

                  <th
                    className="px-3 text-right text-[12px] font-medium"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Variants
                  </th>
                </tr>
              </thead>

              <tbody>
                {artifacts.map((artifact) => {
                  const selected = selectedArtifact.id === artifact.id
                  const count = variantsByArtifact[artifact.id]?.length || 0

                  return (
                    <tr
                      key={artifact.id}
                      onClick={() => setSelectedArtifact(artifact)}
                      tabIndex={0}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          setSelectedArtifact(artifact)
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
                          {artifact.id}
                        </span>
                      </td>

                      <td className="px-3">
                        <span
                          className="font-mono text-[12px]"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {artifact.name}
                        </span>
                      </td>

                      <td className="px-3">
                        <span
                          className="font-mono text-[12px]"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {artifact.version}
                        </span>
                      </td>

                      <td
                        className="px-3 text-right font-mono text-[12px]"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {count}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Variant comparison */}
        <section
          className="pt-6"
          style={{ borderTop: "1px solid var(--hairline)" }}
        >
          <div className="mb-4">
            <div
              className="text-[13px] font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              Variant comparison
            </div>

            <div
              className="mt-1 font-mono text-[12px]"
              style={{ color: "var(--text-muted)" }}
            >
              {selectedArtifact.id}
            </div>
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
                    Variant
                  </th>

                  <th
                    className="px-3 text-left text-[12px] font-medium"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Profile
                  </th>

                  <th
                    className="px-3 text-left text-[12px] font-medium"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Version
                  </th>

                  <th
                    className="px-3 text-left text-[12px] font-medium"
                    style={{ color: "var(--text-muted)" }}
                  >
                    SHA-256
                  </th>

                  <th
                    className="px-3 text-right text-[12px] font-medium"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Size
                  </th>

                  <th
                    className="px-3 text-left text-[12px] font-medium"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Status
                  </th>

                  <th
                    className="px-3 text-left text-[12px] font-medium"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Provenance
                  </th>
                </tr>
              </thead>

              <tbody>
                {variants.map((variant) => (
                  <tr
                    key={variant.id}
                    style={{
                      height: "34px",
                      borderBottom: "1px solid var(--hairline)",
                    }}
                  >
                    <td className="px-3">
                      <div>
                        <div
                          className="font-mono text-[12px]"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {variant.id}
                        </div>

                        {variant.label !== "—" && (
                          <div
                            className="mt-1 text-[12px]"
                            style={{ color: "var(--text-muted)" }}
                          >
                            {variant.label}
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="px-3">
                      <span
                        className="font-mono text-[12px]"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {variant.profile}
                      </span>
                    </td>

                    <td className="px-3">
                      <span
                        className="font-mono text-[12px]"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {variant.version}
                      </span>
                    </td>

                    <td className="max-w-[300px] px-3">
                      <span
                        className="font-mono text-[12px]"
                        style={{
                          color: "var(--text-secondary)",
                          wordBreak: "break-all",
                        }}
                      >
                        {variant.sha256}
                      </span>
                    </td>

                    <td
                      className="px-3 text-right font-mono text-[12px]"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {variant.size !== null
                        ? `${variant.size.toLocaleString()} B`
                        : "—"}
                    </td>

                    <td className="px-3">
                      <span className="flex items-center gap-2">
                        {variant.status !== "—" && (
                          <span
                            aria-hidden="true"
                            className="h-[6px] w-[6px] rounded-full"
                            style={{
                              background:
                                variant.status === "AVAILABLE"
                                  ? "var(--state-success)"
                                  : "var(--text-muted)",
                            }}
                          />
                        )}

                        <span
                          className="font-mono text-[12px]"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {variant.status}
                        </span>
                      </span>
                    </td>

                    <td className="px-3">
                      {variant.authority ? (
                        <div>
                          <div
                            className="text-[12px]"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            {variant.authority}
                          </div>

                          <div
                            className="mt-1 text-[12px]"
                            style={{ color: "var(--text-muted)" }}
                          >
                            Signed: {variant.signed ? "true" : "false"}
                          </div>
                        </div>
                      ) : (
                        <span
                          className="font-mono text-[12px]"
                          style={{ color: "var(--text-muted)" }}
                        >
                          —
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  )
}

export default Artifacts
import React, { useMemo, useState } from "react";
import {
  FileText,
  Download,
  Edit,
  Trash2,
  Plus,
  Crown,
  TrendingUp,
  Clock,
  CheckCircle2,
  LogOut,
  User as UserIcon,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

/** ---------------------------
 * Types (replace with your real types if needed)
 * --------------------------- */
export type UserProfile = {
  name: string;
  email: string;
  whatsappNo: string;
  pincode: string;
  joinedAt: string; // ISO
  resumesCreated: number;
  plan: "free" | "pro" | "enterprise" | string;
};

export type ResumeTemplate = {
  id: string;
  name: string;
  category?: string;
};

type StudentDashboardProps = {
  user: UserProfile;
  onLogout: () => void;

  // Provide your real components from parent
  TemplateGallery?: React.ComponentType<{
    selectedTemplate: ResumeTemplate | null;
    onSelectTemplate: (t: ResumeTemplate) => void;
  }>;

  ResumeBuilder?: React.ComponentType<{
    template: ResumeTemplate;
    onBack: () => void;
  }>;
};

type Resume = {
  id: string;
  name: string;
  templateId: string;
  templateName: string;
  lastModified: string;
  status: "draft" | "completed";
  downloadCount: number;
};

const mockResumes: Resume[] = [
  {
    id: "resume-1",
    name: "Software Engineer Resume",
    templateId: "modern-01",
    templateName: "Aurora",
    lastModified: new Date().toISOString(),
    status: "completed",
    downloadCount: 5,
  },
  {
    id: "resume-2",
    name: "Marketing Manager CV",
    templateId: "professional-02",
    templateName: "Summit",
    lastModified: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: "draft",
    downloadCount: 0,
  },
];

/** ---------------------------
 * Small UI components (no shadcn dependency)
 * --------------------------- */
const styles: Record<string, React.CSSProperties> = {
  page: { minHeight: "100vh", background: "linear-gradient(135deg,#f8fafc,#ffffff,#eff6ff)" },
  container: { maxWidth: 1100, margin: "0 auto", padding: 18 },
  header: { borderBottom: "1px solid #e5e7eb", background: "#fff", boxShadow: "0 1px 2px rgba(0,0,0,0.06)" },
  headerInner: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "14px 18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  brand: { display: "flex", alignItems: "center", gap: 12 },
  brandIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    background: "#4f46e5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  brandTitle: { margin: 0, fontSize: 18, fontWeight: 900, color: "#0f172a" },
  brandSub: { margin: "2px 0 0", fontSize: 12, fontWeight: 700, color: "#64748b" },

  row: { display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" },

  btn: {
    borderRadius: 12,
    padding: "10px 14px",
    border: "1px solid #e2e8f0",
    background: "#fff",
    cursor: "pointer",
    fontWeight: 850,
    color: "#0f172a",
  },
  btnPrimary: {
    borderRadius: 12,
    padding: "10px 14px",
    border: "1px solid #4338ca",
    background: "#4f46e5",
    cursor: "pointer",
    fontWeight: 900,
    color: "#fff",
    boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
  },
  btnGhostIcon: {
    borderRadius: 12,
    padding: 10,
    border: "1px solid transparent",
    background: "transparent",
    cursor: "pointer",
  },

  card: {
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: 16,
    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
  },
  cardHeader: { padding: "16px 16px 0" },
  cardTitle: { margin: 0, fontSize: 16, fontWeight: 900, color: "#0f172a" },
  cardDesc: { margin: "6px 0 0", fontSize: 13, fontWeight: 700, color: "#64748b" },
  cardBody: { padding: 16 },

  grid4: { display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 12 },
  grid3: { display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 12 },
  grid2: { display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 12 },

  badge: {
    display: "inline-flex",
    alignItems: "center",
    padding: "5px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 900,
    border: "1px solid #e2e8f0",
    color: "#0f172a",
    background: "#fff",
  },
  badgePrimary: { border: "1px solid #c7d2fe", background: "#eef2ff", color: "#3730a3" },
  badgeSecondary: { border: "1px solid #dbeafe", background: "#eff6ff", color: "#1d4ed8" },
  badgeOutline: { border: "1px solid #e2e8f0", background: "#fff", color: "#0f172a" },

  tabsRow: { display: "flex", gap: 8, flexWrap: "wrap" },
  tabBtn: {
    borderRadius: 12,
    padding: "10px 14px",
    border: "1px solid #e2e8f0",
    background: "#fff",
    cursor: "pointer",
    fontWeight: 900,
    color: "#0f172a",
  },
  tabBtnActive: {
    border: "1px solid #c7d2fe",
    background: "#eef2ff",
    color: "#3730a3",
  },

  statLabel: { display: "flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 900, color: "#64748b" },
  statValue: { fontSize: 28, fontWeight: 900, color: "#0f172a", marginTop: 6 },

  listItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    border: "1px solid #e5e7eb",
    borderRadius: 14,
    padding: 14,
    background: "#fff",
  },

  avatar: {
    width: 72,
    height: 72,
    borderRadius: 999,
    background: "#f1f5f9",
    border: "1px solid #e2e8f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 900,
    fontSize: 22,
    color: "#0f172a",
  },

  progressWrap: { height: 10, background: "#f1f5f9", borderRadius: 999, overflow: "hidden", border: "1px solid #e2e8f0" },
  progressBar: { height: "100%", background: "#4f46e5" },

  // responsive (simple)
  responsiveGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: 12,
  },
};

function cx(...arr: Array<string | false | undefined>) {
  return arr.filter(Boolean).join(" ");
}

function Badge({ variant, children }: { variant?: "default" | "secondary" | "outline"; children: React.ReactNode }) {
  const base = styles.badge;
  const v =
    variant === "default" ? styles.badgePrimary : variant === "secondary" ? styles.badgeSecondary : styles.badgeOutline;
  return <span style={{ ...base, ...v }}>{children}</span>;
}

function Card({
  title,
  description,
  right,
  children,
}: {
  title?: React.ReactNode;
  description?: React.ReactNode;
  right?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div style={styles.card}>
      {(title || description || right) && (
        <div style={{ ...styles.cardHeader, display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
          <div>
            {title && <h3 style={styles.cardTitle}>{title}</h3>}
            {description && <p style={styles.cardDesc}>{description}</p>}
          </div>
          {right}
        </div>
      )}
      <div style={styles.cardBody}>{children}</div>
    </div>
  );
}

function Progress({ value }: { value: number }) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div style={styles.progressWrap}>
      <div style={{ ...styles.progressBar, width: `${v}%` }} />
    </div>
  );
}

/** ---------------------------
 * Main Component
 * --------------------------- */
export default function StudentDashboard({ user, onLogout, TemplateGallery, ResumeBuilder }: StudentDashboardProps) {
  const [view, setView] = useState<"dashboard" | "templates" | "builder">("dashboard");
  const [tab, setTab] = useState<"overview" | "resumes" | "profile">("overview");

  const [resumes, setResumes] = useState<Resume[]>(mockResumes);
  const [selectedTemplate, setSelectedTemplate] = useState<ResumeTemplate | null>(null);

  const planBadgeVariant = user.plan === "enterprise" ? "default" : user.plan === "pro" ? "secondary" : "outline";

  const initials = useMemo(() => {
    const parts = (user.name || "U").trim().split(/\s+/);
    return parts.map((p) => p[0]?.toUpperCase()).slice(0, 2).join("");
  }, [user.name]);

  const totalDownloads = useMemo(() => resumes.reduce((sum, r) => sum + r.downloadCount, 0), [resumes]);

  const completedCount = useMemo(() => resumes.filter((r) => r.status === "completed").length, [resumes]);
  const draftCount = useMemo(() => resumes.filter((r) => r.status === "draft").length, [resumes]);

  const handleSelectTemplate = (template: ResumeTemplate) => {
    setSelectedTemplate(template);
    setView("builder");
  };

  const handleBackToDashboard = () => {
    setView("dashboard");
    setSelectedTemplate(null);
  };

  // Template view (if component given)
  if (view === "templates") {
    return (
      <div style={{ height: "100vh", overflow: "hidden", background: "#fff" }}>
        <div style={{ height: 64, borderBottom: "1px solid #e5e7eb", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 18px" }}>
          <button style={styles.btn} onClick={() => setView("dashboard")}>
            Back to Dashboard
          </button>
          <h1 style={{ margin: 0, fontSize: 16, fontWeight: 900 }}>Choose a Template</h1>
          <div style={{ width: 90 }} />
        </div>

        {TemplateGallery ? (
          <TemplateGallery selectedTemplate={selectedTemplate} onSelectTemplate={handleSelectTemplate} />
        ) : (
          <div style={{ padding: 18, color: "#64748b", fontWeight: 800 }}>
            TemplateGallery component not provided yet.
          </div>
        )}
      </div>
    );
  }

  // Builder view (if component given)
  if (view === "builder" && selectedTemplate) {
    return ResumeBuilder ? (
      <ResumeBuilder template={selectedTemplate} onBack={handleBackToDashboard} />
    ) : (
      <div style={{ padding: 18 }}>
        <button style={styles.btn} onClick={handleBackToDashboard}>
          Back
        </button>
        <p style={{ marginTop: 12, color: "#64748b", fontWeight: 800 }}>
          ResumeBuilder component not provided yet.
        </p>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div style={styles.brand}>
            <div style={styles.brandIcon}>
              <FileText size={18} color="#fff" />
            </div>
            <div>
              <h1 style={styles.brandTitle}>Resume Builder</h1>
              <p style={styles.brandSub}>Student Dashboard</p>
            </div>
          </div>

          <div style={styles.row}>
            <Badge variant={planBadgeVariant as any}>{String(user.plan).toUpperCase()} Plan</Badge>
            <button style={styles.btnGhostIcon} onClick={onLogout} title="Logout" aria-label="Logout">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>

      <div style={styles.container}>
        {/* Tabs */}
        <div style={{ ...styles.tabsRow, marginBottom: 14 }}>
          <button
            style={{ ...styles.tabBtn, ...(tab === "overview" ? styles.tabBtnActive : {}) }}
            onClick={() => setTab("overview")}
          >
            Overview
          </button>
          <button
            style={{ ...styles.tabBtn, ...(tab === "resumes" ? styles.tabBtnActive : {}) }}
            onClick={() => setTab("resumes")}
          >
            My Resumes
          </button>
          <button
            style={{ ...styles.tabBtn, ...(tab === "profile" ? styles.tabBtnActive : {}) }}
            onClick={() => setTab("profile")}
          >
            Profile
          </button>
        </div>

        {/* OVERVIEW */}
        {tab === "overview" && (
          <div style={{ display: "grid", gap: 14 }}>
            {/* Welcome */}
            <Card
              title={null}
              description={null}
              right={
                <button style={styles.btnPrimary} onClick={() => setView("templates")}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                    <Plus size={16} /> Create New Resume
                  </span>
                </button>
              }
            >
              <div>
                <h2 style={{ margin: 0, fontSize: 22, fontWeight: 950, color: "#0f172a" }}>
                  Welcome back, {user.name}!
                </h2>
                <p style={{ margin: "6px 0 0", color: "#64748b", fontWeight: 700 }}>
                  Let's create your perfect resume
                </p>
              </div>
            </Card>

            {/* Stats */}
            <div
              style={{
                display: "grid",
                gap: 12,
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              }}
            >
              <Card
                title={
                  <span style={styles.statLabel}>
                    <FileText size={16} /> Total Resumes
                  </span>
                }
              >
                <div style={styles.statValue}>{resumes.length}</div>
              </Card>

              <Card
                title={
                  <span style={styles.statLabel}>
                    <CheckCircle2 size={16} /> Completed
                  </span>
                }
              >
                <div style={{ ...styles.statValue, color: "#16a34a" }}>{completedCount}</div>
              </Card>

              <Card
                title={
                  <span style={styles.statLabel}>
                    <Clock size={16} /> In Progress
                  </span>
                }
              >
                <div style={{ ...styles.statValue, color: "#ca8a04" }}>{draftCount}</div>
              </Card>

              <Card
                title={
                  <span style={styles.statLabel}>
                    <Download size={16} /> Downloads
                  </span>
                }
              >
                <div style={styles.statValue}>{totalDownloads}</div>
              </Card>
            </div>

            {/* Upgrade card */}
            {user.plan === "free" && (
              <div
                style={{
                  ...styles.card,
                  border: "1px solid rgba(79,70,229,0.35)",
                  background: "linear-gradient(90deg, rgba(79,70,229,0.06), rgba(168,85,247,0.06))",
                }}
              >
                <div style={{ padding: 16, display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 14, flexWrap: "wrap" }}>
                  <div style={{ display: "flex", gap: 12, maxWidth: 700 }}>
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 999,
                        background: "rgba(79,70,229,0.10)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1px solid rgba(79,70,229,0.15)",
                      }}
                    >
                      <Crown size={22} color="#4f46e5" />
                    </div>

                    <div>
                      <div style={{ fontSize: 18, fontWeight: 950, color: "#0f172a" }}>Upgrade to Pro</div>
                      <div style={{ marginTop: 6, fontSize: 13, fontWeight: 750, color: "#64748b" }}>
                        Unlock 45+ premium templates, AI features, and unlimited downloads
                      </div>

                      <div style={{ marginTop: 10, display: "grid", gap: 6 }}>
                        {[
                          "Access to all premium templates",
                          "AI-powered content suggestions",
                          "Priority support",
                        ].map((t) => (
                          <div key={t} style={{ display: "flex", alignItems: "center", gap: 8, color: "#64748b", fontWeight: 750, fontSize: 13 }}>
                            <CheckCircle2 size={14} color="#16a34a" /> {t}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <div style={{ marginBottom: 8 }}>
                      <span style={{ fontSize: 28, fontWeight: 950, color: "#0f172a" }}>₹999</span>{" "}
                      <span style={{ color: "#64748b", fontWeight: 750 }}>/year</span>
                    </div>
                    <button style={styles.btnPrimary}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                        <TrendingUp size={16} /> Upgrade Now
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Recent resumes */}
            <Card
              title="Recent Resumes"
              description="Your recently modified resumes"
              right={
                <button style={styles.btn} onClick={() => setView("templates")}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                    <Plus size={16} /> New Resume
                  </span>
                </button>
              }
            >
              <div style={{ display: "grid", gap: 10 }}>
                {resumes.slice(0, 3).map((resume) => (
                  <div key={resume.id} style={styles.listItem}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: 14,
                          background: "rgba(79,70,229,0.10)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: "1px solid rgba(79,70,229,0.15)",
                        }}
                      >
                        <FileText size={22} color="#4f46e5" />
                      </div>

                      <div>
                        <div style={{ fontWeight: 900, color: "#0f172a" }}>{resume.name}</div>
                        <div style={{ fontSize: 13, fontWeight: 750, color: "#64748b" }}>
                          {resume.templateName} • Modified {new Date(resume.lastModified).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <Badge variant={resume.status === "completed" ? "default" : "secondary"}>
                        {resume.status}
                      </Badge>
                      <button style={styles.btnGhostIcon} title="Edit" aria-label="Edit">
                        <Edit size={16} />
                      </button>
                      <button style={styles.btnGhostIcon} title="Download" aria-label="Download">
                        <Download size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* RESUMES */}
        {tab === "resumes" && (
          <Card
            title="All Resumes"
            description={`${resumes.length} resumes created`}
            right={
              <button style={styles.btnPrimary} onClick={() => setView("templates")}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                  <Plus size={16} /> Create New
                </span>
              </button>
            }
          >
            <div
              style={{
                display: "grid",
                gap: 12,
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              }}
            >
              {resumes.map((resume) => (
                <div key={resume.id} style={styles.card}>
                  <div style={{ padding: 16, display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                    <FileText size={30} color="#4f46e5" />
                    <Badge variant={resume.status === "completed" ? "default" : "secondary"}>{resume.status}</Badge>
                  </div>

                  <div style={{ padding: "0 16px 16px" }}>
                    <div style={{ fontWeight: 950, color: "#0f172a" }}>{resume.name}</div>
                    <div style={{ marginTop: 4, fontSize: 13, fontWeight: 750, color: "#64748b" }}>
                      {resume.templateName}
                    </div>

                    <div style={{ marginTop: 12, display: "grid", gap: 8 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                        <span style={{ color: "#64748b", fontWeight: 750 }}>Modified</span>
                        <span style={{ color: "#0f172a", fontWeight: 850 }}>
                          {new Date(resume.lastModified).toLocaleDateString()}
                        </span>
                      </div>

                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                        <span style={{ color: "#64748b", fontWeight: 750 }}>Downloads</span>
                        <span style={{ color: "#0f172a", fontWeight: 900 }}>{resume.downloadCount}</span>
                      </div>

                      <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                        <button style={{ ...styles.btn, flex: 1 }}>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                            <Edit size={14} /> Edit
                          </span>
                        </button>
                        <button style={styles.btn} aria-label="Download">
                          <Download size={14} />
                        </button>
                        <button style={styles.btn} aria-label="Delete">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* PROFILE */}
        {tab === "profile" && (
          <div style={{ display: "grid", gap: 14 }}>
            <Card title="Profile Information" description="Your account details and settings">
              <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                <div style={styles.avatar}>{initials}</div>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 950, color: "#0f172a" }}>{user.name}</div>
                  <div style={{ marginTop: 6 }}>
                    <Badge variant={planBadgeVariant as any}>{String(user.plan).toUpperCase()} Plan</Badge>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 16, display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#64748b", fontWeight: 850, fontSize: 13 }}>
                    <Mail size={16} /> Email
                  </div>
                  <div style={{ marginTop: 6, fontWeight: 900, color: "#0f172a" }}>{user.email}</div>
                </div>

                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#64748b", fontWeight: 850, fontSize: 13 }}>
                    <Phone size={16} /> WhatsApp
                  </div>
                  <div style={{ marginTop: 6, fontWeight: 900, color: "#0f172a" }}>+91 {user.whatsappNo}</div>
                </div>

                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#64748b", fontWeight: 850, fontSize: 13 }}>
                    <MapPin size={16} /> Pincode
                  </div>
                  <div style={{ marginTop: 6, fontWeight: 900, color: "#0f172a" }}>{user.pincode}</div>
                </div>

                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#64748b", fontWeight: 850, fontSize: 13 }}>
                    <UserIcon size={16} /> Member Since
                  </div>
                  <div style={{ marginTop: 6, fontWeight: 900, color: "#0f172a" }}>
                    {new Date(user.joinedAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </Card>

            <Card title="Account Status" description="Your subscription and usage details">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ fontSize: 13, fontWeight: 850, color: "#0f172a" }}>Resumes Created</div>
                <div style={{ fontSize: 26, fontWeight: 950, color: "#0f172a" }}>{user.resumesCreated}</div>
              </div>

              <div style={{ marginTop: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                  <span style={{ color: "#64748b", fontWeight: 850 }}>Usage Limit</span>
                  <span style={{ color: "#0f172a", fontWeight: 900 }}>
                    {user.resumesCreated} / {user.plan === "free" ? "5" : "Unlimited"}
                  </span>
                </div>

                <div style={{ marginTop: 8 }}>
                  <Progress value={(user.resumesCreated / (user.plan === "free" ? 5 : 100)) * 100} />
                </div>

                {user.plan === "free" && (
                  <button style={{ ...styles.btn, width: "100%", marginTop: 12 }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                      <Crown size={16} /> Upgrade for Unlimited Access
                    </span>
                  </button>
                )}
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

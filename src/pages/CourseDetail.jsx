import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { SEMESTERS, getCourseIcon } from "../data/courses";
import api from "../utils/api";

const msMap = {
  "binary-tree": "account_tree", "route": "alt_route", "code": "code", "database": "storage",
  "cpu": "memory", "network": "hub", "brain": "psychology", "robot": "smart_toy",
  "world-www": "language", "terminal-2": "terminal", "circuit-board": "developer_board",
  "git-branch": "fork_right", "math": "calculate", "calculator": "calculate", "atom": "science",
  "flask": "biotech", "bolt": "bolt", "language": "translate", "book": "menu_book",
  "pencil-ruler": "design_services", "antenna": "cell_tower", "cpu-2": "computer",
  "award": "workspace_premium", "microscope": "biotech", "tool": "build",
  "layout-project": "assignment", "chart-bar": "bar_chart", "users": "groups",
  "chart-dots": "analytics", "variable": "functions", "omega": "all_inclusive", "book-2": "auto_stories",
};

const TABS = [
  { key: "book", icon: "menu_book", label: "Textbooks", color: "#0F382C", bg: "#EDF4F1" },
  { key: "note", icon: "description", label: "Notes", color: "#1D4ED8", bg: "#EFF6FF" },
  { key: "video", icon: "play_circle", label: "Videos", color: "#C2410C", bg: "#FFF7ED" },
  { key: "other", icon: "folder_open", label: "Others", color: "#7C3AED", bg: "#F5F3FF" },
];

export default function CourseDetail({ user }) {
  const { courseCode } = useParams();
  const decoded = decodeURIComponent(courseCode);
  const [tab, setTab] = useState("book");
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  let course = null, sem = null;
  for (const s of SEMESTERS) {
    const c = s.courses.find((c) => c.code === decoded);
    if (c) {
      course = c;
      sem = s;
      break;
    }
  }

  useEffect(() => {
    if (!course) return;
    setLoading(true);
    api
      .get(`/resources?course=${encodeURIComponent(decoded)}&type=${tab}`)
      .then(({ data }) => setResources(data.data || []))
      .catch(() => setResources([]))
      .finally(() => setLoading(false));
  }, [decoded, tab]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this resource?")) return;
    await api.delete(`/resources/${id}`);
    setResources((prev) => prev.filter((r) => r._id !== id));
  };

  if (!course)
    return (
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "4rem 1.5rem", textAlign: "center" }}>
        <p style={{ color: "#6C7A75", marginBottom: 16, fontFamily: "var(--body, sans-serif)" }}>
          Course not found.
        </p>
        <Link
          to="/levels"
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "10px 20px",
            borderRadius: "8px",
            backgroundColor: "#0F382C",
            color: "#fff",
            textDecoration: "none",
            fontWeight: 600,
            fontSize: "14px",
          }}
        >
          Back to Levels
        </Link>
      </div>
    );

  const courseIcon = msMap[getCourseIcon(course.code, course.title)] || "auto_stories";
  const activeTab = TABS.find((t) => t.key === tab);

  return (
    <div style={{ backgroundColor: "#F9FAF8", minHeight: "100vh", color: "#1C2826", width: "100%" }}>
      <main
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "2rem 1.5rem 4rem",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* Back Navigation Link */}
        <Link
          to={`/semester/${sem.id}`}
          style={{
            fontFamily: "var(--body, sans-serif)",
            fontSize: "13px",
            fontWeight: 600,
            color: "#1B634B",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            marginBottom: "20px",
            textDecoration: "none",
            transition: "opacity 0.2s",
          }}
          className="back-btn"
        >
          <span className="ms sm" style={{ fontSize: "16px" }}>arrow_back</span>
          {sem.name}
        </Link>

        {/* Main Card Container */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "16px",
            border: "1px solid #E8EFEB",
            boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
            overflow: "hidden",
          }}
        >
          {/* Course Header Info */}
          <div
            style={{
              padding: "clamp(1.2rem, 3vw, 1.8rem)",
              borderBottom: "1px solid #E8EFEB",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: 16,
                flexWrap: "wrap",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14, flex: 1, minWidth: 0 }}>
                {/* Course Icon Box */}
                <div
                  style={{
                    width: 52,
                    height: 52,
                    minWidth: 52,
                    borderRadius: "12px",
                    backgroundColor: "#EDF4F1",
                    border: "1px solid #D2E3DB",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <span className="ms" style={{ color: "#1B634B", fontSize: "24px" }}>
                    {courseIcon}
                  </span>
                </div>

                {/* Course Title & Code */}
                <div style={{ minWidth: 0 }}>
                  <h1
                    style={{
                      fontFamily: "var(--display, sans-serif)",
                      fontWeight: 800,
                      fontSize: "clamp(18px, 3.5vw, 22px)",
                      color: "#111B18",
                      marginBottom: "6px",
                      lineHeight: 1.25,
                    }}
                  >
                    {course.title}
                  </h1>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                    <span
                      style={{
                        fontFamily: "var(--mono, monospace)",
                        fontSize: "11px",
                        color: "#1B634B",
                        fontWeight: 600,
                        backgroundColor: "#EDF4F1",
                        padding: "2px 8px",
                        borderRadius: "4px",
                      }}
                    >
                      {course.code}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--body, sans-serif)",
                        fontSize: "12px",
                        color: "#6C7A75",
                        fontWeight: 500,
                      }}
                    >
                      {course.credit} Cr · Level {sem.level} Term {sem.term}
                    </span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Link
                to={`/upload?course=${encodeURIComponent(decoded)}&semId=${sem.id}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "10px 18px",
                  borderRadius: "8px",
                  backgroundColor: "#0F382C",
                  color: "#FFFFFF",
                  fontWeight: 600,
                  fontSize: "13px",
                  textDecoration: "none",
                  boxShadow: "0 2px 6px rgba(15, 56, 44, 0.15)",
                  transition: "all 0.2s ease",
                  flexShrink: 0,
                }}
                className="btn-primary-hover"
              >
                <span className="ms sm" style={{ fontSize: "16px" }}>upload_file</span>
                <span>Submit Resource</span>
              </Link>
            </div>

            {/* Navigation Tabs */}
            <div
              style={{
                display: "flex",
                gap: "8px",
                marginTop: "24px",
                overflowX: "auto",
                scrollbarWidth: "none",
                paddingBottom: "2px",
              }}
            >
              {TABS.map((t) => {
                const isActive = tab === t.key;
                return (
                  <button
                    key={t.key}
                    onClick={() => setTab(t.key)}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "8px 16px",
                      borderRadius: "8px",
                      fontFamily: "var(--display, sans-serif)",
                      fontWeight: isActive ? 700 : 500,
                      fontSize: "13px",
                      color: isActive ? t.color : "#6C7A75",
                      backgroundColor: isActive ? t.bg : "transparent",
                      border: isActive ? `1px solid ${t.color}25` : "1px solid transparent",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                      transition: "all 0.18s ease",
                      outline: "none",
                    }}
                  >
                    <span className="ms sm" style={{ fontSize: "18px", color: isActive ? t.color : "#8A9993" }}>
                      {t.icon}
                    </span>
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Resources Content List / Empty State */}
          <div style={{ padding: "clamp(1.2rem, 3vw, 1.8rem)" }}>
            {loading ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    style={{
                      height: 64,
                      backgroundColor: "#F4F7F5",
                      borderRadius: "10px",
                      animation: "pulse 1.5s infinite",
                    }}
                  />
                ))}
              </div>
            ) : resources.length === 0 ? (
              <div style={{ textAlign: "center", padding: "3rem 1rem" }} className="fade-in">
                <div
                  style={{
                    width: 58,
                    height: 58,
                    borderRadius: "50%",
                    backgroundColor: "#F2F6F4",
                    border: "1px solid #E1E8E4",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px",
                  }}
                >
                  <span className="ms xl" style={{ color: "#8A9993", fontSize: "28px" }}>
                    inbox
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: "var(--display, sans-serif)",
                    fontWeight: 700,
                    fontSize: "16px",
                    color: "#111B18",
                    marginBottom: "6px",
                  }}
                >
                  No {activeTab?.label} Yet
                </h3>
                <p
                  style={{
                    fontFamily: "var(--body, sans-serif)",
                    fontSize: "13px",
                    color: "#6C7A75",
                    fontWeight: 400,
                    lineHeight: 1.6,
                    maxWidth: "320px",
                    margin: "0 auto 20px",
                  }}
                >
                  Be the first to contribute a learning resource for this course.
                </p>
                <Link
                  to={`/upload?course=${encodeURIComponent(decoded)}&semId=${sem.id}&type=${tab}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "9px 18px",
                    borderRadius: "8px",
                    backgroundColor: "#0F382C",
                    color: "#FFFFFF",
                    fontWeight: 600,
                    fontSize: "13px",
                    textDecoration: "none",
                  }}
                  className="btn-primary-hover"
                >
                  <span className="ms sm" style={{ fontSize: "16px" }}>upload_file</span>
                  Submit Resource
                </Link>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {resources.map((r) => (
                  <div
                    key={r._id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      padding: "12px 16px",
                      borderRadius: "10px",
                      backgroundColor: "#FAFBF9",
                      border: "1px solid #E8EFEB",
                      transition: "all 0.2s ease",
                    }}
                    className="resource-item"
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        minWidth: 40,
                        borderRadius: "8px",
                        backgroundColor: activeTab?.bg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: `1px solid ${activeTab?.color}20`,
                        flexShrink: 0,
                      }}
                    >
                      <span className="ms sm" style={{ color: activeTab?.color, fontSize: "20px" }}>
                        {activeTab?.icon}
                      </span>
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h4
                        style={{
                          fontFamily: "var(--display, sans-serif)",
                          fontWeight: 700,
                          fontSize: "14px",
                          color: "#111B18",
                          marginBottom: "3px",
                          lineHeight: 1.3,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {r.title}
                      </h4>
                      <p
                        style={{
                          fontFamily: "var(--body, sans-serif)",
                          fontSize: "12px",
                          color: "#6C7A75",
                          fontWeight: 400,
                        }}
                      >
                        {r.uploadedBy?.name || "Anonymous"}
                        {r.createdAt &&
                          ` · ${new Date(r.createdAt).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}`}
                      </p>
                    </div>

                    <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                      {r.fileUrl && (
                        <a
                          href={r.fileUrl}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: "8px",
                            border: "1px solid #D8E2DC",
                            backgroundColor: "#FFFFFF",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#0F382C",
                            textDecoration: "none",
                            transition: "all 0.18s ease",
                          }}
                          className="action-btn"
                          title={r.type === "video" ? "Open Link" : "Download File"}
                        >
                          <span className="ms sm" style={{ fontSize: "18px" }}>
                            {r.type === "video" ? "open_in_new" : "download"}
                          </span>
                        </a>
                      )}
                      {user && r.uploadedBy?._id === user._id && (
                        <button
                          onClick={() => handleDelete(r._id)}
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: "8px",
                            border: "1px solid #FECACA",
                            backgroundColor: "#FEF2F2",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#991B1B",
                            cursor: "pointer",
                            transition: "all 0.18s ease",
                          }}
                          title="Delete Resource"
                        >
                          <span className="ms sm" style={{ fontSize: "18px" }}>
                            delete
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Embedded Modern Styling & Hover Effects */}
      <style>{`
        .btn-primary-hover:hover {
          background-color: #144D3A !important;
          transform: translateY(-1px);
        }

        .resource-item:hover {
          background-color: #FFFFFF !important;
          border-color: #C8D8D0 !important;
          box-shadow: 0 4px 12px rgba(0,0,0,0.03);
        }

        .action-btn:hover {
          background-color: #EDF4F1 !important;
          border-color: #1B634B !important;
        }

        .back-btn:hover {
          opacity: 0.8;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
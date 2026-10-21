import { useParams, Link } from "react-router-dom";
import { SEMESTERS, getCourseIcon } from "../data/courses";

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

const SEM_COLORS = [
  "#0F382C", "#144D3A", "#1B634B", "#237A5C",
  "#0F382C", "#144D3A", "#1B634B", "#237A5C",
];

export default function Courses() {
  const { semId } = useParams();
  const sem = SEMESTERS.find((s) => s.id === semId);
  const semIdx = SEMESTERS.findIndex((s) => s.id === semId);
  const accentColor = SEM_COLORS[semIdx % SEM_COLORS.length] || "#0F382C";

  if (!sem)
    return (
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "4rem 1.5rem", textAlign: "center" }}>
        <p style={{ color: "#6C7A75", marginBottom: 16, fontFamily: "var(--body, sans-serif)" }}>
          Semester not found.
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
        {/* Back Link */}
        <Link
          to="/levels"
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
          All Semesters
        </Link>

        {/* Header Banner */}
        <div
          style={{
            background: `linear-gradient(135deg, ${accentColor} 0%, #082119 100%)`,
            borderRadius: "16px",
            padding: "clamp(1.5rem, 4vw, 2.5rem)",
            marginBottom: "28px",
            overflow: "hidden",
            position: "relative",
            boxShadow: "0 10px 30px rgba(15, 56, 44, 0.12)",
          }}
        >
          {/* Subtle Decorative Circle */}
          <div
            style={{
              position: "absolute",
              right: -30,
              top: -30,
              width: 160,
              height: 160,
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.04)",
              pointerEvents: "none",
            }}
          />

          <p
            style={{
              fontFamily: "var(--body, sans-serif)",
              fontSize: "11px",
              fontWeight: 700,
              color: "rgba(255, 255, 255, 0.7)",
              letterSpacing: "1.2px",
              textTransform: "uppercase",
              marginBottom: "8px",
            }}
          >
            BAIUST CSE · {sem.ordinal} Semester
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <div>
              <h1
                style={{
                  fontFamily: "var(--display, sans-serif)",
                  fontWeight: 800,
                  fontSize: "clamp(24px, 5vw, 38px)",
                  color: "#FFFFFF",
                  letterSpacing: "-0.5px",
                  marginBottom: "6px",
                  lineHeight: 1.15,
                }}
              >
                Level {sem.level} · Term {sem.term}
              </h1>
              <p
                style={{
                  fontFamily: "var(--body, sans-serif)",
                  fontSize: "14px",
                  color: "rgba(255, 255, 255, 0.75)",
                  fontWeight: 400,
                }}
              >
                {sem.name} — {sem.courses.length} courses
              </p>
            </div>

            <div
              style={{
                fontFamily: "var(--display, sans-serif)",
                fontWeight: 800,
                fontSize: "clamp(42px, 10vw, 68px)",
                color: "rgba(255, 255, 255, 0.12)",
                lineHeight: 1,
                letterSpacing: "-2px",
                userSelect: "none",
              }}
            >
              {sem.label}
            </div>
          </div>
        </div>

        {/* Section Title Divider */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "20px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--display, sans-serif)",
              fontSize: "12px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "1.2px",
              color: "#6C7A75",
            }}
          >
            Course Listing
          </span>
          <div style={{ flex: 1, height: "1px", backgroundColor: "#E3EAE6" }} />
        </div>

        {/* Course Cards List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {sem.courses.map((course, i) => {
            const icon = msMap[getCourseIcon(course.code, course.title)] || "auto_stories";
            const isLab = course.title.toLowerCase().includes("sessional");

            return (
              <Link
                key={course.code}
                to={`/course/${encodeURIComponent(course.code)}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  className="course-card"
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "12px",
                    border: "1px solid #E8EFEB",
                    padding: "14px 18px",
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                    transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  {/* Icon Wrapper */}
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      minWidth: 44,
                      borderRadius: "10px",
                      flexShrink: 0,
                      backgroundColor: isLab ? "#F4F6F5" : "#EDF4F1",
                      border: `1px solid ${isLab ? "#E1E8E4" : "#D2E3DB"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      className="ms"
                      style={{
                        color: isLab ? "#6C7A75" : "#1B634B",
                        fontSize: "20px",
                      }}
                    >
                      {icon}
                    </span>
                  </div>

                  {/* Course Details */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3
                      style={{
                        fontFamily: "var(--body, sans-serif)",
                        fontWeight: 600,
                        fontSize: "clamp(14px, 2.5vw, 16px)",
                        color: "#111B18",
                        marginBottom: "6px",
                        lineHeight: 1.35,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {course.title}
                    </h3>

                    <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                      <span
                        style={{
                          fontFamily: "var(--mono, monospace)",
                          fontSize: "11px",
                          color: "#1B634B",
                          fontWeight: 600,
                          backgroundColor: "#EDF4F1",
                          padding: "2px 8px",
                          borderRadius: "4px",
                          letterSpacing: "0.02em",
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
                        {course.credit} Cr
                      </span>
                      {isLab && (
                        <span
                          style={{
                            fontFamily: "var(--body, sans-serif)",
                            fontSize: "11px",
                            padding: "2px 8px",
                            borderRadius: "4px",
                            backgroundColor: "#F2F5F3",
                            color: "#586762",
                            border: "1px solid #E1E8E4",
                            fontWeight: 600,
                          }}
                        >
                          Lab / Sessional
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right Arrow */}
                  <span
                    className="ms sm"
                    style={{
                      color: "#9CAAA4",
                      flexShrink: 0,
                      fontSize: "18px",
                      transition: "transform 0.2s ease, color 0.2s ease",
                    }}
                  >
                    arrow_forward
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </main>

      {/* Hover Animations */}
      <style>{`
        .course-card:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(15, 56, 44, 0.06) !important;
          border-color: #C8D8D0 !important;
        }

        .course-card:hover .ms.sm {
          color: #1B634B !important;
          transform: translateX(2px);
        }

        .back-btn:hover {
          opacity: 0.8;
        }
      `}</style>
    </div>
  );
}
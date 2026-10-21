import { Link } from "react-router-dom";
import { SEMESTERS } from "../data/courses";

// Premium Accent Color Palette (Forest & Emerald Tones)
const SEM_COLORS = [
  "#0F382C", "#144D3A", "#1B634B", "#237A5C",
  "#0F382C", "#144D3A", "#1B634B", "#237A5C",
];

export default function LevelTerm({ user }) {
  return (
    <div style={{ backgroundColor: "#F9FAF8", minHeight: "100vh", color: "#1C2826", width: "100%" }}>
      {/* Hero Header Section */}
      <section
        style={{
          background: "linear-gradient(180deg, #EDF3F0 0%, #F9FAF8 100%)",
          padding: "3.5rem 1.5rem 2.5rem",
          borderBottom: "1px solid rgba(15, 56, 44, 0.06)",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
          <div style={{ maxWidth: "680px" }} className="fade-in">
            {/* Pill Tag */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 14px",
                borderRadius: "100px",
                backgroundColor: "rgba(15, 56, 44, 0.06)",
                border: "1px solid rgba(15, 56, 44, 0.12)",
                color: "#0F382C",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.8px",
                textTransform: "uppercase",
                marginBottom: "20px",
              }}
            >
              <span className="ms sm" style={{ fontSize: "14px" }}>verified</span>
              BAIUST CSE · Academic Repository
            </div>

            {/* Title */}
            <h1
              style={{
                fontFamily: "var(--display, sans-serif)",
                fontWeight: 800,
                fontSize: "clamp(2.2rem, 5vw, 3.2rem)",
                color: "#0A241C",
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                marginBottom: "16px",
              }}
            >
              Welcome back,{" "}
              <span
                style={{
                  fontFamily: "var(--serif, serif)",
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "#1B634B",
                }}
              >
                {user?.name?.split(" ")[0] || "Student"}
              </span>
            </h1>

            {/* Description */}
            <p
              style={{
                fontFamily: "var(--body, sans-serif)",
                fontSize: "clamp(14px, 2vw, 16px)",
                color: "#4A5854",
                fontWeight: 400,
                lineHeight: 1.65,
                marginBottom: "28px",
              }}
            >
              Access curated textbooks, lecture notes, lab manuals, and video resources organized by Level and Term.
            </p>

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <Link
                to="/upload"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "11px 22px",
                  borderRadius: "10px",
                  backgroundColor: "#0F382C",
                  color: "#FFFFFF",
                  fontWeight: 600,
                  fontSize: "14px",
                  textDecoration: "none",
                  boxShadow: "0 4px 14px rgba(15, 56, 44, 0.18)",
                  transition: "all 0.2s ease",
                }}
                className="btn-primary-hover"
              >
                <span className="ms sm" style={{ fontSize: "18px" }}>upload_file</span> Submit Resource
              </Link>
              <Link
                to="/search"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "11px 22px",
                  borderRadius: "10px",
                  backgroundColor: "#FFFFFF",
                  color: "#0F382C",
                  border: "1px solid #D8E2DC",
                  fontWeight: 600,
                  fontSize: "14px",
                  textDecoration: "none",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                  transition: "all 0.2s ease",
                }}
                className="btn-outline-hover"
              >
                <span className="ms sm" style={{ fontSize: "18px" }}>search</span> Quick Search
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "2.5rem 1.5rem 4rem",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* Section Divider */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "28px",
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
            Select Semester
          </span>
          <div style={{ flex: 1, height: "1px", backgroundColor: "#E3EAE6" }} />
        </div>

        {/* Semester Cards Grid */}
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px" }}
          className="lt-grid"
        >
          {SEMESTERS.map((sem, idx) => {
            const accentColor = SEM_COLORS[idx % SEM_COLORS.length];
            return (
              <Link
                key={sem.id}
                to={`/semester/${sem.id}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  className="pro-card"
                  style={{
                    display: "flex",
                    alignItems: "stretch",
                    backgroundColor: "#FFFFFF",
                    borderRadius: "14px",
                    border: "1px solid #E8EFEB",
                    overflow: "hidden",
                    minHeight: "84px",
                    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.02)",
                    transition: "all 0.22s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  {/* Left Label Accent Block */}
                  <div
                    style={{
                      width: "82px",
                      minWidth: "82px",
                      backgroundColor: accentColor,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#FFFFFF",
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--display, sans-serif)",
                        fontWeight: 800,
                        fontSize: "26px",
                        letterSpacing: "-0.5px",
                      }}
                    >
                      {sem.label}
                    </span>
                  </div>

                  {/* Course Details Info */}
                  <div
                    style={{
                      flex: 1,
                      padding: "14px 18px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "var(--display, sans-serif)",
                        fontWeight: 700,
                        fontSize: "16px",
                        color: "#111B18",
                        marginBottom: "3px",
                        lineHeight: 1.25,
                      }}
                    >
                      {sem.name}
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--body, sans-serif)",
                        fontSize: "12px",
                        color: "#6C7A75",
                        marginBottom: "8px",
                        fontWeight: 400,
                      }}
                    >
                      Level {sem.level} · Term {sem.term}
                    </p>

                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 5,
                        fontSize: "11px",
                        fontWeight: 600,
                        padding: "3px 9px",
                        borderRadius: "6px",
                        backgroundColor: "#F2F6F4",
                        color: accentColor,
                        width: "fit-content",
                        border: "1px solid #E2EBE6",
                      }}
                    >
                      <span className="ms sm" style={{ fontSize: "13px" }}>
                        auto_stories
                      </span>
                      {sem.courses?.length || 0} Modules
                    </div>
                  </div>

                  {/* Navigation Arrow */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      paddingRight: "16px",
                      color: "#9CAAA4",
                    }}
                  >
                    <span className="ms sm" style={{ fontSize: "18px" }}>
                      arrow_forward
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Overview Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
            marginTop: "36px",
          }}
        >
          {[
            { icon: "layers", val: "8", label: "Semesters" },
            { icon: "menu_book", val: "60+", label: "Courses" },
            { icon: "school", val: "Open", label: "Access" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                backgroundColor: "#FFFFFF",
                padding: "20px 16px",
                borderRadius: "14px",
                textAlign: "center",
                border: "1px solid #E8EFEB",
                boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
              }}
            >
              <span
                className="ms"
                style={{
                  color: "#1B634B",
                  fontSize: "24px",
                  marginBottom: "4px",
                  display: "block",
                }}
              >
                {stat.icon}
              </span>
              <div
                style={{
                  fontFamily: "var(--display, sans-serif)",
                  fontWeight: 800,
                  fontSize: "22px",
                  color: "#0A241C",
                  lineHeight: 1.1,
                }}
              >
                {stat.val}
              </div>
              <div
                style={{
                  fontFamily: "var(--body, sans-serif)",
                  fontSize: "11px",
                  color: "#6C7A75",
                  fontWeight: 500,
                  marginTop: "4px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modern Interaction CSS */}
      <style>{`
        .pro-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(15, 56, 44, 0.08) !important;
          border-color: #D3E0D9 !important;
        }

        .btn-primary-hover:hover {
          background-color: #144D3A !important;
          transform: translateY(-1px);
        }

        .btn-outline-hover:hover {
          background-color: #F2F6F4 !important;
          border-color: #C2D1C9 !important;
        }

        @media (min-width: 580px) {
          .lt-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (min-width: 992px) {
          .lt-grid {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
      `}</style>
    </div>
  );
}
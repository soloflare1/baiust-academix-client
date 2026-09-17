import { Link } from "react-router-dom";
import { GhibliLibrary, GhibliStudy } from "../components/GhibliScene";

const HERO = "7.jpeg";
const COLLAB = "5.jpeg";

const catalog = [
  { code: "BK·01", title: "Course Textbooks & References",
    desc: "Curated textbooks, eBooks, and reference materials for every BAIUST CSE course, organised by level and term." },
  { code: "NT·02", title: "Lecture Notes & Handouts",
    desc: "Class handouts, presentation slides, and assignment sheets uploaded by verified BAIUST CSE students." },
  { code: "VD·03", title: "Instructional Video Content",
    desc: "Course-specific recordings and topic-based tutorials, indexed by subject for focused study." },
  { code: "CR·04", title: "Complete Curriculum Structure",
    desc: "Full coverage of the CSE programme — eight semesters from Level 1.1 to Level 4.2, 60+ courses." },
  { code: "UP·05", title: "Student Resource Contribution",
    desc: "Students upload and share academic materials, subject to administrator review before publication." },
  { code: "QR·06", title: "Reviewed & Quality-Verified",
    desc: "Every resource is checked for accuracy and quality by the platform administrator before it goes live." },
];

const steps = [
  { n: "01", title: "Register your account",
    desc: "Create a free account with your BAIUST student credentials, then wait for administrator approval." },
  { n: "02", title: "Browse by level and term",
    desc: "Move through all eight semesters of the CSE curriculum and open the course you need." },
  { n: "03", title: "Access or contribute",
    desc: "Download what your peers have shared, or upload your own notes to help the next student." },
];

function Crest({ className }) {
  return (
    <svg className={className} viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="22" cy="22" r="20.5" stroke="currentColor" strokeWidth="1" />
      <circle cx="22" cy="22" r="17" stroke="currentColor" strokeWidth="0.6" />
      <path d="M13 16.5c3-1.4 6.2-1.4 9 0 2.8-1.4 6-1.4 9 0v12c-3-1.4-6.2-1.4-9 0-2.8-1.4-6-1.4-9 0v-12Z" stroke="currentColor" strokeWidth="1" />
      <path d="M22 16.5v12" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function Rule() {
  return <div className="ha-rule"><span /></div>;
}

export default function Home() {
  return (
    <div className="ha-home">
      {/* ---------- Hero ---------- */}
      <section className="ha-hero">
        <div className="ha-hero-media">
          <img src={HERO} alt="BAIUST campus" />
          <div className="ha-hero-scrim ha-grain" />
        </div>

        <div className="ha-hero-inner ha-rise">
          <div className="ha-hero-header">
            <Crest className="ha-crest" />
            <span className="ha-tag-badge">
              <span className="ha-tag-dot"></span>
              Department of CSE, BAIUST
            </span>
          </div>

          <h1 className="ha-hero-h disp">
            Everything you need,
            <br />
            <span className="ha-gold-gradient">in one place</span>
          </h1>

          <p className="ha-hero-p">
            Textbooks, lecture notes, and video lessons for every BAIUST CSE course
            — organised, verified, and ready whenever you need them.
          </p>

          <div className="ha-hero-actions">
            <Link to="/register" className="ha-btn ha-btn-solid">
              Create free account <span className="ms sm">arrow_forward</span>
            </Link>
            <Link to="/login" className="ha-btn ha-btn-ghost">Sign in</Link>
          </div>

          <dl className="ha-ledger">
            <div><dt>8</dt><dd>Semesters</dd></div>
            <div><dt>60+</dt><dd>Courses</dd></div>
            <div><dt>3</dt><dd>Resource types</dd></div>
            <div><dt>100%</dt><dd>Free Access</dd></div>
          </dl>
        </div>
      </section>

      {/* ---------- About ---------- */}
      <section className="ha-section ha-about">
        <Crest className="ha-watermark" />
        <div className="ha-wrap ha-two-col">
          <div className="ha-about-content">
            <p className="ha-label">§ 01 — About the platform</p>
            <Rule />
            <h2 className="disp ha-h2">
              Built for the BAIUST CSE academic community
            </h2>
            <p className="ha-p">
              BAIUST Academix addresses a persistent problem — academic material
              scattered across messaging groups, personal drives, and informal
              peer sharing, with no single place to look.
            </p>
            <p className="ha-p ha-p-soft">
              This platform gathers that material into one centralised,
              administrator-verified repository, open to every enrolled CSE
              student at no cost.
            </p>
            <Link to="/register" className="ha-btn ha-btn-outline">
              Register for access
            </Link>
          </div>
          <div className="ha-scene-card">
            <GhibliLibrary />
          </div>
        </div>
      </section>

      {/* ---------- Catalog / Features ---------- */}
      <section className="ha-section ha-catalog-section">
        <div className="ha-wrap">
          <div className="ha-catalog-header">
            <div>
              <p className="ha-label">§ 02 — What's inside the archive</p>
              <Rule />
              <h2 className="disp ha-h2">Six kinds of material, one index</h2>
            </div>
            <p className="ha-p ha-intro">
              Structured access to course material across every level and term
              of the CSE programme, indexed the way a library would shelve it.
            </p>
          </div>

          <div className="ha-catalog-grid">
            {catalog.map((c) => (
              <div className="ha-catalog-card" key={c.code}>
                <div className="ha-catalog-card-header">
                  <span className="mono ha-catalog-code">{c.code}</span>
                  <div className="ha-card-icon-dot"></div>
                </div>
                <h3 className="disp ha-catalog-title">{c.title}</h3>
                <p className="ha-catalog-desc">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- How it works ---------- */}
      <section className="ha-section ha-how">
        <div className="ha-wrap ha-two-col ha-how-grid">
          <div>
            <p className="ha-label">§ 03 — How it works</p>
            <Rule />
            <h2 className="disp ha-h2">Simple, structured, student-run</h2>

            <ol className="ha-steps">
              {steps.map((s) => (
                <li key={s.n} className="ha-step-item">
                  <span className="mono ha-step-n">{s.n}</span>
                  <div>
                    <h4 className="ha-step-title">{s.title}</h4>
                    <p className="ha-step-desc">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>

            <Link to="/register" className="ha-btn ha-btn-solid">
              Get started now <span className="ms sm">arrow_forward</span>
            </Link>
          </div>
          <div className="ha-scene-card">
            <GhibliStudy />
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="ha-cta">
        <img src={COLLAB} alt="Students studying together" />
        <div className="ha-cta-scrim ha-grain" />
        <div className="ha-cta-inner">
          <Crest className="ha-crest ha-crest-cta" />
          <h2 className="disp">Join the BAIUST Academix archive</h2>
          <p>
            Registration is free and open to every enrolled student of the
            Department of Computer Science and Engineering, BAIUST.
          </p>
          <Link to="/register" className="ha-btn ha-btn-gold">
            Register now — free
          </Link>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

        .ha-home {
          --ink: #0E1A13;
          --ink-soft: #44544A;
          --ink-faint: #78877C;
          --forest: #0B331D;
          --forest-deep: #05140B;
          --brass: #B38E36;
          --brass-deep: #80631F;
          --brass-light: #E8D4A2;
          --paper: #FAF7F0;
          --paper-deep: #EBE1C8;
          --white: #FFFFFF;
          --line: rgba(14,26,19,0.12);
          --line-soft: rgba(14,26,19,0.06);
          --line-gold: rgba(179,142,54,0.35);
          --shadow-sm: 0 4px 20px rgba(0,0,0,0.04);
          --shadow-md: 0 12px 32px rgba(11,51,29,0.08);
          font-family: 'Inter', sans-serif;
          color: var(--ink);
          background: var(--white);
          -webkit-font-smoothing: antialiased;
        }
        .ha-home .disp { font-family: 'Fraunces', serif; }
        .ha-home .mono { font-family: 'IBM Plex Mono', monospace; letter-spacing: 0.02em; }

        .ha-wrap { max-width: 1200px; margin: 0 auto; padding: 0 20px; position: relative; }
        @media (min-width: 768px) { .ha-wrap { padding: 0 32px; } }

        .ha-section { padding: clamp(3.5rem, 8vw, 8rem) 0; position: relative; }
        .ha-label {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em;
          color: var(--brass-deep);
          font-weight: 600;
          margin-bottom: 10px;
        }
        .ha-rule { display: flex; align-items: center; width: 64px; margin-bottom: 20px; }
        .ha-rule::before, .ha-rule::after { content: ""; flex: 1; height: 1px; background: var(--line-gold); }
        .ha-rule span { width: 5px; height: 5px; margin: 0 8px; background: var(--brass);
          transform: rotate(45deg); flex-shrink: 0; }
        
        .ha-h2 {
          font-weight: 600;
          font-size: clamp(24px, 4vw, 42px);
          line-height: 1.2;
          letter-spacing: -0.5px;
          color: var(--ink);
          margin-bottom: 16px;
        }
        .ha-p {
          font-size: 15.5px;
          line-height: 1.7;
          color: var(--ink-soft);
          font-weight: 300;
          margin-bottom: 14px;
        }
        .ha-p-soft { color: var(--ink-faint); margin-bottom: 28px; }

        /* Buttons */
        .ha-btn {
          display: inline-flex; align-items: center; gap: 8px; justify-content: center;
          font-family: 'Inter', sans-serif; font-weight: 600; font-size: 13.5px;
          letter-spacing: 0.02em;
          padding: 12px 22px; border-radius: 6px; min-height: 44px;
          text-decoration: none; border: 1.5px solid transparent;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
        }
        @media (min-width: 768px) {
          .ha-btn { padding: 14px 28px; font-size: 14px; min-height: 48px; }
        }
        .ha-btn-solid { 
          background: var(--forest); color: var(--paper-deep);
          box-shadow: 0 4px 14px rgba(11,51,29,0.25);
        }
        .ha-btn-solid:hover { 
          background: var(--forest-deep); 
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(11,51,29,0.35);
        }
        .ha-btn-ghost { 
          border-color: rgba(255,255,255,0.25); 
          color: var(--white); 
          backdrop-filter: blur(8px);
          background: rgba(255,255,255,0.05);
        }
        .ha-btn-ghost:hover { 
          border-color: var(--brass-light); 
          color: var(--brass-light);
          background: rgba(255,255,255,0.1);
        }
        .ha-btn-outline { 
          border-color: var(--forest); 
          color: var(--forest); 
          background: transparent;
        }
        .ha-btn-outline:hover { 
          background: var(--forest); 
          color: var(--paper-deep);
          transform: translateY(-2px);
        }
        .ha-btn-gold {
          background: var(--brass);
          color: var(--forest-deep);
          font-weight: 700;
        }
        .ha-btn-gold:hover {
          background: var(--brass-light);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(179,142,54,0.3);
        }

        .ha-grain::after {
          content: ""; position: absolute; inset: 0; pointer-events: none; mix-blend-mode: overlay; opacity: 0.4;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.35'/></svg>");
        }

        .ha-crest-cta { color: var(--brass-light); margin: 0 auto 16px; }
        .ha-watermark { position: absolute; top: -40px; right: -40px; width: 420px; height: 420px;
          color: var(--ink); opacity: 0.025; pointer-events: none; display: none; }

        /* Hero Section - Fixed Mobile Alignment & Layout */
        .ha-hero { 
          position: relative; 
          min-height: 100vh;
          display: flex; 
          align-items: flex-end; 
          overflow: hidden; 
        }
        .ha-hero-media { position: absolute; inset: 0; }
        .ha-hero-media img { width: 100%; height: 100%; object-fit: cover; object-position: center 38%; }
        .ha-hero-scrim { 
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(5,20,11,0.94) 0%, rgba(5,20,11,0.86) 50%, rgba(5,20,11,0.72) 100%); 
        }
        .ha-hero-inner { 
          position: relative; z-index: 1; max-width: 1200px; margin: 0 0;
          padding: 1.5rem 20px 3rem; width: 100%; 
        }
        @media (min-width: 768px) {
          .ha-hero-inner { padding: 6rem 32px 4.5rem; }
        }
        
        /* Fixed Header Flex Container */
        .ha-hero-header { 
          display: flex; 
          align-items: center; 
          gap: 10px; 
          margin-bottom: 16px; 
          flex-wrap: nowrap; 
        }
        .ha-crest { 
          width: 30px; 
          height: 30px; 
          color: var(--brass-light); 
          flex-shrink: 0; 
        }
        @media (min-width: 768px) { 
          .ha-crest { width: 44px; height: 44px; } 
        }

        .ha-tag-badge {
          display: inline-flex; 
          align-items: center; 
          gap: 6px;
          font-family: 'IBM Plex Mono', monospace; 
          font-size: 10px; 
          letter-spacing: 0.02em;
          color: var(--brass-light); 
          background: rgba(232,212,162,0.1);
          padding: 4px 10px; 
          border-radius: 100px; 
          border: 1px solid rgba(232,212,162,0.2);
          backdrop-filter: blur(4px);
          white-space: normal; 
        }
        @media (min-width: 768px) { 
          .ha-tag-badge { font-size: 12px; padding: 6px 14px; } 
        }
        .ha-tag-dot { width: 5px; height: 5px; background: var(--brass); border-radius: 50%; display: inline-block; flex-shrink: 0; }
        
        .ha-hero-h { color: var(--white); font-weight: 500;
          font-size: clamp(32px, 7vw, 62px); line-height: 1.1; letter-spacing: -1px;
          max-width: 15ch; margin-bottom: 16px; }
        .ha-gold-gradient {
          background: linear-gradient(135deg, #FFFFFF 30%, var(--brass-light) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .ha-hero-p { color: rgba(255,255,255,0.78); font-size: clamp(15px, 2.5vw, 18px);
          line-height: 1.7; font-weight: 300; max-width: 48ch; margin-bottom: 28px; }
        .ha-hero-actions { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 36px; }
        
        /* Glassmorphic Ledger */
        .ha-ledger { 
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 16px 20px; border-radius: 10px;
          max-width: 720px;
        }
        @media (min-width: 600px) {
          .ha-ledger { grid-template-columns: repeat(4, 1fr); padding: 24px 32px; gap: 20px; }
        }
        .ha-ledger dt { font-family: 'Fraunces', serif; font-weight: 500; color: var(--white);
          font-size: clamp(22px, 3.5vw, 32px); line-height: 1; margin-bottom: 4px; }
        .ha-ledger dd { font-family: 'IBM Plex Mono', monospace; font-size: 10px; letter-spacing: 0.05em;
          color: var(--brass-light); margin: 0; text-transform: uppercase; }
        @media (min-width: 768px) { .ha-ledger dd { font-size: 11px; } }

        /* Shared 2-Col Grid */
        .ha-two-col { display: grid; grid-template-columns: 1fr; gap: 40px; align-items: center; }
        .ha-about { background: var(--paper); overflow: hidden; }
        .ha-scene-card { 
          display: flex; justify-content: center; 
          background: var(--white); padding: 16px; border-radius: 14px;
          box-shadow: var(--shadow-md); border: 1px solid var(--line-soft);
        }
        @media (min-width: 768px) { .ha-scene-card { padding: 24px; border-radius: 16px; } }

        /* Modern Catalog Grid */
        .ha-catalog-section { background: var(--white); }
        .ha-catalog-header { margin-bottom: 36px; }
        .ha-intro { max-width: 52ch; font-size: 16px; }
        
        .ha-catalog-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        @media (min-width: 640px) {
          .ha-catalog-grid { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }
        }
        .ha-catalog-card {
          background: var(--paper);
          border: 1px solid var(--line);
          border-radius: 10px;
          padding: 24px 20px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
        }
        @media (min-width: 768px) {
          .ha-catalog-card { padding: 32px 28px; border-radius: 12px; }
        }
        .ha-catalog-card::before {
          content: ""; position: absolute; top: 0; left: 0; width: 4px; height: 100%;
          background: var(--brass); opacity: 0; transition: opacity 0.3s ease;
        }
        .ha-catalog-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
          background: var(--white);
          border-color: rgba(179,142,54,0.3);
        }
        .ha-catalog-card:hover::before { opacity: 1; }
        .ha-catalog-card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
        .ha-catalog-code { font-size: 12px; font-weight: 600; color: var(--brass-deep); background: rgba(179,142,54,0.12); padding: 3px 8px; border-radius: 4px; }
        .ha-card-icon-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--line-gold); }
        .ha-catalog-title { font-weight: 600; font-size: 18px; color: var(--ink); margin-bottom: 8px; line-height: 1.3; }
        @media (min-width: 768px) { .ha-catalog-title { font-size: 20px; } }
        .ha-catalog-desc { font-size: 14px; line-height: 1.6; color: var(--ink-soft); font-weight: 300; }

        /* Modern Steps Section */
        .ha-how { background: var(--paper); }
        .ha-steps { list-style: none; margin: 0 0 32px; padding: 0; display: flex; flex-direction: column; gap: 16px; }
        .ha-step-item { 
          display: flex; gap: 16px; align-items: flex-start; 
          background: var(--white); padding: 16px 18px; border-radius: 10px;
          border: 1px solid var(--line-soft); box-shadow: var(--shadow-sm);
        }
        @media (min-width: 768px) { .ha-step-item { padding: 20px 24px; gap: 20px; } }
        .ha-step-n { 
          font-size: 13px; font-weight: 600; color: var(--forest); 
          background: var(--paper-deep); width: 32px; height: 32px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 50%; flex-shrink: 0;
        }
        @media (min-width: 768px) { .ha-step-n { width: 36px; height: 36px; font-size: 14px; } }
        .ha-step-title { font-weight: 600; font-size: 16px; color: var(--ink); margin-bottom: 3px; }
        .ha-step-desc { font-size: 13.5px; line-height: 1.6; color: var(--ink-soft); font-weight: 300; }

        /* CTA Band */
        .ha-cta { position: relative; min-height: 320px;
          display: flex; align-items: center; overflow: hidden; }
        .ha-cta img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .ha-cta-scrim { position: absolute; inset: 0; background: rgba(5,20,11,0.92); }
        .ha-cta-inner { position: relative; z-index: 1; max-width: 680px; margin: 0 auto;
          padding: 3.5rem 20px; text-align: center; }
        @media (min-width: 768px) { .ha-cta-inner { padding: 4.5rem 32px; } }
        .ha-cta-inner h2 { color: var(--white); font-weight: 500; font-size: clamp(24px, 4.5vw, 38px);
          line-height: 1.2; margin-bottom: 14px; }
        .ha-cta-inner p { color: rgba(255,255,255,0.7); font-size: 15px; line-height: 1.7;
          font-weight: 300; margin-bottom: 28px; }

        /* Entrance Motion */
        .ha-rise { animation: haRise 0.85s cubic-bezier(.16,1,.3,1) both; }
        @keyframes haRise { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @media (prefers-reduced-motion: reduce) { .ha-rise { animation: none; } }

        /* Responsive Breakpoints */
        @media (min-width: 860px) {
          .ha-two-col { grid-template-columns: 1fr 1fr; gap: 56px; }
          .ha-catalog-header { display: flex; justify-content: space-between; align-items: flex-end; }
        }
        @media (min-width: 1024px) {
          .ha-watermark { display: block; }
        }
      `}</style>
    </div>
  );
}
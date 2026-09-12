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

/* A restrained line-art seal — the one emblem the whole page is allowed. */
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
          <Crest className="ha-crest" />
          <p className="ha-tag">Department of Computer Science &amp; Engineering, BAIUST</p>

          <h1 className="ha-hero-h disp">
            The academic<br />archive of the department
          </h1>

          <p className="ha-hero-p">
            A structured digital archive giving BAIUST CSE students verified access
            to textbooks, lecture notes, and instructional videos — across the full
            eight-semester curriculum.
          </p>

          <div className="ha-hero-actions">
            <Link to="/register" className="ha-btn ha-btn-solid">
              <span className="ms sm">arrow_forward</span> Create free account
            </Link>
            <Link to="/login" className="ha-btn ha-btn-ghost">Sign in</Link>
          </div>

          <dl className="ha-ledger">
            <div><dt>8</dt><dd>Semesters</dd></div>
            <div><dt>60+</dt><dd>Courses</dd></div>
            <div><dt>3</dt><dd>Resource types</dd></div>
            <div><dt>Free</dt><dd>No charges</dd></div>
          </dl>
        </div>

      </section>

      {/* ---------- About ---------- */}
      <section className="ha-section ha-about">
        <Crest className="ha-watermark" />
        <div className="ha-wrap ha-two-col">
          <div>
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
          <div className="ha-scene"><GhibliLibrary /></div>
        </div>
      </section>

      {/* ---------- Catalog / Features ---------- */}
      <section className="ha-section ha-catalog-section">
        <div className="ha-wrap">
          <p className="ha-label">§ 02 — What's inside the archive</p>
          <Rule />
          <h2 className="disp ha-h2">Six kinds of material, one index</h2>
          <p className="ha-p ha-intro">
            Structured access to course material across every level and term
            of the CSE programme, indexed the way a library would shelve it.
          </p>

          <div className="ha-catalog">
            {catalog.map((c) => (
              <div className="ha-catalog-row" key={c.code}>
                <span className="mono ha-catalog-code">{c.code}</span>
                <div className="ha-catalog-body">
                  <p className="disp ha-catalog-title">{c.title}</p>
                  <p className="ha-catalog-desc">{c.desc}</p>
                </div>
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
                <li key={s.n}>
                  <span className="mono ha-step-n">{s.n}</span>
                  <div>
                    <p className="ha-step-title">{s.title}</p>
                    <p className="ha-step-desc">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>

            <Link to="/register" className="ha-btn ha-btn-solid">Get started</Link>
          </div>
          <div className="ha-scene"><GhibliStudy /></div>
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
          <Link to="/register" className="ha-btn ha-btn-solid">Register now — free</Link>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

        .ha-home {
          --ink: #101F16;
          --ink-soft: #4C5D52;
          --ink-faint: #8A968B;
          --forest: #0D3D22;
          --forest-deep: #06180E;
          --brass: #A3812E;
          --brass-deep: #7C6222;
          --brass-light: #DCC488;
          --paper: #F7F2E6;
          --paper-deep: #EEE4CC;
          --white: #FFFFFF;
          --line: rgba(16,31,22,0.15);
          --line-soft: rgba(16,31,22,0.08);
          --line-gold: rgba(163,129,46,0.4);
          font-family: 'Inter', sans-serif;
          color: var(--ink);
          background: var(--white);
        }
        .ha-home .disp { font-family: 'Fraunces', serif; }
        .ha-home .mono { font-family: 'IBM Plex Mono', monospace; letter-spacing: 0.02em; }

        .ha-wrap { max-width: 1160px; margin: 0 auto; padding: 0 28px; position: relative; }
        .ha-section { padding: clamp(4rem, 9vw, 7.5rem) 0; position: relative; }
        .ha-label {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 12px; letter-spacing: 0.03em;
          color: var(--brass-deep);
          margin-bottom: 18px;
        }
        .ha-rule { display: flex; align-items: center; width: 74px; margin-bottom: 28px; }
        .ha-rule::before, .ha-rule::after { content: ""; flex: 1; height: 1px; background: var(--line-gold); }
        .ha-rule span { width: 5px; height: 5px; margin: 0 9px; background: var(--brass);
          transform: rotate(45deg); flex-shrink: 0; }
        .ha-h2 {
          font-weight: 600;
          font-size: clamp(26px, 4.4vw, 40px);
          line-height: 1.16;
          letter-spacing: -0.4px;
          color: var(--ink);
          margin-bottom: 20px;
          max-width: 19ch;
        }
        .ha-p {
          font-size: 16.5px;
          line-height: 1.85;
          color: var(--ink-soft);
          font-weight: 300;
          max-width: 46ch;
          margin-bottom: 16px;
        }
        .ha-p-soft { color: var(--ink-faint); margin-bottom: 32px; }
        .ha-intro { max-width: 56ch; margin-bottom: 42px; }

        /* Buttons */
        .ha-btn {
          display: inline-flex; align-items: center; gap: 9px; justify-content: center;
          font-family: 'Inter', sans-serif; font-weight: 600; font-size: 14.5px;
          letter-spacing: 0.01em;
          padding: 13px 24px; border-radius: 3px; min-height: 46px;
          text-decoration: none; border: 1.5px solid transparent;
          transition: background-color .18s ease, border-color .18s ease, color .18s ease, box-shadow .18s ease;
        }
        .ha-btn-solid { background: var(--forest); color: var(--paper-deep);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.12); }
        .ha-btn-solid:hover { background: var(--forest-deep); }
        .ha-btn-ghost { border-color: rgba(255,255,255,0.38); color: var(--white); position: relative; }
        .ha-btn-ghost:hover { border-color: var(--brass-light); color: var(--brass-light); }
        .ha-btn-outline { border-color: var(--forest); color: var(--forest); }
        .ha-btn-outline:hover { background: var(--forest); color: var(--paper-deep); }

        /* Film-grain texture, used sparingly on the two dark photo bands */
        .ha-grain::after {
          content: ""; position: absolute; inset: 0; pointer-events: none; mix-blend-mode: overlay; opacity: 0.5;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.35'/></svg>");
        }

        /* Crest / seal */
        .ha-crest { width: 40px; height: 40px; color: var(--brass-light); margin-bottom: 22px; }
        .ha-crest-cta { color: var(--brass-light); margin: 0 auto 18px; }
        .ha-watermark { position: absolute; top: -30px; right: -20px; width: 320px; height: 320px;
          color: var(--ink); opacity: 0.035; pointer-events: none; display: none; }

        /* Hero */
        .ha-hero { position: relative; min-height: clamp(600px, 94vh, 760px);
          display: flex; align-items: flex-end; overflow: hidden; }
        .ha-hero-media { position: absolute; inset: 0; }
        .ha-hero-media img { width: 100%; height: 100%; object-fit: cover; object-position: center 38%; }
        .ha-hero-scrim { position: absolute; inset: 0;
          background: linear-gradient(190deg, rgba(6,24,14,0.98) 10%, rgba(6,24,14,0.78) 48%, rgba(6,24,14,0.32) 100%); }
        .ha-hero-inner { position: relative; z-index: 1; max-width: 1160px; margin: 0 auto;
          padding: clamp(2.5rem, 7vw, 5rem) 28px clamp(3.5rem, 9vw, 6rem); width: 100%; }
        .ha-tag { font-family: 'IBM Plex Mono', monospace; font-size: 12px; letter-spacing: 0.03em;
          color: var(--brass-light); margin-bottom: 26px; }
        .ha-hero-h { color: var(--white); font-weight: 500;
          font-size: clamp(32px, 6.6vw, 56px); line-height: 1.1; letter-spacing: -0.7px;
          max-width: 14ch; margin-bottom: 24px; }
        .ha-hero-p { color: rgba(255,255,255,0.7); font-size: clamp(15px, 3vw, 17px);
          line-height: 1.85; font-weight: 300; max-width: 44ch; margin-bottom: 36px; }
        .ha-hero-actions { display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 48px; }
        .ha-ledger { display: flex; gap: 0; flex-wrap: wrap; border-top: 1px solid rgba(220,196,136,0.22); padding-top: 26px; }
        .ha-ledger > div { padding-right: clamp(22px, 4vw, 44px); margin-right: clamp(22px, 4vw, 44px);
          border-right: 1px solid rgba(255,255,255,0.14); }
        .ha-ledger > div:last-child { border-right: none; margin-right: 0; padding-right: 0; }
        .ha-ledger dt { font-family: 'Fraunces', serif; font-weight: 500; color: var(--white);
          font-size: clamp(21px, 4vw, 27px); line-height: 1; margin-bottom: 6px; }
        .ha-ledger dd { font-family: 'IBM Plex Mono', monospace; font-size: 10.5px; letter-spacing: 0.04em;
          color: rgba(220,196,136,0.75); margin: 0; }

/* About / How-it-works shared grid */
        .ha-two-col { display: grid; grid-template-columns: 1fr; gap: 48px; align-items: center; }
        .ha-about { background: var(--paper); overflow: hidden; }
        .ha-scene { display: flex; justify-content: center; }

        /* Catalog list */
        .ha-catalog-section { background: var(--white); }
        .ha-catalog { border-top: 1px solid var(--line); margin-top: 4px; }
        .ha-catalog-row { display: grid; grid-template-columns: 68px 1fr; gap: 20px;
          padding: 24px 0; border-bottom: 1px solid var(--line-soft); align-items: baseline;
          transition: background-color .2s ease; }
        .ha-catalog-row:hover { background: rgba(163,129,46,0.045); }
        .ha-catalog-code { font-size: 13px; color: var(--brass); padding-top: 4px; }
        .ha-catalog-title { font-weight: 500; font-size: 19px; color: var(--ink); margin-bottom: 5px; }
        .ha-catalog-desc { font-size: 14.5px; line-height: 1.75; color: var(--ink-soft); font-weight: 300; max-width: 58ch; }

        /* Steps */
        .ha-how { background: var(--paper); }
        .ha-steps { list-style: none; margin: 0 0 34px; padding: 0; }
        .ha-steps li { display: grid; grid-template-columns: 32px 1fr; gap: 16px; margin-bottom: 26px; }
        .ha-step-n { font-size: 13px; color: var(--brass); padding-top: 3px; }
        .ha-step-title { font-weight: 600; font-size: 16px; color: var(--ink); margin-bottom: 5px; }
        .ha-step-desc { font-size: 14px; line-height: 1.75; color: var(--ink-soft); font-weight: 300; }

        /* CTA band */
        .ha-cta { position: relative; min-height: clamp(280px, 38vw, 360px);
          display: flex; align-items: center; overflow: hidden; }
        .ha-cta img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .ha-cta-scrim { position: absolute; inset: 0; background: rgba(6,20,12,0.9); }
        .ha-cta-inner { position: relative; z-index: 1; max-width: 620px; margin: 0 auto;
          padding: clamp(2.5rem, 6vw, 3.5rem) 28px; text-align: center; }
        .ha-cta-inner h2 { color: var(--white); font-weight: 500; font-size: clamp(23px, 4.5vw, 34px);
          line-height: 1.22; margin-bottom: 14px; }
        .ha-cta-inner p { color: rgba(255,255,255,0.62); font-size: 15px; line-height: 1.8;
          font-weight: 300; margin-bottom: 30px; }
        .ha-cta-inner .ha-btn { display: inline-flex; }

        /* Entrance motion — one orchestrated moment on the hero only */
        .ha-rise { animation: haRise 0.85s cubic-bezier(.2,.7,.2,1) both; }
        @keyframes haRise { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        @media (prefers-reduced-motion: reduce) { .ha-rise { animation: none; } }

        /* Tablet+ */
        @media (min-width: 720px) {
          .ha-two-col { grid-template-columns: 1fr 1fr; }
        }

        /* Desktop — reveal the watermark and widen catalog rows */
        @media (min-width: 900px) {
          .ha-catalog-row { grid-template-columns: 96px 1fr; }
          .ha-watermark { display: block; }
        }
      `}</style>
    </div>
  );
}
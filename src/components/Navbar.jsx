import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "./Logo";

export default function Navbar({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const active = (p) => pathname.startsWith(p);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Close drawer on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  const handleLogout = () => { onLogout(); navigate("/login"); };

  const links = user ? [
    { to:"/levels", icon:"grid_view", label:"Levels" },
    { to:"/upload", icon:"upload_file", label:"Upload" },
    { to:"/search", icon:"search", label:"Search" },
    ...(user.role==="admin"
      ? [{ to:"/admin", icon:"admin_panel_settings", label:"Admin" }]
      : []),
  ] : [];

  return (
    <>
      <nav style={{
        position:"sticky", top:0, zIndex:200,
        height:"var(--nav-h)",
        background: scrolled ? "rgba(10,61,30,0.97)" : "var(--pine)",
        backdropFilter:"blur(14px)",
        WebkitBackdropFilter:"blur(14px)",
        borderBottom:`1.5px solid rgba(78,222,128,${scrolled?0.18:0.08})`,
        boxShadow: scrolled ? "0 2px 16px rgba(5,41,18,0.25)" : "none",
        display:"flex", alignItems:"center",
        justifyContent:"space-between",
        padding:"0 var(--px)",
        transition:"background 0.3s, box-shadow 0.3s",
      }}>
        <Link to={user ? "/levels" : "/"}>
          <Logo size="sm" dark />
        </Link>

        {/* Desktop links */}
        <div style={{ display:"flex", alignItems:"center", gap:2 }} className="nav-desk">
          {links.map(l => (
            <Link key={l.to} to={l.to} style={{
              display:"flex", alignItems:"center", gap:5,
              padding:"7px 13px", borderRadius:"var(--r-pill)",
              fontFamily:"var(--display)", fontSize:13, fontWeight:700,
              letterSpacing:"0.02em",
              color: active(l.to) ? "#fff" : "rgba(255,255,255,0.70)",
              background: active(l.to) ? "rgba(255,255,255,0.16)" : "transparent",
              transition:"all 0.18s",
              textDecoration:"none",
            }}>
              <span className="ms sm">{l.icon}</span>
              <span>{l.label}</span>
            </Link>
          ))}

          {user ? (
            <div style={{ display:"flex", alignItems:"center", gap:8, marginLeft:8 }}>
              <div style={{ display:"flex", alignItems:"center", gap:7,
                height:36, padding:"0 12px", borderRadius:"var(--r-pill)",
                background:"rgba(255,255,255,0.12)",
                border:"1.5px solid rgba(255,255,255,0.20)",
                fontFamily:"var(--display)", fontSize:13, fontWeight:700, color:"#fff" }}>
                <div style={{ width:22, height:22, borderRadius:"50%",
                  background:"var(--amber)", color:"var(--forest)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:12, fontWeight:800 }}>
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <span className="hide-sm">{user.name?.split(" ")[0]}</span>
              </div>
              <button onClick={handleLogout} style={{
                display:"flex", alignItems:"center", gap:5,
                height:36, padding:"0 14px", borderRadius:"var(--r-pill)",
                background:"rgba(255,255,255,0.08)",
                border:"1.5px solid rgba(255,255,255,0.18)",
                fontFamily:"var(--display)", fontSize:13, fontWeight:700,
                color:"rgba(255,255,255,0.80)", cursor:"pointer", transition:"all 0.18s",
              }}>
                <span className="ms sm">logout</span>
                <span className="hide-sm">Sign out</span>
              </button>
            </div>
          ) : (
            <div style={{ display:"flex", alignItems:"center", gap:10, marginLeft:8 }}>
              {/* Desktop Sign In Button */}
              <Link to="/login" className="btn-signin">
                Sign In
              </Link>
              
              {/* Desktop Get Started Button */}
              <Link to="/register" className="btn-get-started">
                <span className="ms sm rocket-icon">rocket_launch</span>
                <span>Get Started</span>
              </Link>
            </div>
          )}
        </div>

        {/* Hamburger — mobile */}
        <button onClick={() => setOpen(o => !o)} className="nav-burger"
          style={{ display:"none", width:40, height:40,
            alignItems:"center", justifyContent:"center",
            borderRadius:"var(--r-md)", color:"#fff",
            background:"rgba(255,255,255,0.10)",
            border:"1px solid rgba(255,255,255,0.18)",
            cursor:"pointer", flexShrink:0 }}>
          <span className="ms lg">{open ? "close" : "menu"}</span>
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div style={{
          position:"fixed", top:"var(--nav-h)", left:0, right:0, bottom:0,
          background:"var(--bg)", zIndex:199,
          padding:"1.25rem var(--px) 2rem",
          display:"flex", flexDirection:"column", gap:6,
          overflowY:"auto", animation:"fadeUp 0.22s ease both",
        }}>
          {user ? (
            <>
              {/* User info */}
              <div style={{ display:"flex", alignItems:"center", gap:12,
                padding:"14px 16px", borderRadius:"var(--r-lg)",
                background:"var(--pale)", marginBottom:8,
                border:"1px solid rgba(26,122,60,0.18)" }}>
                <div style={{ width:44, height:44, borderRadius:"50%",
                  background:"var(--pine)", color:"#fff",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontFamily:"var(--display)", fontWeight:800, fontSize:18, flexShrink:0 }}>
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <div style={{ minWidth:0 }}>
                  <p style={{ fontFamily:"var(--display)", fontWeight:700,
                    fontSize:15, color:"var(--ink)",
                    overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                    {user.name}
                  </p>
                  <p style={{ fontFamily:"var(--body)", fontSize:12,
                    color:"var(--ink3)",
                    overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                    {user.studentId || user.email}
                  </p>
                </div>
              </div>

              {links.map(l => (
                <Link key={l.to} to={l.to} style={{
                  display:"flex", alignItems:"center", gap:14,
                  padding:"15px 16px", borderRadius:"var(--r-lg)",
                  fontFamily:"var(--display)", fontSize:16, fontWeight:700,
                  color: active(l.to) ? "var(--leaf)" : "var(--ink)",
                  background: active(l.to) ? "var(--pale)" : "transparent",
                  textDecoration:"none",
                  border: active(l.to) ? "1px solid rgba(26,122,60,0.18)" : "1px solid transparent",
                }}>
                  <span className="ms" style={{ fontSize:22,
                    color: active(l.to) ? "var(--leaf)" : "var(--ink3)" }}>{l.icon}</span>
                  {l.label}
                </Link>
              ))}

              <div style={{ flex:1 }} />

              <button onClick={handleLogout} style={{
                display:"flex", alignItems:"center", gap:12,
                padding:"15px 16px", borderRadius:"var(--r-lg)",
                fontFamily:"var(--display)", fontSize:16, fontWeight:700,
                color:"#dc2626", background:"#fff5f5",
                border:"1px solid #fecaca", cursor:"pointer", textAlign:"left",
              }}>
                <span className="ms" style={{ fontSize:22 }}>logout</span> Sign Out
              </button>
            </>
          ) : (
            <div style={{ display:"flex", flexDirection:"column", gap:12, marginTop:8 }}>
              {/* Mobile Sign In */}
              <Link to="/login" className="mobile-btn-signin">
                Sign In
              </Link>

              {/* Mobile Get Started */}
              <Link to="/register" className="btn-get-started" style={{ width: "100%", height: "44px", fontSize: "15px" }}>
                <span className="ms sm rocket-icon">rocket_launch</span>
                <span>Get Started Free</span>
              </Link>
            </div>
          )}
        </div>
      )}

      {/* CSS Styles */}
      <style>{`
        /* Desktop Sign In Button */
        .btn-signin {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 36px;
          padding: 0 16px;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          font-family: var(--display);
          font-size: 13px;
          font-weight: 600;
          color: #e2e8f0;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-signin:hover {
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(255, 255, 255, 0.35);
          color: #ffffff;
        }

        /* Mobile Sign In Button (Fixes contrast against light drawer background) */
        .mobile-btn-signin {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 44px;
          border-radius: 6px;
          background: var(--pale, #f0fdf4);
          border: 1.5px solid rgba(26, 122, 60, 0.25);
          font-family: var(--display);
          font-size: 15px;
          font-weight: 700;
          color: var(--pine, #0a3d1e);
          text-decoration: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .mobile-btn-signin:hover {
          background: rgba(26, 122, 60, 0.12);
          border-color: rgba(26, 122, 60, 0.4);
        }

        /* Get Started Button */
        .btn-get-started {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          height: 36px;
          padding: 0 16px;
          border-radius: 6px;
          background: linear-gradient(180deg, #097142 0%, #054126 100%);
          border: 1px solid #22c55e;
          box-shadow: 0 2px 10px rgba(5, 65, 38, 0.4);
          font-family: var(--display);
          font-size: 13px;
          font-weight: 700;
          color: #6ee7b7;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.22s ease;
        }

        .btn-get-started:hover {
          background: linear-gradient(180deg, #0c8a51 0%, #075231 100%);
          border-color: #4ade80;
          color: #ffffff;
          box-shadow: 0 4px 14px rgba(34, 197, 94, 0.35);
          transform: translateY(-1px);
        }

        .btn-get-started:hover .rocket-icon {
          transform: translateY(-2px) rotate(-8deg);
          transition: transform 0.22s ease;
        }

        .btn-signin:active,
        .mobile-btn-signin:active,
        .btn-get-started:active {
          transform: translateY(1px);
        }

        @media (max-width: 700px) {
          .nav-desk  { display: none !important; }
          .nav-burger{ display: flex !important; }
        }
      `}</style>
    </>
  );
}
import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import api from "../utils/api";

const fields = [
  { name:"name",      icon:"person", label:"Full Name",     type:"text",     placeholder:"e.g. Nosratee Jahan Naba", auto:"name" },
  { name:"email",     icon:"mail",   label:"Email Address", type:"email",    placeholder:"your.email@baiust.ac.bd",  auto:"email" },
  { name:"studentId", icon:"badge",  label:"Student ID",    type:"text",     placeholder:"e.g. 21CSE001",            auto:"off" },
  { name:"password",  icon:"lock",   label:"Password",      type:"password", placeholder:"Minimum 8 characters",     auto:"new-password" },
];

export default function Register() {
  const [form, setForm]       = useState({ name:"", email:"", studentId:"", password:"" });
  const [error, setError]     = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    setError(""); setLoading(true);
    try {
      await api.post("/auth/register", form);
      setSuccess(true);
    } catch (err) {
      const msg = err.response?.data?.message || "";
      if (msg.toLowerCase().includes("pending") || msg.toLowerCase().includes("approval")) {
        setSuccess(true);
      } else {
        setError(msg || "Registration failed. Please check your details.");
      }
    } finally { setLoading(false); }
  };

  if (success) return (
    <div style={{ minHeight:"calc(100vh - var(--nav-h))",
      display:"flex", alignItems:"center", justifyContent:"center",
      padding:"1.5rem var(--px)", background:"var(--bg)" }}>
      <div style={{ width:"100%", maxWidth:440, textAlign:"center" }} className="fade-in">
        <div style={{ width:68, height:68, borderRadius:"50%",
          background:"linear-gradient(135deg,var(--mint),var(--glow))",
          display:"flex", alignItems:"center", justifyContent:"center",
          margin:"0 auto 20px",
          boxShadow:"0 6px 20px rgba(46,184,92,0.28)" }}>
          <span className="ms xl fill" style={{ color:"var(--forest)", fontSize:32 }}>
            how_to_reg
          </span>
        </div>
        <h2 style={{ fontFamily:"var(--display)", fontWeight:800,
          fontSize:"var(--fs-xl)", color:"var(--ink)",
          marginBottom:12, letterSpacing:"-0.4px" }}>
          Registration Submitted!
        </h2>
        <p style={{ fontFamily:"var(--body)", fontSize:"var(--fs-base)",
          color:"var(--ink3)", lineHeight:1.75,
          fontWeight:300, marginBottom:28, maxWidth:340, margin:"0 auto 28px" }}>
          Your account is awaiting administrator approval.{" "}
          <strong style={{ color:"var(--leaf)", fontWeight:600 }}>
            You can sign in once approved.
          </strong>
        </p>
        <Link to="/login" className="btn btn-primary"
          style={{ fontSize:"var(--fs-base)", padding:"12px 28px" }}>
          <span className="ms sm">login</span> Go to Sign In
        </Link>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight:"calc(100vh - var(--nav-h))",
      display:"flex", alignItems:"center", justifyContent:"center",
      padding:"1.5rem var(--px)", background:"var(--bg)" }}>

      <div style={{ width:"100%", maxWidth:420 }} className="fade-in">
        <div style={{ textAlign:"center", marginBottom:28 }}>
          <div style={{ display:"flex", justifyContent:"center", marginBottom:18 }}>
            <Logo size="md" />
          </div>
          <h1 style={{ fontFamily:"var(--display)", fontWeight:800,
            fontSize:"var(--fs-xl)", color:"var(--ink)",
            marginBottom:8, letterSpacing:"-0.4px" }}>
            Create Account
          </h1>
          <p style={{ fontFamily:"var(--body)", fontSize:"var(--fs-sm)",
            color:"var(--ink3)", fontWeight:300, lineHeight:1.6 }}>
            Registration requires administrator approval before sign-in.
          </p>
        </div>

        <div className="card" style={{ padding:"clamp(1.25rem,5vw,2rem)",
          borderRadius:"var(--r-xl)" }}>
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {fields.map(f => (
              <div className="form-group" key={f.name}>
                <label className="form-label">{f.label}</label>
                <div style={{ position:"relative" }}>
                  <span className="ms sm" style={{ position:"absolute", left:14,
                    top:"50%", transform:"translateY(-50%)",
                    color:"var(--ink4)", pointerEvents:"none" }}>{f.icon}</span>
                  <input className="form-input" name={f.name} type={f.type}
                    autoComplete={f.auto}
                    placeholder={f.placeholder} value={form[f.name]} onChange={handle}
                    onKeyDown={e => e.key==="Enter" && submit()}
                    style={{ paddingLeft:40 }} />
                </div>
              </div>
            ))}

            {error && (
              <div className="error-box">
                <span className="ms sm" style={{ color:"#991b1b", flexShrink:0 }}>error</span>
                <span>{error}</span>
              </div>
            )}

            <button className="btn btn-primary" onClick={submit} disabled={loading}
              style={{ width:"100%", marginTop:4, fontSize:"var(--fs-base)",
                borderRadius:"var(--r-pill)" }}>
              <span className="ms sm">{loading ? "progress_activity" : "person_add"}</span>
              {loading ? "Submitting…" : "Submit Registration"}
            </button>
          </div>
        </div>

        <p style={{ marginTop:18, textAlign:"center",
          fontFamily:"var(--body)", fontSize:"var(--fs-sm)", color:"var(--ink3)" }}>
          Already registered?{" "}
          <Link to="/login" style={{ color:"var(--leaf)", fontWeight:700,
            fontFamily:"var(--display)" }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}

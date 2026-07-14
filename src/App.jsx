import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import Navbar       from "./components/Navbar";
import Footer       from "./components/Footer";
import Home         from "./pages/Home";
import Login        from "./pages/Login";
import Register     from "./pages/Register";
import LevelTerm    from "./pages/LevelTerm";
import Courses      from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Upload       from "./pages/Upload";
import SearchPage   from "./pages/Search";
import AdminPanel   from "./pages/AdminPanel";

function Private({ children }) {
  return localStorage.getItem("token") ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const { user, loading, login, register, logout } = useAuth();

  if (loading) return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center",
      justifyContent:"center", flexDirection:"column", gap:14,
      background:"var(--bg)" }}>
      <div style={{ width:52, height:52, borderRadius:"50%",
        background:"linear-gradient(135deg,var(--mint),var(--glow))",
        display:"flex", alignItems:"center", justifyContent:"center",
        animation:"spin 1s linear infinite",
        boxShadow:"0 4px 16px rgba(46,184,92,0.28)" }}>
        <span className="ms lg fill" style={{ color:"var(--forest)", fontSize:24 }}>school</span>
      </div>
      <span style={{ fontFamily:"var(--display)", fontWeight:700,
        fontSize:"var(--fs-base)", color:"var(--ink3)" }}>
        Loading Academix…
      </span>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  return (
    <BrowserRouter>
      <div style={{ display:"flex", flexDirection:"column",
        minHeight:"100vh", background:"var(--bg)" }}>
        <Navbar user={user} onLogout={logout} />
        <main style={{ flex:1 }}>
          <Routes>
            <Route path="/"                   element={user ? <Navigate to="/levels" replace /> : <Home />} />
            <Route path="/login"              element={<Login    onLogin={login}       />} />
            <Route path="/register"           element={<Register onRegister={register} />} />
            <Route path="/levels"             element={<Private><LevelTerm    user={user} /></Private>} />
            <Route path="/semester/:semId"    element={<Private><Courses /></Private>} />
            <Route path="/course/:courseCode" element={<Private><CourseDetail user={user} /></Private>} />
            <Route path="/upload"             element={<Private><Upload /></Private>} />
            <Route path="/search"             element={<Private><SearchPage /></Private>} />
            <Route path="/admin"              element={<Private><AdminPanel   user={user} /></Private>} />
            <Route path="*"                   element={<Navigate to={user ? "/levels" : "/"} replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

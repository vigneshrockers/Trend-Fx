import { Link } from "react-router-dom";

export default function PublicNavbar() {
  return (
    <header className="navWrap">
      <div className="navInner">
        <Link to="/login" className="logo">
          <span className="logoMark">TF</span>
          <span className="logoText">Trend-Fx</span>
        </Link>

        <nav className="navLinks">
          <a href="#home">Home</a>

          <div className="navDrop">
            <span className="navDropLabel">Register/Log In ▾</span>
            <div className="navDropMenu">
              <Link to="/register">Register</Link>
              <Link to="/login">Login</Link>
            </div>
          </div>

          <a href="#about">About</a>
          <a href="#converter">Currency Converter</a>
          <a href="#contact">Contact Us</a>
        </nav>

        <div className="navRight">
          <span className="navIcon" title="Search">🔍</span>
        </div>
      </div>
    </header>
  );
}
import { Link } from "react-router-dom";

export default function PublicNavbar() {
  return (
    <header className="navWrap">
      <div className="navInner">
<<<<<<< HEAD
        <Link to="/login" className="logo">
=======
        
        {/* Logo */}
        <Link to="/" className="logo">
>>>>>>> c89c4f0 (Added Live Price Traking using API)
          <span className="logoMark">TF</span>
          <span className="logoText">Trend-Fx</span>
        </Link>

<<<<<<< HEAD
        <nav className="navLinks">
          <a href="#home">Home</a>

          <div className="navDrop">
            <span className="navDropLabel">Register/Log In ▾</span>
=======
        {/* Navigation Menu */}
        <nav className="navLinks">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#converter">Currency Converter</a>
          <a href="#contact">Contact Us</a>

          <div className="navDrop">
            <span className="navDropLabel">Register / Login ▾</span>
>>>>>>> c89c4f0 (Added Live Price Traking using API)
            <div className="navDropMenu">
              <Link to="/register">Register</Link>
              <Link to="/login">Login</Link>
            </div>
          </div>
<<<<<<< HEAD

          <a href="#about">About</a>
          <a href="#converter">Currency Converter</a>
          <a href="#contact">Contact Us</a>
        </nav>

        <div className="navRight">
          <span className="navIcon" title="Search">🔍</span>
        </div>
=======
        </nav>

>>>>>>> c89c4f0 (Added Live Price Traking using API)
      </div>
    </header>
  );
}
import heroBg from "../assets/forex-hero.jpg"; 
import { Link } from "react-router-dom";
import "../styles/home.css";

export default function Home() {
  return (
    <div
  className="home-wrapper hero-bg"
  style={{
    backgroundImage: `url(${heroBg})`,
  }}
>
      <div className="home-top-section single-column-home">
        <div className="home-left">
          <h1>AI-Based Forex Prediction Website</h1>
          <p>
            View live forex prices, charts, market timings, and a simple demo
            dashboard for your Trend-Fx project.
          </p>

          <div className="home-buttons">
            <Link to="/login" className="btn-primary">
              Login
            </Link>
            <Link to="/register" className="btn-secondary">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
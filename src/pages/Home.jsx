import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <header className="home-hero">
        <div className="home-hero__glyphs" aria-hidden="true">
          <span>{'</>'}</span>
          <span>{'{ }'}</span>
          <span>{'=>'}</span>
        </div>
        <p className="home-hero__eyebrow">Student Management System</p>
        <h1 className="home-hero__title">
          Pick a track.<br />Start building.
        </h1>
        <p className="home-hero__subtitle">
          Hands-on Python and Full Stack courses built for real projects,
          not just certificates.
        </p>
        <Link to="/courses" className="btn btn-primary home-hero__cta">
          Browse Courses
        </Link>
      </header>

      <section className="home-features">
        <div className="home-feature reveal">
          <span className="home-feature__icon">{'{ }'}</span>
          <h3>Project-based</h3>
          <p>Every course ends with something real you actually built, not just slides.</p>
        </div>
        <div className="home-feature reveal">
          <span className="home-feature__icon">{'</>'}</span>
          <h3>Beginner friendly</h3>
          <p>Structured step by step, whether you're starting from zero or switching tracks.</p>
        </div>
        <div className="home-feature reveal">
          <span className="home-feature__icon">{'=>'}</span>
          <h3>Flexible pricing</h3>
          <p>Pick Python or go Full Stack — pay securely online in a couple of clicks.</p>
        </div>
      </section>
    </div>
  );
}

export default Home;
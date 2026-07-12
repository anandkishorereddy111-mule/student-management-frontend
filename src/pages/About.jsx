import "./About.css";

function About() {
  return (
    <div className="about">
      <header className="about-header">
        <p className="about-header__eyebrow">About Us</p>
        <h1>Why PJN Technologies?</h1>
        <p className="about-header__sub">
          We built this platform to make picking up real, job-ready skills as
          simple as choosing a course and clicking register.
        </p>
      </header>

      <section className="about-body">
        <div className="about-card reveal">
          <h3>Our mission</h3>
          <p>
            To give students a straightforward path from "I want to learn to code"
            to "I built something real" — without the noise of a hundred
            scattered tutorials.
          </p>
        </div>
        <div className="about-card reveal">
          <h3>What we offer</h3>
          <p>
            Python,Java,Full Stack Development tracks, taught with hands-on
            projects, clear pricing, and secure online registration and payment.
          </p>
        </div>
        <div className="about-card reveal">
          <h3>Get in touch</h3>
          <p>
            Have a question before enrolling? Reach out at
            <strong>anandkishorereddy111@gmail.com</strong> and we'll help you pick the
            right track.
          </p>
        </div>
      </section>
    </div>
  );
}

export default About;
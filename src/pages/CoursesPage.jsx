import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { createRipple } from "../utils/ripple";
import "./CoursesPage.css";

function CoursesPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    course: "",
  });

  const [status, setStatus] = useState("");
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [showSticky, setShowSticky] = useState(false);
  const [revealedIds, setRevealedIds] = useState(new Set());

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/courses`);
        setCourses(res.data.filter((c) => c.active));
      } catch (err) {
        console.error("Failed to load courses", err);
      } finally {
        setLoadingCourses(false);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.dataset.revealId;
            if (id) {
              setRevealedIds((prev) => {
                if (prev.has(id)) return prev;
                const next = new Set(prev);
                next.add(id);
                return next;
              });
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [loadingCourses]);

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 320);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    setFormData({ ...formData, course: course.courseName });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/students/register`, formData);
      console.log(response.data);
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  const handlePayment = async () => {
    if (!selectedCourse) {
      alert("Please select a course first.");
      return;
    }

    const inputName = document.querySelector('input[name="name"]')?.value || formData.name;
    const inputEmail = document.querySelector('input[name="email"]')?.value || formData.email;

    if (!inputName || !inputEmail) {
      alert("Please fill out your Name and Email fields before clicking Pay Now.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/payment/create-order?amount=${selectedCourse.price}&receiptId=receipt_${Date.now()}`
      );
      const order = response.data;

      const options = {
        key: "rzp_test_T8v40JUj6nLL94",
        amount: order.amount,
        currency: order.currency,
        name: "Student Management System",
        description: selectedCourse.courseName,
        order_id: order.id,
        handler: async function (paymentResponse) {
          console.log("Payment Success Payload:", paymentResponse);
          setStatus("loading");
          try {
            const finalResponse = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/payment/verify`, null, {
              params: {
                razorpay_order_id: paymentResponse.razorpay_order_id,
                razorpay_payment_id: paymentResponse.razorpay_payment_id,
                razorpay_signature: paymentResponse.razorpay_signature,
                email: inputEmail,
                studentName: inputName
              }
            });
            console.log("Payment verified successfully:", finalResponse.data);
            setStatus("success");
          } catch (backendError) {
            console.error("Payment passed, but verification failed:", backendError);
            setStatus("error");
          }
        },
        prefill: { name: inputName, email: inputEmail },
        theme: { color: "#E8B34F" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment initiation failed:", error);
    }
  };

  const handleTilt = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -8;
    const rotateY = ((x / rect.width) - 0.5) * 8;
    card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  };

  const resetTilt = (e) => {
    e.currentTarget.style.transform = "";
  };

  const steps = [
    { label: "Choose course", done: !!selectedCourse },
    { label: "Your details", done: !!(formData.name && formData.phone && formData.email) },
    { label: "Confirm & pay", done: status === "success" },
  ];
  const activeStepIndex = steps.findIndex((s) => !s.done);
  const currentStep = activeStepIndex === -1 ? steps.length - 1 : activeStepIndex;

  return (
    <div className="courses-page">
      <header className="courses-header">
        <p className="courses-header__eyebrow">Our Courses</p>
        <h1>Choose your track</h1>
      </header>

      <div className="rf-stepper">
        {steps.map((step, idx) => (
          <div className="rf-step" key={step.label}>
  <div className={`rf-step_dot ${step.done ? "is-done" : ""}`}>
    {step.done ? "/" : idx + 1}
  </div>
  <span className={`rf-step_label ${step.done || idx === currentStep ? "is-active" : ""}`}>
    {step.label}
  </span>
  {idx < steps.length - 1 && <div className={`rf-step_line ${step.done ? "is-done" : ""}`} />}
</div>
        ))}
      </div>

      <section className="rf-section">
        <div className="rf-section__head">
          <h2>Select a course</h2>
          <span className="rf-section__hint">Tap a card to choose it</span>
        </div>

        {loadingCourses ? (
          <div className="rf-course-grid">
            {[1, 2].map((n) => (
              <div className="rf-course-card rf-course-card--skeleton" key={n} />
            ))}
          </div>
        ) : (
          <div className="rf-course-grid">
            {courses.map((course, idx) => {
              const isSelected = selectedCourse?.courseId === course.courseId;
              const revealId = `course-${course.courseId}`;
              const isRevealed = revealedIds.has(revealId);
              return (
                <div
                  key={course.courseId}
                  data-reveal-id={revealId}
                  onClick={() => handleCourseSelect(course)}
                  onMouseMove={handleTilt}
                  onMouseLeave={resetTilt}
                  style={{ transitionDelay: `${idx * 70}ms` }}
                  className={`rf-course-card reveal${isRevealed ? " is-visible" : ""}${isSelected ? " rf-course-card--selected" : ""}`}
                >
                  <div className="rf-course-card__image-wrap">
                    <img src={`/images/${course.imageFileName}`} alt={course.courseName} className="rf-course-card__image" />
                    <div className="rf-course-card__overlay" />
                    {isSelected && <span className="rf-course-card__badge">Selected</span>}
                  </div>
                  <div className="rf-course-card__body">
                    <h3>{course.courseName}</h3>
                    <span className="rf-course-card__price">₹{course.price}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section className="rf-section">
        <div
          data-reveal-id="form-card"
          className={`rf-form-card reveal${revealedIds.has("form-card") ? " is-visible" : ""}`}
        >
          <div className="rf-form-card__head">
            <h2>Your details</h2>
            <span className="rf-section__hint">
              {selectedCourse ? `Registering for ${selectedCourse.courseName}` : "Select a course first"}
            </span>
          </div>

          <form onSubmit={handleSubmit} className="rf-form">
            <div className="rf-field">
              <label htmlFor="name">Full name</label>
              <input id="name" name="name" placeholder="Your name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="rf-field">
              <label htmlFor="phone">Phone number</label>
              <input id="phone" name="phone" placeholder="10-digit mobile number" value={formData.phone} onChange={handleChange} required />
            </div>
            <div className="rf-field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" placeholder="you@example.com" type="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="rf-field">
              <label htmlFor="course">Course</label>
              <input id="course" name="course" placeholder="No course selected yet" value={formData.course} readOnly required />
            </div>

            <div className="rf-form__actions">
              <button type="submit" className="btn btn-primary" onMouseDown={createRipple} disabled={status === "loading" || !selectedCourse}>
                {status === "loading" ? "Registering…" : "Register"}
              </button>
              <button type="button" className="btn btn-outline" onMouseDown={createRipple} onClick={handlePayment} disabled={!selectedCourse}>
                Pay Now{selectedCourse ? " . ₹" + selectedCourse.price : ""}
              </button>
            </div>
          </form>

          {status === "success" && (
            <div className="rf-status rf-status--success">
              <svg className="rf-check" viewBox="0 0 52 52" width="22" height="22">
                <circle className="rf-check__circle" cx="26" cy="26" r="23" fill="none" />
                <path className="rf-check__mark" fill="none" d="M14 27l7 7 16-16" />
              </svg>
              <span>Registered successfully. Check your email for confirmation.</span>
            </div>
          )}
          {status === "error" && <p className="rf-status rf-status--error">Something went wrong. Please try again.</p>}
        </div>
      </section>

      {selectedCourse && showSticky && status !== "success" && (
        <div className="rf-sticky-bar">
          <div className="rf-sticky-bar__info">
            <span className="rf-sticky-bar__label">Selected</span>
            <strong>{selectedCourse.courseName}</strong>
          </div>
          <div className="rf-sticky-bar__actions">
            <span className="rf-sticky-bar__price">₹{selectedCourse.price}</span>
            <button type="button" className="btn btn-outline" onMouseDown={createRipple} onClick={handlePayment}>
              Pay Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CoursesPage;
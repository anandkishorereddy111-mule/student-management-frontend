Student Management System — Frontend
Student-facing web app for course browsing, registration, and payment. Built for PJN Technologies.
Tech Stack
	•	React + Vite
	•	Axios (API calls)
	•	Razorpay Checkout (payment UI)
Features
	•	Course catalog with pricing
	•	Registration form
	•	Integrated Razorpay payment flow
	•	Responsive multi-page layout (Home, Courses, About)
Project Structure
src/
├── api/          # Backend API calls
├── pages/        # Route-level components (Home, Courses, About)
├── components/   # Shared UI components
└── utils/
Setup
prerequisites
•	Node.js 18+
•	The backend running locally (see student-management-backend repo) at http://localhost:8080
Run locally : npm install
              npm run dev --runs on http://localhost:5174.
Notes
This frontend expects the backend API to be running and reachable at http://localhost:8080. Update the base URL in src/api/ if deploying to a different environment.
      
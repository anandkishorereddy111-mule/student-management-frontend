import CourseList from "./CourseList";

function AdminPage({ onEdit }) {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px" }}>
      <CourseList onEdit={onEdit} />
    </div>
  );
}

export default AdminPage;
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <div>
        <h1>Dashboard</h1>
        <p>This is a protected page.</p>
      </div>
    </ProtectedRoute>
  );
}

// ** Router Imports
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

// ** Layout Imports
import Layout from "./layout/MainLayout";

// ** Component Imports
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import LoadingScreen from "./components/Loading";
import Error401 from "./pages/401";
import Error404 from "./pages/404";

// ** Lazy load pages for better performance
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Products = lazy(() => import("./pages/Products"));
const Login = lazy(() => import("./pages/Login"));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          {/* Public Route - Accessible only if NOT logged in - (No Layout) */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          {/* Wrap all protected pages inside Layout - Only for Authenticated Users */}
          <Route element={<Layout />}>
            <Route
              path="/"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/products"
              element={
                <ProtectedRoute roles={["admin", "user"]}>
                  <Products />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Unauthorized Page */}
          <Route path="/unauthorized" element={<Error401 />} />

          {/* 404 Page */}
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;

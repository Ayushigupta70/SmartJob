import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ROUTES } from './routeConstants.js';

// Layout
import DashboardLayout from '../components/layout/DashboardLayout.jsx';

// Auth Pages
import LoginPage from '../pages/auth/LoginPage.jsx';
import RegisterPage from '../pages/auth/RegisterPage.jsx';
import AuthTestPage from '../pages/auth/AuthTestPage.jsx';

// Dashboard Pages
import DashboardPage from '../pages/dashboard/DashboardPage.jsx';

// Jobs Pages
import JobsPage from '../pages/jobs/JobsPage.jsx';
import PostJobPage from '../pages/jobs/PostJobPage.jsx';
import EditJobPage from '../pages/jobs/EditJobPage.jsx';
import ManageJobsPage from '../pages/jobs/ManageJobPage.jsx';

// Candidates Pages
import CandidatesPage from '../pages/candidates/CandidatesPage.jsx';
import ApplicantListPage from '../pages/candidates/ApplicationListPage.jsx';
import AcceptedApplicantsPage from '../pages/candidates/AcceptedApplicantsPage.jsx';
import RejectedApplicantsPage from '../pages/candidates/RejectedApplicantsPage.jsx';
import SearchCandidatesPage from '../pages/candidates/SearchCandidatesPage.jsx';
import BookmarkedCandidatesPage from '../pages/candidates/BookmarkedCandidatesPage.jsx';
import CandidateDetailPage from '../pages/candidates/CandidateDetailPage.jsx';

// Interviews
import InterviewsPage from '../pages/interviews/InterviewsPage.jsx';

// Communication
import CommunicationPage from '../pages/communication/CommunicationPage.jsx';

// Profile
import ProfilePage from '../pages/profile/ProfilePage.jsx';

// -------------------- Protected & Public Route --------------------
const ProtectedRoute = ({ children }) => {
  const { token } = useSelector((state) => state.users);

  return token ? children : <Navigate to={ROUTES.LOGIN} replace />;
};

const PublicRoute = ({ children }) => {
  const { token, userRole } = useSelector((state) => state.users);

  if (token) {
    return userRole === "Admin"
      ? <Navigate to="/admin-dashboard" replace />
      : <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return children;
};

// -------------------- Routes --------------------
const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path={ROUTES.LOGIN}
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path={ROUTES.REGISTER}
        element={
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        }
      />
      <Route path="/auth-test" element={<AuthTestPage />} />

      {/* Protected Dashboard Routes */}
      <Route
        path={ROUTES.HOME}
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {/* Dashboard */}
        <Route index element={<Navigate to={ROUTES.DASHBOARD} replace />} />
        <Route path="dashboard" element={<DashboardPage />} />

        {/* Jobs */}
        <Route path="jobs" element={<JobsPage />} />
        <Route path="jobs/post" element={<PostJobPage />} />
        <Route path="jobs/manage" element={<ManageJobsPage />} />
        <Route path="jobs/edit/:id" element={<EditJobPage />} />

        {/* Candidates */}
        <Route path="candidates" element={<CandidatesPage />} />
        <Route path="candidates/applicants" element={<ApplicantListPage />} />
        <Route path="candidates/accepted" element={<AcceptedApplicantsPage />} />
        <Route path="candidates/rejected" element={<RejectedApplicantsPage />} />
        <Route path="candidates/search" element={<SearchCandidatesPage />} />
        <Route path="candidates/bookmarked" element={<BookmarkedCandidatesPage />} />
        <Route path="candidates/:id" element={<CandidateDetailPage />} />

        {/* Interviews */}
        <Route path="interviews" element={<InterviewsPage />} />

        {/* Communication */}
        <Route path="communication" element={<CommunicationPage />} />

        {/* Profile */}
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      {/* 404 - Catch All */}
      <Route
        path="*"
        element={
          <div style={styles.notFound}>
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <a href={ROUTES.DASHBOARD} style={styles.link}>
              Go to Dashboard
            </a>
          </div>
        }
      />
    </Routes>
  );
};

// -------------------- Styles --------------------
const styles = {
  notFound: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    textAlign: 'center',
  },
  link: {
    color: '#6366f1',
    textDecoration: 'none',
    marginTop: '10px',
    fontWeight: 'bold',
  },
};

export default AppRoutes;

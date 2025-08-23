import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { ROUTES } from './routeConstants.js';

// Layout Components
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

// Candidates Pages
import CandidatesPage from '../pages/candidates/CandidatesPage.jsx';
import SearchCandidatesPage from '../pages/candidates/SearchCandidatesPage.jsx';
import BookmarkedCandidatesPage from '../pages/candidates/BookmarkedCandidatesPage.jsx';
import CandidateDetailPage from '../pages/candidates/CandidateDetailPage.jsx';

// Interviews Pages
import InterviewsPage from '../pages/interviews/InterviewsPage.jsx';

// Communication Pages
import CommunicationPage from '../pages/communication/CommunicationPage.jsx';

// Profile Pages
import ProfilePage from '../pages/profile/ProfilePage.jsx';
import ManageJobsPage from '../pages/jobs/ManageJobPage.jsx';
import ApplicantListPage from '../pages/candidates/ApplicationListPage.jsx';
import AcceptedApplicantsPage from '../pages/candidates/AcceptedApplicantsPage.jsx';
import RejectedApplicantsPage from '../pages/candidates/RejectedApplicantsPage.jsx';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px'
      }}>
        Loading...
      </div>
    );
  }

  return user ? children : <Navigate to={ROUTES.LOGIN} replace />;
};

// Public Route Component (redirects to dashboard if already logged in)
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px'
      }}>
        Loading...
      </div>
    );
  }

  return user ? <Navigate to={ROUTES.DASHBOARD} replace /> : children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes - Auth Pages */}
      <Route path={ROUTES.LOGIN} element={
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
      } />

      <Route path={ROUTES.REGISTER} element={
        <PublicRoute>
          <RegisterPage />
        </PublicRoute>
      } />

      {/* Temporary Test Page */}
      <Route path="/auth-test" element={<AuthTestPage />} />

      {/* Protected Routes - Dashboard Pages */}
      <Route path={ROUTES.HOME} element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        {/* Dashboard */}
        <Route index element={<Navigate to={ROUTES.DASHBOARD} replace />} />
        <Route path="dashboard" element={<DashboardPage />} />

        {/* Jobs Management */}
        <Route path="jobs" element={<JobsPage />} />
        <Route path="jobs/post" element={<PostJobPage />} />
        <Route path="/jobs/manage" element={<ManageJobsPage />} />
        <Route path="jobs/edit/:id" element={<EditJobPage />} />

        {/* Candidates Management */}
        <Route path="candidates" element={<CandidatesPage />} />
        <Route path="/candidates/applicants" element={<ApplicantListPage />} />
        <Route path="candidates/search" element={<SearchCandidatesPage />} />
        <Route path="candidates/bookmarked" element={<BookmarkedCandidatesPage />} />
        <Route path="candidates/:id" element={<CandidateDetailPage />} />
        <Route path="/candidates/accapted" element={<AcceptedApplicantsPage />} />
        <Route path="/candidates/rejected" element={<RejectedApplicantsPage />} />

        {/* Interviews */}
        <Route path="interviews" element={<InterviewsPage />} />

        {/* Communication */}
        <Route path="communication" element={<CommunicationPage />} />

        {/* Profile */}
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      {/* Catch-all route for 404 */}
      <Route path="*" element={
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          textAlign: 'center'
        }}>
          <h1>404 - Page Not Found</h1>
          <p>The page you are looking for does not exist.</p>
          <a href={ROUTES.DASHBOARD} style={{ color: '#6366f1', textDecoration: 'none' }}>
            Go to Dashboard
          </a>
        </div>
      } />
    </Routes>
  );
};

export default AppRoutes;

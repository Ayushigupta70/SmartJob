// Route constants for consistent navigation
export const ROUTES = {
  // Auth Routes
  LOGIN: '/login',
  REGISTER: '/register',

  // Dashboard Routes
  HOME: '/',
  DASHBOARD: '/dashboard',

  // Job Management Routes
  JOBS: '/jobs',
  POST_JOB: '/jobs/post',
  EDIT_JOB: '/jobs/edit/:id',

  // Candidate Management Routes
  CANDIDATES: '/candidates',
  SEARCH_CANDIDATES: '/candidates/search',
  BOOKMARKED_CANDIDATES: '/candidates/bookmarked',
  CANDIDATE_DETAIL: '/candidates/:id',

  // Communication Routes
  COMMUNICATION: '/communication',

  // Interview Routes
  INTERVIEWS: '/interviews',

  // Profile Routes
  PROFILE: '/profile',
};

// Helper functions for dynamic routes
export const getEditJobRoute = (jobId) => `/jobs/edit/${jobId}`;
export const getCandidateDetailRoute = (candidateId) => `/candidates/${candidateId}`;

// Route groups for easier management
export const PUBLIC_ROUTES = [ROUTES.LOGIN, ROUTES.REGISTER];
export const PROTECTED_ROUTES = [
  ROUTES.DASHBOARD,
  ROUTES.JOBS,
  ROUTES.POST_JOB,
  ROUTES.CANDIDATES,
  ROUTES.SEARCH_CANDIDATES,
  ROUTES.BOOKMARKED_CANDIDATES,
  ROUTES.COMMUNICATION,
  ROUTES.INTERVIEWS,
  ROUTES.PROFILE,
];

export default ROUTES;

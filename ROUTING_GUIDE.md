# SmartJob Routing System Documentation

## Overview

The SmartJob Recruiter Dashboard now uses a well-organized routing system with separate route files for better maintainability and scalability.

## File Structure

```
src/
├── routes/
│   ├── AppRoutes.jsx          # Main routing component
│   ├── routeConstants.js      # Route constants and helpers
│   └── index.js              # Barrel export for clean imports
├── App.jsx                   # Simplified main app component
└── ...
```

## Route Organization

### 1. **AppRoutes.jsx**

- Main routing component containing all route definitions
- Implements protected and public route logic
- Handles authentication-based redirections
- Includes 404 error handling

### 2. **routeConstants.js**

- Centralized route constants for consistent navigation
- Helper functions for dynamic routes
- Route groupings for easier management

### 3. **Route Protection**

- **ProtectedRoute Component**: Ensures only authenticated users can access dashboard pages
- **PublicRoute Component**: Redirects authenticated users away from auth pages
- Loading states during authentication checks

## Route Structure

### Public Routes (Authentication Required)

```javascript
/login         - Login page
/register      - Registration page
```

### Protected Routes (Authentication Required)

```javascript
/              - Home (redirects to /dashboard)
/dashboard     - Main dashboard
/jobs          - Job management
/jobs/post     - Post new job
/jobs/edit/:id - Edit specific job
/candidates    - Candidate management
/candidates/search - Search candidates
/candidates/bookmarked - Bookmarked candidates
/candidates/:id - Candidate details
/interviews    - Interview scheduling
/communication - Communication center
/profile       - User profile
```

### Special Routes

```javascript
*              - 404 error page with navigation back to dashboard
```

## Usage Examples

### 1. **Using Route Constants**

```javascript
import { ROUTES } from "../routes";

// Navigation
navigate(ROUTES.DASHBOARD);
navigate(ROUTES.POST_JOB);

// Dynamic routes
import { getEditJobRoute, getCandidateDetailRoute } from "../routes";
navigate(getEditJobRoute(jobId));
navigate(getCandidateDetailRoute(candidateId));
```

### 2. **Route Protection**

```javascript
// Automatic protection - no additional code needed
// ProtectedRoute wrapper handles authentication checks
<Route path="/dashboard" element={<DashboardPage />} />
```

### 3. **Navigation in Components**

```javascript
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes";

const MyComponent = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(ROUTES.CANDIDATES);
  };

  return <button onClick={handleNavigation}>Go to Candidates</button>;
};
```

## Route Constants Reference

### Authentication Routes

- `ROUTES.LOGIN` - "/login"
- `ROUTES.REGISTER` - "/register"

### Dashboard Routes

- `ROUTES.HOME` - "/"
- `ROUTES.DASHBOARD` - "/dashboard"

### Job Management Routes

- `ROUTES.JOBS` - "/jobs"
- `ROUTES.POST_JOB` - "/jobs/post"
- `ROUTES.EDIT_JOB` - "/jobs/edit/:id"

### Candidate Management Routes

- `ROUTES.CANDIDATES` - "/candidates"
- `ROUTES.SEARCH_CANDIDATES` - "/candidates/search"
- `ROUTES.BOOKMARKED_CANDIDATES` - "/candidates/bookmarked"
- `ROUTES.CANDIDATE_DETAIL` - "/candidates/:id"

### Other Routes

- `ROUTES.COMMUNICATION` - "/communication"
- `ROUTES.INTERVIEWS` - "/interviews"
- `ROUTES.PROFILE` - "/profile"

## Helper Functions

### Dynamic Route Builders

```javascript
// Build edit job route with specific ID
const editRoute = getEditJobRoute(123); // "/jobs/edit/123"

// Build candidate detail route with specific ID
const candidateRoute = getCandidateDetailRoute(456); // "/candidates/456"
```

### Route Groups

```javascript
// Check if route is public
if (PUBLIC_ROUTES.includes(currentPath)) {
  // Handle public route logic
}

// Check if route is protected
if (PROTECTED_ROUTES.includes(currentPath)) {
  // Handle protected route logic
}
```

## Authentication Flow

### 1. **User Not Authenticated**

- Accessing protected routes → Redirect to `/login`
- Accessing public routes → Show login/register pages

### 2. **User Authenticated**

- Accessing public routes → Redirect to `/dashboard`
- Accessing protected routes → Show requested page
- Accessing non-existent routes → Show 404 page

### 3. **Loading States**

- Shows loading spinner during authentication checks
- Prevents flash of unauthorized content

## Benefits of This Structure

### 1. **Maintainability**

- Centralized route management
- Consistent route naming
- Easy to update routes across the application

### 2. **Type Safety**

- Constants prevent typos in route paths
- IDE autocomplete for route names

### 3. **Scalability**

- Easy to add new routes
- Grouped route management
- Modular route organization

### 4. **Developer Experience**

- Clear separation of concerns
- Easy to understand and modify
- Comprehensive documentation

## Adding New Routes

### 1. **Add Route Constant**

```javascript
// In routeConstants.js
export const ROUTES = {
  // ... existing routes
  NEW_FEATURE: "/new-feature",
};
```

### 2. **Add Route Definition**

```javascript
// In AppRoutes.jsx
import NewFeaturePage from "../pages/NewFeaturePage.jsx";

// Add to route definitions
<Route path="new-feature" element={<NewFeaturePage />} />;
```

### 3. **Update Sidebar (if needed)**

```javascript
// In Sidebar.jsx
{
  title: 'New Feature',
  path: ROUTES.NEW_FEATURE,
  icon: <NewIcon />,
}
```

## Best Practices

1. **Always use route constants** instead of hardcoded strings
2. **Keep route logic in AppRoutes.jsx** for centralized management
3. **Use descriptive route names** that match the feature
4. **Group related routes** using nested route structure
5. **Handle authentication consistently** using ProtectedRoute wrapper
6. **Provide meaningful 404 pages** with navigation options

---

This routing system provides a solid foundation for the SmartJob Recruiter Dashboard, making it easy to maintain and extend as the application grows.

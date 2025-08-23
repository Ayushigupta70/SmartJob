# Authentication Issue Debug Guide

## Issue Description

After registering a new user and logging out, when trying to login with the same email and password, the system says "first register" indicating the user data is not being saved to localStorage.

## Debug Steps

### Step 1: Test localStorage Functionality

1. Open the test page at `http://localhost:3000/auth-test`
2. Click "Test LocalStorage" button
3. Check browser console for localStorage test results
4. Verify localStorage is working correctly

### Step 2: Check Initial Demo User

1. Click "Debug LocalStorage" button
2. Check console for registered users
3. Verify demo user `manisha.sah@email.com` exists

### Step 3: Test Demo User Login

1. Click "Test Demo Login" button
2. Check console for login process logs
3. Verify demo login works correctly

### Step 4: Test New User Registration

1. Click "Test Registration" button (creates test@example.com)
2. Check console for registration process logs
3. Verify new user appears in registered users list
4. Check localStorage data using browser dev tools

### Step 5: Test Logout and Re-login

1. If logged in, click "Logout" button
2. Click "Test Login" button (tries to login with test@example.com)
3. Check console for login process logs
4. Verify login works with newly registered user

### Step 6: Manual Registration Test

1. Go to `/register` page
2. Fill in registration form with strong password
3. Register new user
4. Logout from dashboard
5. Go to `/login` page
6. Try to login with same credentials
7. Check if login works or gives "register first" error

## Debug Information to Check

### In Browser Console:

- `=== INITIALIZING AUTH CONTEXT ===` logs
- `=== REGISTRATION ATTEMPT ===` logs
- `=== LOGIN ATTEMPT ===` logs
- localStorage test results
- Any error messages

### In Browser DevTools Application Tab:

- localStorage → `smartjob_registered_users` (should contain array of users)
- localStorage → `smartjob_user` (current session, if logged in)

### Expected localStorage Structure:

```json
// smartjob_registered_users
[
  {
    "id": 1,
    "name": "Manisha Sah",
    "email": "manisha.sah@email.com",
    "hashedPassword": "[HASHED]",
    "role": "Recruiter",
    "company": "Tech Solutions Inc.",
    "avatar": null,
    "joinedDate": "2025-08-06T..."
  }
]

// smartjob_user (when logged in)
{
  "id": 1,
  "name": "Manisha Sah",
  "email": "manisha.sah@email.com",
  "role": "Recruiter",
  "company": "Tech Solutions Inc.",
  "avatar": null,
  "joinedDate": "2025-08-06T..."
}
```

## Common Issues to Check

1. **localStorage Disabled**: Some browsers/settings disable localStorage
2. **Private/Incognito Mode**: localStorage may not persist
3. **Storage Quota**: localStorage may be full
4. **Browser Compatibility**: Old browsers may have issues
5. **HTTPS vs HTTP**: Some localStorage behaviors differ
6. **Domain Issues**: Different ports/domains have separate localStorage

## Fixes to Try

1. **Clear Browser Cache**: Clear all browser data
2. **Different Browser**: Test in Chrome, Firefox, Edge
3. **Normal Mode**: Exit private/incognito browsing
4. **Check DevTools**: Monitor Network and Console tabs
5. **Storage Inspector**: Use browser DevTools Application tab

## Test Results Template

```
✅ localStorage test: PASS/FAIL
✅ Demo user exists: PASS/FAIL
✅ Demo login works: PASS/FAIL
✅ New registration saves: PASS/FAIL
✅ Logout clears session: PASS/FAIL
✅ Re-login with new user: PASS/FAIL
✅ Manual registration flow: PASS/FAIL
```

---

**Note**: Open browser DevTools (F12) and check Console tab for detailed logs while performing these tests.

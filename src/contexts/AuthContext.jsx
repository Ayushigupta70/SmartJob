import React, { createContext, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slice/RegisterSlice";

// Create context
const AuthContext = createContext();

// Provider
export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { user, token, userRole, loading, error } = useSelector(
    (state) => state.users
  );

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        role: userRole,
        loading,
        error,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook
export const useAuth = () => useContext(AuthContext);

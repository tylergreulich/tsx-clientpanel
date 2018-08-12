export interface NavBarProps {
  auth: {
    isAuthenticated: boolean;
  };
  logoutUser: () => void;
}

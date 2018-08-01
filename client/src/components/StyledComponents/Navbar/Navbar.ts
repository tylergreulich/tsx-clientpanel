import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavbarLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

export const RegisterLink = NavbarLink.extend``;
export const LoginLink = NavbarLink.extend``;
export const LogoutLink = NavbarLink.extend``;

export const DashboardLink = NavbarLink.extend`
  flex: 1;
  margin-left: 1rem;
`;

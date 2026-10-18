import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../features/auth/authSlice';
import { styled } from '../stitches.config';

// --- Styled Components ---

const Nav = styled('nav', {
  backgroundColor: '$indigo600',
  color: '$white',
  boxShadow: '$md',
});

const NavInner = styled('div', {
  maxWidth: '1280px',
  mx: 'auto',
  px: '$4',
  paddingTop: '$3',
  paddingBottom: '$3',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const BrandLink = styled(Link, {
  fontSize: '$xl',
  fontWeight: '$bold',
  letterSpacing: '-0.025em',
  color: '$white',
});

const NavLinks = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$6',
});

const NavLink = styled(Link, {
  color: '$white',
  transition: 'color 150ms ease',

  '&:hover': {
    color: '$indigo200',
  },
});

const UserSection = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$3',
  borderLeft: '1px solid $indigo400',
  paddingLeft: '$4',
});

const GreetingText = styled('span', {
  fontSize: '$sm',
  fontWeight: '$medium',
  color: '$white',
});

const LogoutButton = styled('button', {
  backgroundColor: '$indigo700',
  color: '$white',
  fontSize: '$xs',
  px: '$3',
  paddingTop: '0.375rem',
  paddingBottom: '0.375rem',
  borderRadius: '$DEFAULT',
  border: 'none',
  cursor: 'pointer',
  transition: 'background-color 150ms ease',

  '&:hover': {
    backgroundColor: '$indigo800',
  },
});

const RegisterLink = styled(Link, {
  backgroundColor: '$white',
  color: '$indigo600',
  fontSize: '$sm',
  fontWeight: '$medium',
  px: '$3',
  paddingTop: '0.375rem',
  paddingBottom: '0.375rem',
  borderRadius: '$DEFAULT',
  boxShadow: '$sm',
  transition: 'background-color 150ms ease',

  '&:hover': {
    backgroundColor: '$indigo50',
  },
});

const LoginLink = styled(Link, {
  fontSize: '$sm',
  color: '$white',
  transition: 'color 150ms ease',

  '&:hover': {
    color: '$indigo200',
  },
});

// --- Component ---

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <Nav>
      <NavInner>
        <BrandLink to="/events">EventHub</BrandLink>

        <NavLinks>
          <NavLink to="/events">Explore Events</NavLink>

          {currentUser ? (
            <>
              <NavLink to="/my-events">My Events</NavLink>
              <UserSection>
                <GreetingText>Hello, {currentUser.name}</GreetingText>
                <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
              </UserSection>
            </>
          ) : (
            <UserSection>
              <LoginLink to="/login">Log In</LoginLink>
              <RegisterLink to="/register">Register</RegisterLink>
            </UserSection>
          )}
        </NavLinks>
      </NavInner>
    </Nav>
  );
};

export default Navbar;
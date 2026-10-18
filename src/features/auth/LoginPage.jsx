import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser, clearAuthError } from './authSlice';
import { styled } from '../../stitches.config';
import { Button, Input } from '../../components/ui';

// --- Styled Components ---

const PageCard = styled('div', {
  maxWidth: '28rem',
  mx: 'auto',
  marginTop: '$10',
  padding: '$6',
  backgroundColor: '$white',
  borderRadius: '$lg',
  boxShadow: '$md',
  border: '1px solid $gray100',
});

const PageTitle = styled('h2', {
  fontSize: '$2xl',
  fontWeight: '$bold',
  marginBottom: '$6',
  textAlign: 'center',
  color: '$gray800',
});

const ErrorBanner = styled('div', {
  marginBottom: '$4',
  padding: '$3',
  backgroundColor: '$red100',
  border: '1px solid $red400',
  color: '$red700',
  fontSize: '$sm',
  borderRadius: '$DEFAULT',
});

const FormStack = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
});

const FieldGroup = styled('div', {});

const FieldLabel = styled('label', {
  display: 'block',
  fontSize: '$sm',
  fontWeight: '$medium',
  color: '$gray700',
  marginBottom: '$1',
});

const FullWidthButton = styled(Button, {
  width: '100%',
});

const FooterText = styled('p', {
  marginTop: '$4',
  textAlign: 'center',
  fontSize: '$sm',
  color: '$gray600',
});

const AuthLink = styled(Link, {
  color: '$indigo600',
  fontWeight: '$medium',

  '&:hover': {
    textDecoration: 'underline',
  },
});

// --- Component ---

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearAuthError());
    if (currentUser) {
      navigate('/events');
    }
  }, [currentUser, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) return;
    dispatch(loginUser(formData));
  };

  return (
    <PageCard>
      <PageTitle>Log In</PageTitle>

      {error && <ErrorBanner>{error}</ErrorBanner>}

      <FormStack onSubmit={handleSubmit}>
        <FieldGroup>
          <FieldLabel>Email</FieldLabel>
          <Input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="john@example.com"
          />
        </FieldGroup>

        <FieldGroup>
          <FieldLabel>Password</FieldLabel>
          <Input
            type="password"
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="••••••••"
          />
        </FieldGroup>

        <FullWidthButton type="submit" variant="primary">
          Sign In
        </FullWidthButton>
      </FormStack>

      <FooterText>
        Don't have an account?{' '}
        <AuthLink to="/register">Register here</AuthLink>
      </FooterText>
    </PageCard>
  );
};

export default LoginPage;
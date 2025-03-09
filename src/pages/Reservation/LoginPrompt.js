import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ROUTES } from '../../constants/routes';

const LoginPromptContainer = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 2rem;
  margin: 2rem 0;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

const LoginTitle = styled.h3`
  font-size: 1.5rem;
  margin: 0;
  color: #333;
  font-weight: 600;
`;

const LoginMessage = styled.p`
  font-size: 1rem;
  color: #666;
  margin: 0;
  line-height: 1.6;
`;

const LoginButton = styled.button`
  background-color: #8b0000;
  color: white;
  font-weight: 600;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 4px;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.2s;
  display: inline-block;
  
  &:hover {
    background-color: #6b0000;
  }
`;

const LoginPrompt = ({ isMobile }) => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate(ROUTES.AUTH);
  };

  return (
    <LoginPromptContainer style={{ padding: isMobile ? '1.5rem' : '2rem' }}>
      <LoginTitle style={{ fontSize: isMobile ? '1.3rem' : '1.5rem' }}>
        Login Required
      </LoginTitle>
      <LoginMessage style={{ fontSize: isMobile ? '0.9rem' : '1rem' }}>
        Please login to your account to reserve a table. 
        After logging in, you'll be able to select your preferred date, time, and table.
      </LoginMessage>
      <LoginButton onClick={handleLoginClick}>
        Log In to Reserve
      </LoginButton>
    </LoginPromptContainer>
  );
};

export default LoginPrompt;
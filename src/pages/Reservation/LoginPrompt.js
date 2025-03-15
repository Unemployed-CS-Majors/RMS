import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ROUTES } from '../../constants/routes';

const LoginPromptContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  margin: 2rem 0;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  border: 1px solid #eaeaea;
`;

const LoginTitle = styled.h3`
  font-size: 1.5rem;
  margin: 0;
  color: #333;
  font-weight: 600;
  position: relative;
  padding-bottom: 0.5rem;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 3px;
    background-color: #e99e33;
    border-radius: 2px;
  }
`;

const LoginMessage = styled.p`
  font-size: 1rem;
  color: #666;
  margin: 0;
  line-height: 1.6;
`;

const LoginButton = styled.button`
  background-color: #e99e33;
  color: white;
  font-weight: 600;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 30px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-block;
  font-size: 1rem;
  
  &:hover {
    background-color: #d68c21;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(233, 158, 51, 0.3);
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
        Make a Reservation
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
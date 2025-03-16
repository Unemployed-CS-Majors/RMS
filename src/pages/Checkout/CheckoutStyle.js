import styled from 'styled-components';

export const ErrorMessage = styled.div`
  background-color: #fff1f0;
  border: 1px solid #ffa39e;
  border-radius: 6px;
  padding: 1rem;
  margin-bottom: 1rem;
  color: #cf1322;
  font-weight: 500;
  display: flex;
  align-items: center;

  &::before {
    content: '⚠️';
    margin-right: 0.5rem;
    font-size: 1.2rem;
  }

  @media (max-width: 768px) {
    padding: 0.75rem;
    margin-bottom: 1rem;
    font-size: 0.9rem;

    &::before {
      font-size: 1rem;
    }
  }
`;

// Page title
export const PageTitle = styled.h1.withConfig({
  shouldForwardProp: prop => prop !== 'blurred',
})`
  font-size: 2.5rem;
  font-weight: 600;
  color: #2d3748;
  text-align: center;
  margin-top: 3rem;
  position: relative;

  &::after {
    content: '';
    width: 80px;
    height: 4px;
    background: linear-gradient(135deg, #ff7b00 0%, #ff9a44 100%);
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 1.8rem;

    &::after {
      width: 60px;
      height: 3px;
      bottom: -8px;
    }
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;

    &::after {
      width: 50px;
    }
  }
  ${({ blurred }) =>
    blurred &&
    `
    filter: blur(8px);
    pointer-events: none;
    user-select: none;
  `}
`;

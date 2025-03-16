import styled from 'styled-components';

export const ErrorMessage = styled.div`
  background-color: #fff1f0;
  border: 1px solid #ffa39e;
  border-radius: 6px;
  padding: 1rem;
  margin-bottom: 1.5rem;
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

export const SuccessMessage = styled.div`
  background-color: #f6ffed;
  border: 1px solid #b7eb8f;
  border-radius: 6px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  color: #389e0d;
  font-weight: 500;
  display: flex;
  align-items: center;

  &::before {
    content: '✅';
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

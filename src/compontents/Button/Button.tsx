import styled from 'styled-components';
import { theme } from '../../theme';

const Button = styled.button`
  color: ${theme.colors.primary};
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  transition: 250ms;
  border-radius: 4px;
  padding: 8px 16px;
  margin: 4px;

  &:hover {
    background-color: ${theme.colors.primaryHover};
  }
`;

export default Button;

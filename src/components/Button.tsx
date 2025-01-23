import React, { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

const ButtonContainer = styled.button<{ isActive?: boolean }>`
  border: 1px solid transparent;
  border-radius: 5px;
  padding: 2px 5px;
  transition: border 0.3s ease, transform 0.3s ease;
  border-color: ${({ isActive }) => (isActive ? "#e3e3e3" : "")};

  &:hover {
    border: 1px solid black;
  }
`;

type ButtonProps = {
  isActive?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const AS: React.FC<ButtonProps> = ({ isActive, children, ...props }) => {
  return (
    <ButtonContainer isActive={isActive} {...props}>
      {children}
    </ButtonContainer>
  );
};

export default AS;

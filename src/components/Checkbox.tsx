import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

const CheckboxContainer = styled.div`
  transition: all 200ms;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid gray;
  border-radius: 100%;
  min-width: 35px;
  height: 35px;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  /* Hide checkbox visually but remain accessible to screen readers. */
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

type StyledCheckboxProps = {
  checked: boolean;
};

const StyledCheckbox = styled.div<StyledCheckboxProps>`
  display: inline-block;
  width: 25px;
  height: 25px;
  background-size: cover;
  border-radius: 25px;
  cursor: pointer;
  background-image: ${(props) =>
    props.checked
      ? `url('/accept.svg')`
      : ``};
`;

type CheckboxProps = {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
} & InputHTMLAttributes<HTMLInputElement>;

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, ...props }) => {
  return (
    <CheckboxContainer>
      <HiddenCheckbox {...props} checked={checked} onChange={onChange} />
      <StyledCheckbox checked={checked} onClick={() => onChange && onChange({} as React.ChangeEvent<HTMLInputElement>)} />
    </CheckboxContainer>
  );
};

export default Checkbox;

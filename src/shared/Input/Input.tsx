import { gray3 } from "constants/colors";
import React, { forwardRef, Ref } from "react";
import styled from "styled-components/macro";

type InputProps = React.HTMLProps<HTMLInputElement> & {};

// const BaseInput = forwardRef((props: InputProps, ref: Ref<HTMLInputElement>) => {
//   return <input {...props} ref={ref} />;
// });

export const Input = styled.input`
  border-radius: 16px;
  height: 2rem;
  font-size: 1rem;
  outline: none;
  padding: 4px 32px 4px 16px;
  border: 1px solid ${gray3};
`;

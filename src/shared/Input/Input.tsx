import React, { forwardRef, Ref } from "react";

type InputProps = React.HTMLProps<HTMLInputElement> & {};

const Input = forwardRef((props: InputProps, ref: Ref<HTMLInputElement>) => {
  return <input {...props} ref={ref} />;
});

export default Input;

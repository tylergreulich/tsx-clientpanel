import * as React from 'react';
import NumberFormat from 'react-number-format';

interface NumberFormatProps {
  inputRef: () => any;
  onChange: () => any;
}

export default (props: NumberFormatProps) => {
  const { inputRef, onChange, ...other } = props;
  return (
    <NumberFormat
      {...other}
      ref={inputRef}
      onChange={props.onChange}
      thousandSeparator={true}
      prefix="$"
    />
  );
};

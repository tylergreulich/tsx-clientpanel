import * as React from 'react';
import NumberFormat from 'react-number-format';

interface NumberFormatProps {
  inputRef: () => any;
  onChange: (target: object) => any;
}

export default (props: NumberFormatProps) => {
  const { inputRef, onChange, ...other } = props;
  return (
    <NumberFormat
      {...other}
      ref={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value
          }
        });
      }}
      thousandSeparator={true}
      prefix="$"
    />
  );
};

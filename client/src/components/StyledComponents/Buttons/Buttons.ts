import styled from 'styled-components';
import { Button } from '@material-ui/core';

interface FormButtonProps {
  wide?: boolean;
  uppercase?: boolean;
}

export const FormButton = styled(Button)`
  width: ${(props: FormButtonProps) => (props.wide ? '12.5rem' : null)};
  text-transform: ${(props: FormButtonProps) =>
    props.uppercase ? 'uppercase' : null};
`;

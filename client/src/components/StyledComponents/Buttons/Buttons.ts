import styled from 'styled-components';
import { Button } from '@material-ui/core';

interface FormButtonProps {
  wide?: boolean;
}

export const FormButton = styled(Button)`
  width: ${(props: FormButtonProps) => (props.wide ? '12.5rem' : null)};
`;

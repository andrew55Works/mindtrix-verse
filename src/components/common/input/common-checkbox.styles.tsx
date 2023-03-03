import styled from 'styled-components';

interface CheckboxProps {
  height?: string;
  width?: string;
}
export const CommonCheckboxStyles = styled.input.attrs<CheckboxProps>(
  (props) => ({
    type: 'checkbox',
    value: props?.value ?? 'on',
    ...props,
  }),
)`
  height: ${(props: CheckboxProps) => props?.height ?? 'inherit'};
  width: ${(props: CheckboxProps) => props?.width ?? 'inherit'};
  margin-top: 8px;
  margin-bottom: 8px;
  cursor: pointer;
`;

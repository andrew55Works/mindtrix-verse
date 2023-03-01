import styled from 'styled-components';

interface PopoverProps {
  index: number;
}
export const PopoverContainer = styled.div<PopoverProps>`
  display: flex;
  position: absolute;
  right: 0;
  top: ${(props: PopoverProps) => `${(props.index + 1) * 53}px`};
  text-align: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #000;
  border: 1px #000000 solid;
  background-color: white;
  z-index: 999999;
  opacity: 1;
`;

export const PopoverItemContainer = styled.div`
  display: flex;
  width: 168px;
  height: 60px;
  padding-left: 10px;
  padding-right: 10px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  color: ${(props) => props?.color ?? 'black'};
  &:hover {
    background-color: #f1f1f1;
  }

  &:not(:last-child) {
    border-bottom: 1px #000000 solid;
  }
`;

export const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  margin-right: 10px;
`;

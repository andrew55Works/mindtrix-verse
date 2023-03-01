import styled from 'styled-components';
import { StyleSheet } from 'react-native';
import theme from '../../../src/styles/eva-styled-system.json';

export const _style = StyleSheet.create({
  p1: {
    fontSize: 14,
    marginTop: 24,
    marginBottom: 20,
  },
  p2: {
    fontSize: 14,
    marginBottom: 20,
    color: theme['color-primary-500'],
  },
  p3: {
    fontSize: 14,
    color: theme['color-primary-500'],
  },
});

export const Container = styled.div`
  display: flex;
  align-self: center;
  margin: 0 auto;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 46%;
  height: 100%;
  padding-top: 3%;
`;

export const SVG = styled.div`
  width: 200px;
  height: 200px;
`;

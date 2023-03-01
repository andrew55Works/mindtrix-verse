import React from 'react';
import { IndexPath } from '@ui-kitten/components/devsupport';
import { StyleSheet } from 'react-native';
import * as UIKitten from '@ui-kitten/components';
import { EpisodeSelectItem } from '../../../api/types/episode.types';

const styles = StyleSheet.create({
  container: {
    minHeight: 128,
    width: 150,
  },
  selectItem: {
    left: 0,
  },
});

interface Props extends UIKitten.SelectProps {
  items: Array<EpisodeSelectItem>;
  onSelect: (index: IndexPath | Array<IndexPath>) => void;
  selectedIndex: IndexPath | Array<IndexPath> | undefined;
}

export const Select = ({
  placeholder = '',
  items = [],
  onSelect,
  selectedIndex,
  value,
  ...props
}: Props) => {
  const displayValue = value
    ? value
    : selectedIndex
    ? items[Number(selectedIndex) - 1]?.name ?? ''
    : undefined;
  return (
    <UIKitten.Layout style={styles.container} level='1' {...props}>
      <UIKitten.Select
        selectedIndex={selectedIndex}
        placeholder={placeholder}
        value={displayValue}
        onSelect={onSelect}
      >
        {items.map((selectItem, index) => (
          <UIKitten.SelectItem key={index} title={selectItem?.name ?? ''} />
        ))}
      </UIKitten.Select>
    </UIKitten.Layout>
  );
};

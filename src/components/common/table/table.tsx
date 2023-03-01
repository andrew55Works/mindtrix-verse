import React, { CSSProperties } from 'react';
import { StyleSheet, View } from 'react-native';
import { Column, useFilters, useSortBy, useTable } from 'react-table';
import theme from '../../../styles/eva-styled-system.json';
import ArrowUpSvg from '../../../assets/icons/icon_arrow_up.svg';
import ArrowDownSvg from '../../../assets/icons/icon_arrow_down.svg';
import { RowTableProps } from './row-table/row-table';
import { RowTableContainer } from './row-table/row-table.container';
import {
  colors,
  statusColorSystemHex,
} from '../../../styles/styled-system/color.theme';
import * as S from './row-table/row-table.styles';
import { TableContainer } from './table.styles';

const ArrowUpIcon = () => (
  <div style={{ height: 11, width: 'auto', paddingLeft: 8, paddingBottom: 6 }}>
    <ArrowUpSvg />
  </div>
);

const ArrowDownIcon = () => (
  <div style={{ height: 11, width: 'auto', paddingLeft: 8, paddingBottom: 6 }}>
    <ArrowDownSvg />
  </div>
);

export enum TableEnum {
  HOME_EPISODE = 'HOME_EPISODE',
  ESSENCE_DETAIL = 'ESSENCE_DETAIL',
}

export interface TableProps extends Pick<RowTableProps, 'onClickProps'> {
  columns: ReadonlyArray<Column>;
  data: Array<any>;
  tableEnum: TableEnum;
}

export const Table = ({
  data,
  columns,
  onClickProps,
  tableEnum,
}: TableProps) => {
  const { getTableProps, headerGroups, rows, prepareRow } = useTable(
    { columns, data },
    useFilters,
    useSortBy,
  );

  const styles = StyleSheet.create({
    table: {
      alignItems: 'flex-start',
      overflowX: 'scroll',
      maxWidth: '1063px',
    },
    tHead: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      width: '1063px',
      justifyContent: 'flex-start',
      backgroundColor: statusColorSystemHex.primary,
      marginTop: 12,
    },
    tBody: {
      alignItems: 'center',
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      width: '100%',
      justifyContent: 'center',
    },
    thContainer: {
      display: 'flex',
      width: '100%',
      flexDirection: 'row',
      zIndex: -1,
    },
    th: {
      alignItems: 'center',
      justifyContent: 'flex-start',
      flexWrap: 'wrap',
      color: theme['text-secondary-color'],
      flex: 1,
      flexDirection: 'row',
      paddingHorizontal: 5,
      fontFamily: 'Roboto-Regular',
      fontWeight: 'bold',
      minHeight: 44,
    },
    thOptions: {
      alignItems: 'center',
      justifyContent: 'flex-start',
      color: theme['text-secondary-color'],
      flex: 1,
      maxWidth: '40px',
      minWidth: '5px',
      flexDirection: 'row',
      paddingHorizontal: 10,
      fontFamily: 'Roboto-Regular',
      fontWeight: 'bold',
      minHeight: 44,
    },
    tdContainer: {
      flex: 1,
      width: '100%',
      flexDirection: 'row',
    },
    td: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: theme['color-primary-400'],
      fontFamily: 'Roboto-Regular',
      paddingLeft: '10px',
      minHeight: '44px',
      flex: 1,
      backgroundColor: colors.primary[1],
    },
    tdOptions: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: theme['color-primary-400'],
      fontFamily: 'Roboto-Regular',
      paddingLeft: '10px',
      minHeight: '44px',
      maxWidth: '40px',
      width: '100%',
      minWidth: '5px',
      backgroundColor: colors.primary[1],
    },
  });

  return (
    <TableContainer {...getTableProps()}>
      <View style={styles.tHead}>
        {headerGroups.map((headerGroup, index: number) => (
          <View key={index} style={styles.thContainer}>
            {headerGroup.headers.map((column, thIndex: number) => {
              const columnId = column.id;
              const isOrder = columnId === 'col1_order';
              const isShowOption = column?.filteredRows?.some(
                (c) => c?.values?.options?.isShow ?? false,
              );
              const isOptionColumn = columnId === 'options' && isShowOption;
              const isCreationName = columnId === 'creation_name';
              const isDonationMessage = columnId === 'col5_donation_message';
              const isCreatedDate = columnId === 'col1_created_date';
              const isEpisodeName = columnId === 'col4_episode_name';
              const flex = isCreationName
                ? 4
                : isEpisodeName || isDonationMessage
                ? 3
                : isCreatedDate
                ? 1.2
                : 1;

              return (
                <S.HeaderRowTableStyle
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  key={thIndex}
                  maxWidth={
                    isOptionColumn ? '80px' : isOrder ? '80px' : 'inherit'
                  }
                  flex={flex}
                  paddingRight={isOptionColumn ? '10px' : 'inherit'}
                >
                  {column.render('Header')}
                  <span>
                    {isOptionColumn ? null : column.isSortedDesc ? (
                      <ArrowDownIcon />
                    ) : (
                      <ArrowUpIcon />
                    )}
                  </span>
                </S.HeaderRowTableStyle>
              );
            })}
          </View>
        ))}
      </View>
      <RowTableContainer
        onClickProps={onClickProps}
        prepareRow={prepareRow}
        rows={rows}
        tableEnum={tableEnum}
      />
    </TableContainer>
  );
};

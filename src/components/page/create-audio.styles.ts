import { StyleSheet } from 'react-native';
import { CSSProperties } from 'react';

export const styles: { [key: string]: CSSProperties } = {
  episodeOptionGrid: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    marginBottom: '10px',
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  cardInnerRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: '8px',
    marginBottom: '8px',
    flexWrap: 'wrap',
  },
  cardInnerColumn: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
  },
  segmentQuantityInput: {
    marginLeft: '16px',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '980px',
    minWidth: '200px',
    width: '100%',
  },
  descriptionGroup: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '40px',
  },
  buttonGroup: {
    display: 'flex',
    alignSelf: 'flex-start',
    flexDirection: 'row',
    marginTop: '20px',
  },
  subGroup: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
  },
  subGroupTitle: {
    fontWeight: 600,
    marginTop: '16px',
    marginBottom: '16px',
  },
  formContainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  formRowContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    width: '100%',
    marginTop: '12px',
    marginBottom: '12px',
  },
};

export const rnStyles = StyleSheet.create({
  selector: {
    flex: 1,
    marginTop: '4px',
    marginBottom: '4px',
    minWidth: '201px',
  },
});

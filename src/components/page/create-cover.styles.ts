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
    maxWidth: '980px',
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
  input: {
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
  h1Group: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subGroup: {
    width: '100%',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  formTitle: {
    fontWeight: 'bold',
    paddingTop: '8px',
    paddingBottom: '8px',
    marginRight: '20px',
    width: '180px',
  },
  cardFormTitle: {
    fontWeight: 'bold',
    paddingTop: '8px',
    paddingBottom: '8px',
    marginRight: '20px',
    width: '120px',
  },
  inputFull: {
    flex: 1,
  },
  formRowContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    width: '100%',
    marginTop: '12px',
    marginBottom: '12px',
  },
  tableHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    padding: 10,
    marginTop: '12px',
    marginBottom: '12px',
    backgroundColor: '#7986CB',
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

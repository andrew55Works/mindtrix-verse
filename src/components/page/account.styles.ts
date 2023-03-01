import theme from '../../styles/eva-styled-system.json';
import {CSSProperties} from 'react';

export const styles: { [key: string]: CSSProperties } = {
  container: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '980px',
  },
  text: {
    color: theme['text-black-color'],
  },
  verificationCard: {
    width: 732,
    cursor: 'normal',
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: 732,
    cursor: 'normal',
  },
  accountCardContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 600,
  },
  profileContainer: {
    marginBottom: 75,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    alignSelf: 'center',
    width: '100%',
  },
  termOfServiceContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputHint: {
    paddingLeft: 16,
    marginBottom: 16,
  },
  userAvatar: {
    width: 120,
    height: 120,
    margin: 12,
  },
  verificationSubGroup: {
    alignSelf: 'flex-start',
    width: '100%',
    marginBottom: 40,
  },
  subGroup: {
    alignSelf: 'flex-start',
    width: '100%',
    marginBottom: 16,
  },
  subGroupTitle: {
    fontWeight: 600,
    marginBottom: 16,
  },
  accountFormTitle: {
    width: 170,
  },
  accountInput: {
    marginTop: 0,
    marginBottom: 4,
  },
  sendVerificationEmailRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: '100%',
  },
  inputRow: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  inputColumn: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: 16,
    flex: 1,
  },
  invitationCodeInput: {
    marginTop: '4px',
    marginBottom: '4px',
  },
  rssInput: {
    marginTop: '4px',
    marginBottom: '4px',
    marginRight: 16,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  salesOverviewRow: {
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 12,
  },
  salesOverviewColumn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  socialPlatformIcon: {
    margin: 12,
    width: 36,
    height: 36,
  },
  walletInput: {
    marginTop: 0,
    marginBottom: 4,
  },
  button: {
    marginLeft: 0,
    marginTop: 0,
    height: 46,
  },
};

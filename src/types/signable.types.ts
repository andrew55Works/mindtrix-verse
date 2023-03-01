export interface Roles {
  authorizer: boolean;
  param: boolean;
  payer: boolean;
  proposer: boolean;
}

export interface Arg {
  type: string;
  value: string;
}

export interface Data {}

export interface Assigns {}

export interface Role {
  authorizer: true;
  param: false;
  payer: true;
  proposer: false;
}

interface Signature {
  keyId: number;
  sequenceNumber: string;
  signature: string;
}

export interface Account {
  addr: string;
  keyId: number;
  kind: string;
  resolve?: any;
  role: Role;
  sequenceNum: number;
  signature: Signature;
  tempId: string;
}

export interface Accounts {
  [address: string]: Account;
}

export interface Params {}

export interface AsArgument {
  type: string;
  value: string;
}

export interface Xform {
  label: string;
}

export interface Qyrbpq98bk {
  asArgument: AsArgument;
  kind: string;
  tempId: string;
  value: number;
  xform: Xform;
}

export interface Arguments {
  qyrbpq98bk: Qyrbpq98bk;
}

export interface Message {
  arguments: Array<string>;
  authorizations: Array<any>;
  cadence: string;
  computeLimit: number;
  params: Array<any>;
  payer?: any;
  proposer?: any;
  refBlock: string;
}

export interface Events {
  blockIds: Array<any>;
  end?: any;
  eventType?: any;
  start?: any;
}

export interface Transaction {
  id?: any;
}

export interface Block {
  height?: any;
  id?: any;
  isSealed?: any;
}

export interface Account {
  addr: string | null | undefined;
}

export interface Collection {
  id?: any;
}

export interface Interaction {
  account: Account;
  accounts: Accounts;
  arguments: Arguments;
  assigns: Assigns;
  authorizations: Array<string>;
  block: Block;
  collection: Collection;
  events: Events;
  message: Message;
  params: Params;
  payer: Array<string>;
  proposer: string;
  reason?: any;
  status: string;
  tag: string;
  transaction: Transaction;
}

export interface Argument {
  type: string;
  value: string;
}

export interface ProposalKey {
  address: string;
  keyId: number;
  sequenceNum: number;
}

export interface EnvelopeSig {
  address: string;
  keyId: number;
  sig?: any;
}

export interface Voucher {
  arguments: Array<Argument>;
  authorizers: Array<string>;
  cadence: string;
  computeLimit: number;
  envelopeSigs: Array<EnvelopeSig>;
  payer: string;
  payloadSigs: Array<any>;
  proposalKey: ProposalKey;
  refBlock: string;
}

export interface AuthorizationObject {
  addr: string;
  email?: string;
  keyId: number;
  role: Role;
  sequenceNum: number;
  signingFunction: any;
  tempId: string;
}

export interface Signable {
  addr: string;
  args: Array<Arg>;
  cadence: string;
  data: Data;
  f_type: string;
  f_vsn: string;
  interaction: Interaction;
  keyId: number;
  message: string;
  roles: Roles;
  voucher: Voucher;
}

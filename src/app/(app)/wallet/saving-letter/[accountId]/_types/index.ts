export type Transaction = {
  transactionId: number;
  date: string;
  amount: number;
  balance: number;
  message: string;
  senderName: string;
  senderId: number;
};

export type Sender = {
  senderId: number;
  senderName: string;
};

export type TerminatedDetailData = {
  productName: string;
  accountNumber: string;
  transactions: Transaction[];
  senders: Sender[];
  isLast: boolean;
};

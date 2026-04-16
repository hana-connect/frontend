export type RelayHistoryItem = {
  letterId: number;
  date: string;
  amount: number;
  message: string;
};

export type RelayData = {
  productNickname: string;
  accountNumber: string;
  history: RelayHistoryItem[];
};

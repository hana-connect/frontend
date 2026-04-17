/**
 * GET /api/transfer/savings/relay/recent
 * 최근 메시지 내역 조회
 */
export type RecentRelayMessage = {
  letterId: number;
  amount: number;
  message: string;
  date: string;
};

export type RecentRelayMessagesResponse = {
  history: RecentRelayMessage[];
};

/**
 * GET /api/transfer/recent
 * 최근 송금 금액 조회
 * 실제 응답 DTO 확인 후 수정 가능
 */
export type RecentTransfer = {
  transferId: number;
  amount: number;
  date: string;
};

export type RecentTransfersResponse = {
  transactionDate: string;
  amount: number;
};

/**
 * POST /api/transfer/savings
 * 적금 송금 실행 요청
 */
export type SavingTransferRequest = {
  targetAccountId: number;
  amount: number;
  password: string;
  content: string;
};

/**
 * POST /api/transfer/savings
 * 적금 송금 실행 응답
 */
export type SavingTransferResponse = {
  transactionMoney: number;
  transactionBalance: number;
  message: string;
  toAccountNumber: string;
};

/**
 * GET /api/transfer/prepare
 * 송금 준비 조회
 */
export type TransferPrepareResponse = {
  accountId: number;
  targetMemberName: string;
  phoneSavedName: string;
  displayName: string;
  accountAlias: string;
  balance: number;
  currentSaving: number;
  savingLimit: number;
};

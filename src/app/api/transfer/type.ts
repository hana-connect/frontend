// 송금 준비 조회 API 응답 타입
export type TransferPrepareResponse = {
  accountId: number;
  targetMemberName: string;
  phoneSavedName: string;
  displayName: string;
  accountAlias: string;
  balance: number;
};

// 송금 실행
export type TransferExecuteRequest = {
  accountId: number;
  amount: number;
  password: string;
};

export type TransferExecuteResponse = {
  transferId: number;
  toAccountId: number;
  toAccountNumber: string;
  amount: number;
  transferredAt: string;
};

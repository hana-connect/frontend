export type SubscriptionPaymentInfoResponse = {
  subscriptionId: number;
  accountNumber: string;
  hasPaidThisMonth: boolean;
  alreadyPaidAmount: number;
  displayName: string;
  accountNickname: string;
  balance: number;
  rewardAccountName: string | null;
};

export type SubscriptionPaymentExecuteRequest = {
  amount: number;
  prepaymentCount: number | null;
  password: string;
  transferExcessToReward: boolean | null;
};

export type SubscriptionPaymentExecuteResponse = {
  subscriptionId: number;
  subscriptionAccountNumber: string;
  subscriptionAmount: number;
  rewardAccountNumber: string | null;
  rewardAmount: number;
  prepaymentCount: number | null;
  paidAt: string;
};

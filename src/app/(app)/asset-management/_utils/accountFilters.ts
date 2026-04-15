//  1. 입출금 계좌인지 확인 (용돈을 줄 수 있는 계좌인지)
// export const canUseForAllowance = (account: Account) => {
//   return account.account_type === "입출금";
// };

//  2. 적금/청약 계좌인지 확인 (함부로 건드리면 안 되는 돈인지)
// export const isLongTermSaving = (account: Account) => {
//   return account.account_type === "적금" || account.account_type === "청약";
// };


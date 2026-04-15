export type RelayResponse = {
  productName: string;
  accountNumber: string;
  history: {
    id: number;
    date: string;
    amount: number;
    message: string;
  }[];
};

export const MOCK_RELAY_DATA: RelayResponse = {
  productName: "내가 채현이 적금 저장한 이름",
  accountNumber: "100-2223-444",
  history: [
    {
      id: 1,
      date: "20260414",
      amount: 10000000,
      message: "우리 별돌이 사랑해",
    },
    { id: 2, date: "20260325", amount: 1000000, message: "이번 달도 고생했다" },
    { id: 3, date: "20260228", amount: 200000, message: "맛있는 거 사먹으렴" },
    { id: 4, date: "20260120", amount: 200000, message: "새해 복 많이 받아라" },
    { id: 5, date: "20251225", amount: 200000, message: "메리 크리스마스!" },
    { id: 6, date: "20251130", amount: 200000, message: "추운 날 감기 조심해" },
    { id: 7, date: "20251015", amount: 200000, message: "우리 손주가 최고야" },
    { id: 8, date: "20250928", amount: 200000, message: "추석 용돈 보낸다" },
    { id: 9, date: "20250810", amount: 200000, message: "여름 휴가 잘 다녀와" },
    { id: 10, date: "20250720", amount: 200000, message: "무더위 잘 이겨내자" },
    { id: 11, date: "20250615", amount: 200000, message: "항상 응원하고 있어" },
    { id: 12, date: "20250505", amount: 200000, message: "어린이날 축하한다" },
    { id: 13, date: "20250430", amount: 200000, message: "봄 나들이 가자꾸나" },
    { id: 14, date: "20250312", amount: 200000, message: "입학 축하 선물이야" },
    {
      id: 15,
      date: "20250220",
      amount: 200000,
      message: "졸업 축하해 우리 강아지",
    },
    { id: 16, date: "20250105", amount: 200000, message: "올해도 건강하게만" },
    {
      id: 17,
      date: "20241224",
      amount: 200000,
      message: "산타 할아버지가 왔다",
    },
    { id: 18, date: "20241118", amount: 200000, message: "귤 사먹으렴" },
    { id: 19, date: "20241010", amount: 200000, message: "가을 하늘이 예쁘네" },
    {
      id: 20,
      date: "20240922",
      amount: 200000,
      message: "보름달처럼 밝게 자라",
    },
    { id: 21, date: "20240830", amount: 200000, message: "아이스크림 사먹어" },
    { id: 22, date: "20240715", amount: 200000, message: "물놀이 조심하렴" },
    { id: 23, date: "20240608", amount: 200000, message: "파이팅 우리 별돌이" },
    {
      id: 24,
      date: "20240520",
      amount: 200000,
      message: "꽃보다 예쁜 우리 손주",
    },
    { id: 25, date: "20240411", amount: 200000, message: "생일 미리 축하해" },
    { id: 26, date: "20240325", amount: 200000, message: "쑥쑥 자라라" },
    {
      id: 27,
      date: "20240214",
      amount: 200000,
      message: "사랑 듬뿍 담아 보낸다",
    },
    { id: 28, date: "20240125", amount: 200000, message: "청약 통장 첫 시작!" },
    { id: 29, date: "20231220", amount: 150000, message: "겨울 방학 잘 보내" },
    { id: 30, date: "20231110", amount: 150000, message: "따뜻하게 입고 다녀" },
    {
      id: 31,
      date: "20231005",
      amount: 150000,
      message: "하늘만큼 땅만큼 사랑해",
    },
    {
      id: 32,
      date: "20230915",
      amount: 150000,
      message: "할머니가 용돈 보낸다",
    },
    { id: 33, date: "20230820", amount: 150000, message: "수박 사먹으렴" },
    { id: 34, date: "20230712", amount: 150000, message: "장마 조심해라" },
    { id: 35, date: "20230630", amount: 150000, message: "벌써 반년이 지났네" },
    {
      id: 36,
      date: "20230515",
      amount: 150000,
      message: "사랑하는 우리 별돌이",
    },
    { id: 37, date: "20230405", amount: 150000, message: "나무처럼 씩씩하게" },
    { id: 38, date: "20230320", amount: 150000, message: "새 학기 파이팅" },
    { id: 39, date: "20230210", amount: 150000, message: "눈사람 만들었니?" },
    { id: 40, date: "20230115", amount: 150000, message: "떡국 맛있게 먹으렴" },
  ],
};

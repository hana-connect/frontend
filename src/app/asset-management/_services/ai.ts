import type { AssetData } from "../_types/asset";

export const aiService = {
  // 자산 데이터를 바탕으로 최적의 용돈 비율을 추천받음
  async getRecommendedRatio(data: AssetData): Promise<number> {
    // 실제로는 AI 모델 API 호출 (예: OpenAI, Gemini 등)
    console.log("AI 분석 중...", data.total);
    return 10; // 추천 비율 10% 반환
  },
};

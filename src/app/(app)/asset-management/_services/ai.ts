import type { AssetData } from "../_types/asset";

export const aiService = {
  async getRecommendedRatio(data: AssetData): Promise<number> {
    // 실제로는 AI 모델 API 호출 (예: OpenAI, Gemini 등)
    console.log("AI 분석 중...", data.total);
    return 10;
  },
};

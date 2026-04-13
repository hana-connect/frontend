export type Season = "spring" | "summer" | "fall" | "winter";

export interface AssetItem {
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export const ASSET_POSITIONS: Record<string, Omit<AssetItem, "name">> = {
  ic_house_season: { x: 0, y: 0, width: 300, height: 300 },
  ic_house_2: { x: 0, y: 0, width: 300, height: 300 },
  ic_house_3: { x: 0, y: 0, width: 300, height: 300 },
  ic_house_4: { x: 0, y: 0, width: 300, height: 300 },
  ic_house_5: { x: 0, y: 0, width: 300, height: 300 },
  ic_house_6: { x: 0, y: 0, width: 300, height: 300 },
  ic_house_7: { x: 0, y: 0, width: 300, height: 300 },
  ic_house_8: { x: 0, y: 0, width: 300, height: 300 },
  ic_house_9: { x: 0, y: 0, width: 300, height: 300 },
  ic_house_10: { x: 0, y: 0, width: 300, height: 300 },
  ic_house_11: { x: 10, y: 50, width: 80, height: 80 }, // 연못
  ic_house_12: { x: -20, y: 30, width: 60, height: 120 }, // 가로등
  ic_house_13: { x: 20, y: 60, width: 90, height: 60 }, // 벤치
  ic_house_14: { x: 0, y: 0, width: 300, height: 300 },
  ic_house_15: { x: 0, y: 0, width: 300, height: 300 },
};

export const BASE_ASSETS: Record<number, string[]> = {
  0: [],
  1: ["ic_house_season"],
  2: ["ic_house_season", "ic_house_2"],
  3: ["ic_house_season", "ic_house_3"],
  4: ["ic_house_season", "ic_house_4"],
  5: ["ic_house_season", "ic_house_5"],
  6: ["ic_house_season", "ic_house_6"],
  7: ["ic_house_season", "ic_house_7"],
  8: ["ic_house_season", "ic_house_8"],
  9: ["ic_house_season", "ic_house_9"],
  10: ["ic_house_season", "ic_house_10"],
  11: ["ic_house_season", "ic_house_10", "ic_house_11"],
  12: ["ic_house_season", "ic_house_10", "ic_house_11", "ic_house_12"],
  13: [
    "ic_house_season",
    "ic_house_10",
    "ic_house_11",
    "ic_house_12",
    "ic_house_13",
  ],
  14: [
    "ic_house_season",
    "ic_house_11",
    "ic_house_12",
    "ic_house_13",
    "ic_house_14",
  ],
  15: [
    "ic_house_season",
    "ic_house_11",
    "ic_house_12",
    "ic_house_13",
    "ic_house_15",
  ],
};

export const SEASONAL_ASSETS = new Set(["ic_house_11"]);

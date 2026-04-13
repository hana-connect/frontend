export type Season = "spring" | "summer" | "fall" | "winter";

export interface AssetItem {
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export const SEASON_GROUND: Record<Season, string> = {
  spring: "ic_house_spring",
  summer: "ic_house_summer",
  fall: "ic_house_fall",
  winter: "ic_house_winter",
};

const HOUSE_POSITION = { x: 104, y: -60, width: 157, height: 300 };

export const ASSET_POSITIONS: Record<string, Omit<AssetItem, "name">> = {
  ic_house_2: HOUSE_POSITION,
  ic_house_3: HOUSE_POSITION,
  ic_house_4: HOUSE_POSITION,
  ic_house_5: HOUSE_POSITION,
  ic_house_6: HOUSE_POSITION,
  ic_house_7: HOUSE_POSITION,
  ic_house_8: HOUSE_POSITION,
  ic_house_9: HOUSE_POSITION,
  ic_house_10: HOUSE_POSITION,
  ic_house_11: { x: 152, y: 155, width: 80, height: 80 }, // 연못
  ic_house_12: { x: 250, y: 70, width: 30, height: 80 }, // 가로등
  ic_house_13: { x: 190, y: 120, width: 90, height: 60 }, // 벤치
  ic_house_14: HOUSE_POSITION,
  ic_house_15: HOUSE_POSITION,
};

export const SEASONAL_ASSETS = new Set(["ic_house_11"]);

export const BASE_ASSETS: Record<number, string[]> = {
  0: [],
  1: [],
  2: ["ic_house_2"],
  3: ["ic_house_3"],
  4: ["ic_house_4"],
  5: ["ic_house_5"],
  6: ["ic_house_6"],
  7: ["ic_house_7"],
  8: ["ic_house_8"],
  9: ["ic_house_9"],
  10: ["ic_house_10"],
  11: ["ic_house_10", "ic_house_11"],
  12: ["ic_house_10", "ic_house_11", "ic_house_12"],
  13: ["ic_house_10", "ic_house_11", "ic_house_12", "ic_house_13"],
  14: ["ic_house_14", "ic_house_11", "ic_house_12", "ic_house_13"],
  15: ["ic_house_15", "ic_house_11", "ic_house_12", "ic_house_13"],
};

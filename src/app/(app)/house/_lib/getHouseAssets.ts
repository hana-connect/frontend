import {
  ASSET_POSITIONS,
  type AssetItem,
  BASE_ASSETS,
  SEASON_GROUND,
  SEASONAL_ASSETS,
  type Season,
} from "../_constants/level";

export interface HouseAssets {
  ground: string;
  objects: AssetItem[];
}

export function getHouseAssets(level: number, season: Season): HouseAssets {
  const ground = SEASON_GROUND[season];

  const objects = (BASE_ASSETS[level] ?? []).map((name) => {
    const resolvedName =
      SEASONAL_ASSETS.has(name) && season === "winter"
        ? `${name}_winter`
        : name;

    const position = ASSET_POSITIONS[name];
    return { name: resolvedName, ...position };
  });

  return { ground, objects };
}

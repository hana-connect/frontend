import {
  ASSET_POSITIONS,
  type AssetItem,
  BASE_ASSETS,
  SEASONAL_ASSETS,
  type Season,
} from "../_constants/level";

export function getHouseAssets(level: number, season: Season): AssetItem[] {
  const assets = BASE_ASSETS[level] ?? [];
  return assets.map((name) => {
    let resolvedName = name;

    if (name === "ic_house_season") {
      resolvedName = `ic_house_${season}`;
    } else if (SEASONAL_ASSETS.has(name) && season === "winter") {
      resolvedName = `${name}_winter`;
    }

    const position = ASSET_POSITIONS[name];
    return { name: resolvedName, ...position };
  });
}

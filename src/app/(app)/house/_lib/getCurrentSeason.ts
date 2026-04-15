import type { Season } from "../_constants/level";

export const getSeasonFromDate = (date: Date): Season => {
  const month = date.getMonth() + 1;

  if (month >= 3 && month <= 5) return "spring";
  if (month >= 6 && month <= 8) return "summer";
  if (month >= 9 && month <= 11) return "fall";
  return "winter";
};

export const getCurrentSeason = (paidAt?: string): Season => {
  if (paidAt) {
    const parsedDate = new Date(paidAt);

    if (!Number.isNaN(parsedDate.getTime())) {
      return getSeasonFromDate(parsedDate);
    }
  }

  return getSeasonFromDate(new Date());
};

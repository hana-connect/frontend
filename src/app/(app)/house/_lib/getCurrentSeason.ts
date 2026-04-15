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
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(paidAt);

    if (match) {
      const [, year, month, day] = match;
      return getSeasonFromDate(
        new Date(Number(year), Number(month) - 1, Number(day)),
      );
    }
  }

  return getSeasonFromDate(new Date());
};

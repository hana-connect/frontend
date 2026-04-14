const springBaseUrl = process.env.SPRING_BASE_URL;

if (!springBaseUrl) {
  throw new Error("SPRING_BASE_URL is not configured");
}

export const SPRING_BASE_URL = springBaseUrl;
export const DEFAULT_TIMEOUT_MS = 5000;

import type { Intermediary } from "../../lib/api/models";
import { randomId } from "../../lib/other/random";

const PRODUCT_KEY = "products";

// Fake api
// TODOExtract all side effects like create id and other processing data
// In general best way to mock api is create interceptors
export const api = {
  getRange: (): Promise<string[]> => {
    return Promise.resolve(["Range", "Dropdown"]);
  },
  createIntermediary: (intermediary: Intermediary) => {
    const intermediaries = localStorage.getItem(PRODUCT_KEY);

    if (intermediaries) {
      localStorage.setItem(
        PRODUCT_KEY,
        JSON.stringify([
          ...JSON.parse(intermediaries),
          { id: randomId(), ...intermediary, createdAt: new Date().toISOString().toString() },
        ])
      );
    } else {
      localStorage.setItem(PRODUCT_KEY, JSON.stringify([{ id: randomId(), ...intermediary }]));
    }
  },
};

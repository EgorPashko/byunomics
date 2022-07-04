import { sleep } from "lib/other/sleep";
import { remove } from "lodash";

import type { Intermediary } from "../../lib/api/models";
import { randomId } from "../../lib/other/random";

const INTERMEDIARIES_KEY = "intermediaries";

// Fake api
// TODOExtract all side effects like create id and other processing data
// In general best way to mock api is create interceptors
export const api = {
  getIntermediaries: async (): Promise<Intermediary[]> => {
    // imitate real BE
    await sleep(500);
    const intermediaries = localStorage.getItem("intermediaries");

    return intermediaries ? JSON.parse(intermediaries) : [];
  },
  getIntermediary: async (id: string): Promise<Intermediary | undefined> => {
    // imitate real BE
    await sleep(500);
    const intermediaries = JSON.parse(localStorage.getItem(INTERMEDIARIES_KEY) || "[]") as Intermediary[];

    return Promise.resolve(intermediaries.find((x) => x.id === id));
  },
  removeIntermediary: async (id: string): Promise<undefined> => {
    // imitate real BE
    await sleep(500);
    const intermediaries = JSON.parse(localStorage.getItem(INTERMEDIARIES_KEY) || "[]") as Intermediary[];

    remove(intermediaries, (intermediary) => intermediary.id === id);
    localStorage.setItem(INTERMEDIARIES_KEY, JSON.stringify(intermediaries));

    return Promise.resolve(undefined);
  },
  getRange: async (): Promise<string[]> => {
    // imitate real BE
    await sleep(200);

    return Promise.resolve(["Range", "Dropdown"]);
  },
  updateIntermediary: async (intermediary: Intermediary) => {
    // imitate real BE
    await sleep(500);
    const intermediaries = JSON.parse(localStorage.getItem(INTERMEDIARIES_KEY) || "[]") as Intermediary[];

    const index = intermediaries.findIndex((x) => x.id === intermediary.id);

    intermediaries.splice(index, 1, intermediary);
    localStorage.setItem(INTERMEDIARIES_KEY, JSON.stringify(intermediaries));
  },
  createIntermediary: async (intermediary: Intermediary) => {
    // imitate real BE
    await sleep(500);
    const intermediaries = localStorage.getItem(INTERMEDIARIES_KEY);

    // TODO Get rid of duplication of code
    if (intermediaries) {
      localStorage.setItem(
        INTERMEDIARIES_KEY,
        JSON.stringify([
          ...JSON.parse(intermediaries),
          { id: randomId(), ...intermediary, createdAt: new Date().toISOString().toString() },
        ])
      );
    } else {
      localStorage.setItem(
        INTERMEDIARIES_KEY,
        JSON.stringify([{ id: randomId(), ...intermediary, createdAt: new Date().toISOString().toString() }])
      );
    }
  },
};

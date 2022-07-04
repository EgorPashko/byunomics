export const seconds = (minutes: number) => minutes * 1000;
export const minutes = (n: number) => n * seconds(60);
export const hours = (n: number) => n * minutes(60);

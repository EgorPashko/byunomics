import { merge } from "lodash";
import type { RegisterOptions } from "react-hook-form/dist/types/validator";

export const createValidation = <T>(validation: FormValidation<T>): FormValidation<T> => merge({}, validation);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FormValidation<T extends Record<string, any>> = Partial<Record<keyof T, RegisterOptions>>;

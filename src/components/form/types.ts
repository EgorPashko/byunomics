import type { Control, FieldPath, FieldValues, FormState, UseFormSetValue } from "react-hook-form";
import type { RegisterOptions } from "react-hook-form/dist/types/validator";

export type { FieldValues } from "react-hook-form";

export type TRules = Omit<RegisterOptions, "valueAsNumber" | "valueAsDate" | "setValueAs">;

export type BaseControlProps<TFieldValues extends FieldValues = FieldValues> = {
  control?: Control<TFieldValues>;
  rules?: TRules;
  name?: string;
  formState?: FormState<TFieldValues>;
  setValue?: UseFormSetValue<TFieldValues>;
};

export type ControlProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = BaseControlProps<TFieldValues> & {
  name: TName;
};

export type OptionsAndParams<T> = {
  options: T;
  queryParams?: never;
  dependency?: never;
  dependencyQueryKey?: never;
};

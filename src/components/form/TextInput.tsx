import { Input } from "antd";
import type { ForwardedRef } from "react";
import React, { forwardRef } from "react";
import type { FieldError, FieldPath, FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";
// TODO fix types
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { useTranslation } from "react-i18next";

import FormGroup from "./FormGroup";
import type { ControlProps } from "./types";

export type TextInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  label?: string;
  labelHint?: string;
  className?: string;
  type?: "text" | "password" | "textarea" | "number";
  placeholder?: string;
  suffix?: string;
  disabled?: boolean;
  visible?: boolean;
} & ControlProps<TFieldValues, TName>;

type InputTypeProps = {
  type: Required<TextInputProps>["type"];
  bordered?: boolean;
  label?: string;
} & Pick<TextInputProps, "disabled" | "placeholder">;

export const InputType = forwardRef(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ({ type, ...props }: InputTypeProps, ref: ForwardedRef<any>) =>
    ({
      password: <Input.Password {...props} ref={ref} autoComplete="on" />,
      textarea: <Input.TextArea {...props} ref={ref} autoSize={{ minRows: 4 }} onFocus={(e) => e.target.select()} />,
      text: <Input {...props} ref={ref} />,
      number: <Input autoFocus={false} min="0.5" step="0.5" type="number" {...props} ref={ref} />,
    }[type])
);

const TextInput = ({
  label,
  name,
  type = "text",
  rules,
  control,
  suffix,
  className,
  visible,
  placeholder,
  disabled = false,
  formState,
}: TextInputProps) => {
  const { t: tNS } = useTranslation(["common"]);

  return (
    <FormGroup
      className={className}
      disabled={disabled}
      error={formState?.errors?.[name] as unknown as FieldError}
      label={label || ""}
      name={name}
      required={!!rules?.required}
      rules={rules}
      suffix={suffix}
      visible={visible}
    >
      <Controller
        control={control}
        defaultValue=""
        name={name}
        render={({ field }) => (
          <InputType
            disabled={disabled}
            label={label}
            placeholder={placeholder ?? tNS("common:input.placeholder", { label: label || name })}
            type={type}
            {...field}
          />
        )}
        rules={rules}
      />
    </FormGroup>
  );
};

export default TextInput;

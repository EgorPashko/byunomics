import { Form as AntdForm } from "antd";
import type { ReactNode } from "react";
import { useMemo } from "react";
import type { FieldError } from "react-hook-form";
// TODO fix types
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { useTranslation } from "react-i18next";

import type { TRules } from "./types";

export interface FormGroupProps {
  label: string;
  name: string;
  visible?: boolean;
  disabled?: boolean;
  suffix?: string;
  error?: FieldError;
  className?: string;
  required?: boolean;
  children: ReactNode;
  rules?: TRules;
}

const isRuleType = (v: FieldError["type"]): v is keyof TRules => {
  return !["valueAsNumber", "valueAsDate", "setValueAs"].includes(v);
};

export const FormGroup = ({
  rules,
  children,
  label = "",
  name,
  error,
  className,
  suffix,
  visible,
  required,
}: FormGroupProps) => {
  const { message, type } = error! || {};
  const { t } = useTranslation("validation");

  const errorMessage = useMemo(() => {
    if (message) {
      return message;
    }

    if (isRuleType(type)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return type ? t(type as any, { label, value: rules?.[type] as string }) : undefined;
    }

    return undefined;
  }, [message, type, t, label, rules]);

  return visible === false ? null : (
    <AntdForm.Item
      className={className}
      help={errorMessage}
      htmlFor={`${name}-input`}
      label={label}
      required={required}
      validateStatus={error ? "error" : undefined}
    >
      <div>
        {children} {suffix && <span>{suffix}</span>}
      </div>
    </AntdForm.Item>
  );
};

export default FormGroup;

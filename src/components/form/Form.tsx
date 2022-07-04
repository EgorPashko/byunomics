import { Form as AntdForm } from "antd";
import type { MutableRefObject, ReactNode } from "react";
import { createRef } from "react";
import type { FieldValues, SubmitHandler, UseFormProps, UseFormReturn } from "react-hook-form";
import { useForm, useFormContext } from "react-hook-form";

import type { FormValidation } from "../../lib/other/validation";
import { createElement } from "./utils/elements";

export type FormProps<T extends FieldValues> = {
  layout?: "horizontal" | "vertical" | "inline";
  labelAlign?: "left" | "right";
  defaultValues?: UseFormProps<T>["defaultValues"];
  children: ReactNode;
  columns?: number;
  labelWidth?: number;
  className?: string;
  allFieldsDisabled?: boolean;
  validation?: FormValidation<T>;
  onSubmit?: SubmitHandler<T>;
  formRef?: MutableRefObject<UseFormReturn<T> | null>;
  usePrompt?: boolean;
  autoFocus?: boolean;
  isTest?: boolean;
};

export const Form = <T extends FieldValues>({
  defaultValues,
  children,
  validation,
  layout = "vertical",
  labelAlign = "right",
  onSubmit,
  formRef = createRef<UseFormReturn<T>>(),
  className,
  allFieldsDisabled = false,
  ...props
}: FormProps<T>) => {
  let methods = useForm<T>({ defaultValues });

  const contextMethods = useFormContext<T>();

  if (contextMethods) {
    methods = contextMethods;
  }

  formRef.current = methods;

  return (
    <AntdForm
      className={className}
      colon={false}
      labelAlign={labelAlign}
      layout={layout}
      onSubmitCapture={methods.handleSubmit(onSubmit || (() => {}))}
      {...props}
    >
      {createElement(children, methods, validation || {}, allFieldsDisabled)}
    </AntdForm>
  );
};

export default Form;

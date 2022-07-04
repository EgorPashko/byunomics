/* eslint-disable react/no-unused-prop-types */
import { Select as AntdSelect } from "antd";
import type { RefSelectProps } from "antd/lib/select";
import type { ReactElement } from "react";
import React, { useEffect, useMemo, useRef } from "react";
import type { FieldError, FieldPath } from "react-hook-form";
import { Controller, useWatch } from "react-hook-form";
// TODO fix types
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { useTranslation } from "react-i18next";

import type { Option } from "../BasicSelect";
import FormGroup from "./FormGroup";
import type { ControlProps, FieldValues } from "./types";

const getValue = (value?: string, options?: Option[]) => {
  return options?.find((item) => item.value === value) ? value : undefined;
};

export type FormSelectProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  label: string;
  className?: string;
  options: Array<Option | string>;
  placeholder?: string;
  disabled?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  disableOnChange?: boolean;
  onChange?: (v?: string) => void;
  clearValue?: boolean; // clear value if value doesn't exist in the options
} & ControlProps<TFieldValues, TName>;

const FormSelect = ({
  label,
  name,
  control,
  rules,
  disabled,
  options: optionsData,
  searchable = false,
  clearable = true,
  placeholder,
  className,
  onChange,
  formState,
  disableOnChange,
  setValue,
  clearValue = false,
}: FormSelectProps) => {
  const options = useMemo(
    () => optionsData.map((v) => (typeof v !== "string" ? v : { label: v, value: v })),
    [optionsData]
  );
  const { t: tNS } = useTranslation(["common"]);
  const fieldRef = useRef<RefSelectProps | null>();
  const currentValue = useWatch({ control, name }) as string | undefined;

  useEffect(() => {
    if (clearValue && !options.some((item) => item.value === currentValue)) {
      setValue?.(name, undefined);
    }
  }, [currentValue, name, options, setValue, clearValue]);

  return (
    <FormGroup
      className={className}
      error={formState?.errors?.[name] as unknown as FieldError}
      label={label}
      name={name}
      required={!!rules?.required}
    >
      <Controller
        control={control}
        defaultValue={null}
        name={name}
        render={({ field: { onChange: onChangeSelect, ref, value, ...props } }) => (
          <AntdSelect
            ref={(r) => {
              fieldRef.current = r;
              ref(r);
            }}
            allowClear={clearable}
            // @ts-expect-error it's missing in typings
            autoComplete="dontshow"
            disabled={disabled}
            dropdownRender={(node: ReactElement) => <div>{node}</div>}
            filterOption={(input, option) =>
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              `${option?.label || ""}`.toLowerCase().includes(input.toLowerCase())
            }
            id={`${name}-input`}
            maxTagCount="responsive"
            optionFilterProp="label"
            options={options}
            placeholder={placeholder ?? (tNS("common:select.placeholder", { label }) as string)}
            showSearch={searchable}
            value={getValue(value, options)}
            onChange={(v) => {
              if (!disableOnChange) {
                onChangeSelect(v);
              }
              onChange?.(v as string & string[]); // dunno how to write it right
            }}
            onClear={() => setValue?.(name, undefined)}
            onSelect={() => {
              fieldRef.current?.blur();
            }}
            {...props}
          />
        )}
        rules={rules}
      />
    </FormGroup>
  );
};

export default FormSelect;

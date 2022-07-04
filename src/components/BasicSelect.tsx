/* eslint-disable react/no-unused-prop-types */
import { Select as AntdSelect } from "antd";
import type { RefSelectProps } from "antd/lib/select";
import type { ReactElement } from "react";
import { useEffect, useMemo, useRef } from "react";
// TODO fix types
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { useTranslation } from "react-i18next";

export type Option = {
  value: string;
  label: string;
};
type Props = {
  value?: number | string;
  label?: string;
  className?: string;
  options: Array<Option | string>;
  placeholder?: string;
  disabled?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  allowClear?: boolean;
  required?: boolean;
  disableOnChange?: boolean;
  onChange: (v?: string) => void;
  type?: "white" | "gray" | "black";
  defaultValue?: string | number;
};

export const BasicSelect = ({
  label = "",
  disabled,
  options: optionsData,
  searchable = false,
  placeholder,
  onChange,
  value,
  className,
  allowClear = true,
  required,
}: Props) => {
  const { t: tNS } = useTranslation(["common"]);
  const fieldRef = useRef<RefSelectProps | null>();

  const options = useMemo(
    () => optionsData.map((v) => (typeof v !== "string" ? v : { label: v, value: v })).filter((x) => x),
    [optionsData]
  );

  const selectValue = options?.find((item) => item.value?.toString() === value?.toString())?.label;

  useEffect(() => {
    if (required && !selectValue && options.length > 0) {
      onChange(options[0].value);
    }
  }, [onChange, options, required, selectValue]);

  return (
    <div className={className}>
      {label && <div>{label}</div>}
      <AntdSelect
        ref={(r) => {
          fieldRef.current = r;
        }}
        showArrow
        allowClear={allowClear}
        disabled={disabled}
        dropdownRender={(node: ReactElement) => <div>{node}</div>}
        filterOption={(input, option) =>
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          `${option?.label || ""}`.toLowerCase().includes(input.toLowerCase())
        }
        maxTagCount="responsive"
        optionFilterProp="label"
        options={options}
        placeholder={placeholder ?? (tNS("common:select.placeholder", { label }) as string)}
        showSearch={searchable}
        value={selectValue}
        onChange={(v) => {
          onChange?.(v as string & string[]); // dunno how to write it right
        }}
        onClear={() => onChange()}
        onSelect={() => {
          fieldRef.current?.blur();
        }}
      />
    </div>
  );
};

import type { ReactElement, ReactNode } from "react";
import React from "react";
import type { Control, FieldValues, UseFormReturn } from "react-hook-form";

import type { FormValidation } from "../../lib/other/validation";

const isInput = (el: ReactNode): el is ReactElement<{ name: string }> =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,no-underscore-dangle,@typescript-eslint/no-explicit-any
  !!(el as ReactElement).props?.name || !!(el as any)?.type?.__formItem;

const isElementWithChildren = (el: ReactNode): el is ReactElement<{ children: ReactNode }> =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  !!(el as ReactElement).props?.children;

function createInput<T extends FieldValues>(
  el: ReactElement<{ name: string; disabled?: boolean; control?: Control<T> }>,
  methods: UseFormReturn<T>,
  validation: FormValidation<T>,
  disabled: boolean
) {
  return React.createElement(el.type, {
    ...el.props,
    control: el.props.control ?? methods.control,
    formState: methods.formState,
    setValue: methods.setValue,
    disabled: el.props.disabled || disabled,
    rules: validation[el.props.name] ?? undefined,
    allRules: validation,
    key: el.props.name,
  });
}

export function createElement<T>(
  children: ReactNode,
  methods: UseFormReturn<T>,
  validation: FormValidation<T>,
  disabled: boolean,
  n = 0
): ReactNode {
  return React.Children.map(children, (child) => {
    if (!child) return null;
    if (isInput(child)) {
      return createInput(child, methods, validation, disabled);
    }
    if (isElementWithChildren(child) && n < 3) {
      return React.createElement(
        child.type,
        { ...child.props },
        React.Children.map(
          child.props.children,
          (el) =>
            el &&
            (isInput(el)
              ? createInput(el, methods, validation, disabled)
              : createElement(el, methods, validation, disabled, n + 1))
        )
      );
    }

    return child;
  });
}

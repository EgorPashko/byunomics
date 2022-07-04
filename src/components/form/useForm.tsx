import { isEmpty } from "lodash";
import type { MutableRefObject, ReactNode } from "react";
import { useCallback, useMemo, useRef } from "react";
import type { UseFormReturn } from "react-hook-form";
import { FormProvider as HookFormProvider, useForm as useHookForm } from "react-hook-form";
import type { MutationFunction, UseMutationOptions } from "react-query";
import { useMutation } from "react-query";

import type { ButtonProps } from "../common/Button";
import Button from "../common/Button";
import type { FormProps } from "./Form";
import FormFactory from "./FormFactory";

export default function useForm<TData = unknown, TError = unknown, T = void, TContext = unknown>(
  mutationFn: MutationFunction<TData, T>,
  options?: UseMutationOptions<TData, TError, T, TContext>
) {
  const formRef = useRef<UseFormReturn<T>>() as MutableRefObject<UseFormReturn<T>>;

  const mutation = useMutation(mutationFn, options);

  const onSaveRef = useRef((() => {
    // prevent multiple consecutive clicks on save
    if (!formRef?.current?.formState?.isSubmitting) {
      return formRef?.current?.handleSubmit((data) => mutation.mutateAsync(data as never))();
    }
  }) as () => Promise<void>);

  const onCancel = useCallback(
    (callback?: () => void) => async () => {
      const result = isEmpty(formRef.current?.formState.dirtyFields) && formRef.current?.formState.submitCount === 0;

      if (!result) return false;

      callback?.();

      return true;
    },
    []
  );

  const FormButton = useMemo(
    () => ({
      // noinspection JSUnusedGlobalSymbols
      Cancel: ({ children, onClick, className, ...props }: ButtonProps) => (
        <Button className={className} data-test="btn-cancel" type="default" {...props} onClick={onCancel(onClick)}>
          Cancel
        </Button>
      ),
      Save: ({ children, className, ...props }: Omit<ButtonProps, "onClick">) => (
        <Button className={className} data-test="btn-save" type="primary" onClick={onSaveRef.current} {...props}>
          Save
        </Button>
      ),
    }),
    [onCancel]
  );

  type ModalButtonsProps = { onCancel?: () => void; okText?: string };

  const modalButtons = useCallback(
    ({ onCancel: onClickCancel, okText }: ModalButtonsProps) => (
      <>
        <FormButton.Save>{okText}</FormButton.Save>
        <FormButton.Cancel onClick={onClickCancel} />
      </>
    ),
    [FormButton]
  );

  const formFactory = useMemo(() => new FormFactory<T>({ formRef }), []);

  return useMemo(
    () => ({
      formRef,
      onSave: onSaveRef.current,
      FormButton,
      modalButtons,
      withPrompt: onCancel,
      mutation,
      ...formFactory,
    }),
    [FormButton, modalButtons, onCancel, mutation, formFactory]
  );
}

type FormProviderProps<T> = Required<Pick<FormProps<T>, "defaultValues">> & {
  children?: ReactNode;
};
const FormProvider = <T extends { [K in keyof T]: T[K] }>({ defaultValues, children }: FormProviderProps<T>) => {
  const methods = useHookForm<T>({ defaultValues });

  return <HookFormProvider {...methods}>{children}</HookFormProvider>;
};

export function useSharedForm<TData = unknown, TError = unknown, T = void, TContext = unknown>(
  mutationFn: MutationFunction<TData, T>,
  options?: UseMutationOptions<TData, TError, T, TContext>
) {
  const result = useForm(mutationFn, options);

  return { ...result, FormProvider };
}

export type UseFormResult<T extends { [K in keyof T]: T[K] }> = Pick<
  ReturnType<typeof useForm>,
  "onSave" | "FormButton" | "modalButtons"
> & { formRef: MutableRefObject<UseFormReturn<T>> } & FormFactory<T>;

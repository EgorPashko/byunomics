import type { FieldValues, Path } from "react-hook-form";

import type { FormProps } from "./Form";
import FormComponent from "./Form";
import type { FormSelectProps } from "./FormSelect";
import FormSelect from "./FormSelect";
import type { TextInputProps } from "./TextInput";
import TextInput from "./TextInput";

type TypedName<T extends FieldValues> = { name: Path<T> };

class InputFactory<T extends FieldValues> {
  Text = (props: TextInputProps<T> & TypedName<T>) => <TextInput {...(props as TextInputProps)} />;
}

export type FormFactoryProps<T extends FieldValues> = FormProps<T>;

export default class FormFactory<T extends FieldValues> {
  constructor(private defaultProps?: { formRef?: FormFactoryProps<T>["formRef"] }) {}

  Input = new InputFactory<T>();

  Select = (props: FormSelectProps & TypedName<T>) => <FormSelect {...props} />;

  Form = (props: FormFactoryProps<T>) => <FormComponent {...this.defaultProps} {...props} />;
}

export type IFormFactory<T> = FormFactory<T>;

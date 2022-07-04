import { Button } from "antd";
import type { ControlProps } from "components/Form/types";
import { randomId } from "lib/other/random";
import { useMemo } from "react";
import { useFieldArray, useWatch } from "react-hook-form";
// TODO: Fix types
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";

import { api } from "../components/Form/api";
import type { UseFormResult } from "../components/Form/useForm";
import { useSharedForm } from "../components/Form/useForm";
import type { Intermediary } from "../lib/api/models";
import useRequest from "../lib/hooks/useRequest";
import { createValidation } from "../lib/other/validation";
import { useNavigation } from "../routes/useNavigation";
import styles from "./styles.module.css";

const validation = createValidation<Intermediary>({
  name: {
    required: true,
    maxLength: 255,
  },
  order: {
    required: true,
    validate: (value) => {
      const digitsAfterPoint = value.split(".")?.[1];

      if (digitsAfterPoint?.length > 6) {
        return "Should contains 6 digits after the decimal point";
      }

      return true;
    },
  },
  type: {
    required: true,
  },
  from: {
    required: true,
  },
});

const Type = ({
  control,
  formResult,
  ...props
}: ControlProps<Intermediary> & { formResult: UseFormResult<Intermediary> }) => {
  const types =
    useRequest(["type"], () => api.getRange(), { suspense: true })?.map((x) => ({
      label: x,
      value: x,
    })) || [];

  const type = useWatch<Intermediary>({
    control,
    name: "type",
  });

  const { Select, Input } = formResult;

  const { fields, append } = useFieldArray({
    control,
    name: "pairs",
    keyName: "",
  });

  // Fix types
  return (
    <div>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <Select {...(props as any)} control={control} label="Type" name={"type"} options={types} rules={props.rules} />
      <Input.Text control={control} label="From" name="from" type="number" visible={type === "Range"} />
      <Input.Text control={control} label="To" name="to" type="number" visible={type === "Range"} />
      <Input.Text control={control} label="Step" name="step" type="number" visible={type === "Range"} />
      {type === "Dropdown" &&
        fields.map((x, index) => (
          <div key={`${x}${index}`}>
            <h1>{index + 1}</h1>
            <Input.Text control={control} label="Option" name={`pairs.${index}.option`} visible={type === "Dropdown"} />
            <Input.Text
              control={control}
              label="Value"
              name={`pairs.${index}.value`}
              type="number"
              visible={type === "Dropdown"}
            />
          </div>
        ))}
      {type === "Dropdown" && (
        <div className={styles.buttons}>
          <Button onClick={() => append({ id: randomId() })}>Add new entity</Button>
        </div>
      )}
    </div>
  );
};

const IntermediaryDetailsPage = () => {
  const { goToIntermediaryListing } = useNavigation();
  const { t } = useTranslation("intermediary");
  const { id } = useParams();

  const intermediary =
    useRequest(["intermediary", id], () => (id ? api.getIntermediary(id) : Promise.resolve(undefined)), {
      suspense: true,
    }) || {};
  const formResult = useSharedForm(async (data: Intermediary) => {
    // TODO: remove hardcode
    if (data.type === "Range") {
      data.pairs = [];
    }

    if (data.type === "Dropdown") {
      // Remove all fields related to a type Range
    }

    if (id) {
      api.updateIntermediary(data);
    } else {
      api.createIntermediary(data);
    }
    goToIntermediaryListing();
  });
  const defaultValue = useMemo(() => ({ pairs: [{ id: randomId(), value: "", option: "" }] }), []);

  const { Input, Form, FormButton } = formResult;

  return (
    <div className={styles.layout}>
      <h1>{t("createProduct")}</h1>
      <div className={styles.form}>
        <Form defaultValues={id ? intermediary : defaultValue} validation={validation}>
          <Input.Text label="Name" name="name" />
          <Input.Text label="Cost" name="order" type="number" />
          <Type formResult={formResult} name="type" />
          <div className={styles.buttons}>
            <FormButton.Cancel onClick={goToIntermediaryListing} />
            <FormButton.Save />
          </div>
        </Form>
      </div>
    </div>
  );
};

export default IntermediaryDetailsPage;

/* eslint-disable react/jsx-props-no-spreading */
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import { tx } from "@transifex/native";
import { useLanguages, useT } from "@transifex/react";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";
import { type TypeOf, object, string } from "zod";

import { DISPATCH_ACTIONS } from "../constants";
import useLangContext from "../hooks/useLangContext";
import { Button } from "../stories/button/Button";
import FormSelect, { type FormSelectOption } from "../stories/form-select/FormSelect";
import Title from "../stories/title/Title";

const langSchema = object({
  lang: string(),
});

type LangInput = TypeOf<typeof langSchema>;

function SelectLanguage() {
  const t = useT();
  const languages = useLanguages();
  const langContext = useLangContext();

  const [options, setOptions] = useState<FormSelectOption[]>([]);
  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm<LangInput>({
    resolver: zodResolver(langSchema),
  });

  useEffect(() => {
    if (languages && languages.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const optionsChecked: FormSelectOption[] = languages.map((lang: any) => ({
        label: lang.name,
        value: lang.code,
      }));
      setOptions(optionsChecked);
    }
  }, [languages]);

  const { handleSubmit, setValue } = methods;

  useEffect(() => {
    if (options && options.length > 0 && langContext.state.selected) {
      setValue("lang", langContext.state.selected);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options, setValue]);

  const onSubmitHandler: SubmitHandler<LangInput> = (values) => {
    tx.setCurrentLocale(values.lang);
    langContext.dispatch({ type: DISPATCH_ACTIONS.SET_LANG, payload: values.lang });
    enqueueSnackbar(t("Language changed to: {language}", { language: values.lang }), {
      variant: "success",
    });
  };

  return (
    <>
      <Title type="page" label={t("Configure Language")} className="mb-8" />
      <FormProvider {...methods}>
        <Box component="form" onSubmit={handleSubmit(onSubmitHandler)} noValidate autoComplete="off">
          <FormSelect options={options} name="lang" label={t("Select Language")} />

          <Button className="mb-10" label={t("Save")} type="submit" />
        </Box>
      </FormProvider>
    </>
  );
}

export default SelectLanguage;

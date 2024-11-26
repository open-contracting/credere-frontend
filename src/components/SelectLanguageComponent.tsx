import { MenuItem, Select, Input as _Input } from "@mui/material";
import { styled } from "@mui/material/styles";
import { t as tNative, tx } from "@transifex/native";
import { useLanguages, useT } from "@transifex/react";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";

import { COLORS, DISPATCH_ACTIONS } from "../constants";
import useLangContext from "../hooks/useLangContext";
import type { FormSelectOption } from "../stories/form-select/FormSelect";

export const InputSelectSmall = styled(_Input)`
  background-color: white;
  padding: 6px 9px;
  font-size: 14px;
  border-width: 1px;
  border-style: solid;
  border-color: ${COLORS.fieldBorder};
  border-radius: 4px;
  & input {
    padding-top: 4px;
    padding-bottom: 5px;
  }
`;

const loadingOption: FormSelectOption = {
  label: tNative("Loading..."),
  value: "loading",
};

function SelectLanguageComponent() {
  const t = useT();
  const languages = useLanguages();
  const langContext = useLangContext();
  const [value, setValue] = useState<string>(loadingOption.value);
  const [options, setOptions] = useState<FormSelectOption[]>([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (languages && languages.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const optionsChecked: FormSelectOption[] = languages.map((lang: any) => ({
        label: lang.localized_name,
        value: lang.code,
      }));
      setOptions(optionsChecked);
    }
  }, [languages]);

  useEffect(() => {
    if (options && options.length > 0 && langContext.state.selected) {
      setValue(langContext.state.selected);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options, setValue]);

  const onChange = (valueSelected: string) => {
    setValue(valueSelected);
    const selected = options.find((option) => option.value === valueSelected);
    tx.setCurrentLocale(valueSelected);
    langContext.dispatch({ type: DISPATCH_ACTIONS.SET_LANG, payload: valueSelected });
    enqueueSnackbar(t("Language changed to: {language}", { language: selected?.label }), {
      variant: "info",
    });
  };

  return (
    <Select
      disableUnderline
      input={<InputSelectSmall />}
      value={value}
      onChange={(e) => {
        if (e.target.value) {
          onChange(e.target.value);
        }
      }}
    >
      {value === loadingOption.value && <MenuItem value={loadingOption.value}>{loadingOption.label}</MenuItem>}
      {options.map((option) => (
        <MenuItem key={`key-${option.value}`} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
}

export default SelectLanguageComponent;

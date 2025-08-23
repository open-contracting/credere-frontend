import { type TypeOf, boolean, coerce, nativeEnum, object, preprocess, record, string } from "zod";
import { t } from "../util/i18n";

import { CREDIT_PRODUCT_TYPE } from "../constants";

const creditProviderNameSchema = string().min(1, t("Provider name is required"));
const creditProviderTypeSchema = string().min(1, t("Provider type is required"));

export const lenderSchema = object({
  name: creditProviderNameSchema,
  type: creditProviderTypeSchema,
  sla_days: coerce
    .number()
    .int()
    .positive(t("SLA days must be greater than 0"))
    .min(1, t("SLA days must be greater than 0")),
  email_group: string().email(t("Email Address is invalid")),
  logo_filename: string(),
  external_onboarding_url: string().url(t("URL is invalid (Hint: include http:// or https://)")),
});

export type ProviderInput = TypeOf<typeof lenderSchema>;

export const creditProductSchema = object({
  borrower_size: string().min(1, t("Borrower size is required")),
  lower_limit: coerce.number().min(1, t("Lower limit must be greater than 0")),
  upper_limit: coerce.number().min(1, t("Upper limit must be greater than 0")),
  interest_rate: string().min(1, t("Interest rate description is required")),
  type: nativeEnum(CREDIT_PRODUCT_TYPE, {
    errorMap: (issue) => {
      switch (issue.code) {
        case "invalid_type":
        case "invalid_enum_value":
          return { message: t("Type of product is required") };
        default:
          return { message: t("Select an option") };
      }
    },
  }),
  procurement_category_to_exclude: string(),
  required_document_types: record(string().min(1), boolean()),
  borrower_types: record(string().min(1), boolean()),
  other_fees_total_amount: preprocess(
    (args) => (args === "" ? undefined : args),
    coerce
      .number({
        required_error: t("Other fees total amount is required"),
        invalid_type_error: t("Other fees total amount must be a number"),
      })
      .gte(0, t("Other fees total amount must be greater or equal than 0")),
  ),
  other_fees_description: string().min(1, t("Other fees description is required")),
  additional_information: string(),
  more_info_url: string().url(t("URL is invalid (Hint: include http:// or https://)")),
})
  .refine((data) => data.lower_limit < data.upper_limit, {
    path: ["lower_limit"],
    message: t("Lower limit must be less than upper limit"),
  })
  .refine((data) => data.lower_limit < data.upper_limit, {
    path: ["upper_limit"],
    message: t("Upper limit must be greater than lower limit"),
  });

export type CreditProductInput = TypeOf<typeof creditProductSchema>;

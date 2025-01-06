import { t } from "@transifex/native";
import { type TypeOf, coerce, nativeEnum, object, string } from "zod";

import { USER_TYPES } from "../constants";
import type { ILender } from "./application";

export const emailSchema = string().min(1, t("Email address is required")).email(t("Email Address is invalid"));
const passwordSchema = string()
  .min(1, t("Password is required"))
  .min(14, t("Password must be more than 14 characters"));
const otp = string().min(6, t("OTP length must be 6 digits")).max(6, t("OTP length must be 6 digits"));

export const loginSchema = object({
  username: emailSchema,
  password: passwordSchema,
  temp_password: otp,
});

export type LoginInput = TypeOf<typeof loginSchema>;

export const setupMFASchema = object({
  temp_password: otp,
});

export type SetupMFAInputForm = TypeOf<typeof setupMFASchema>;

export interface SetupMFAInput {
  temp_password: string;
  session: string;
}

const nameSchema = string().nonempty(t("Full name is required"));

export const createUserSchema = object({
  name: nameSchema,
  email: emailSchema,
  type: nativeEnum(USER_TYPES, {
    errorMap: (issue) => {
      switch (issue.code) {
        case "invalid_type":
        case "invalid_enum_value":
          return { message: t("Type of user is required") };
        default:
          return { message: t("Select an option") };
      }
    },
  }),
  lender_id: coerce.number().positive().optional(),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>;

export type UpdateUserInput = Omit<CreateUserInput, "email"> & { id: string | undefined };

export const setPasswordSchema = object({
  password: passwordSchema,
  passwordConfirm: string().min(1, t("Please confirm your password")),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ["passwordConfirm"],
  message: t("Passwords do not match"),
});

export type UpdatePasswordInput = TypeOf<typeof setPasswordSchema>;
export type UpdatePasswordPayload = {
  username: string;
  temp_password: string;
  password: string;
};

export const resetPasswordSchema = object({
  username: emailSchema,
});

export type ResetPasswordInput = TypeOf<typeof resetPasswordSchema>;

export interface IResponse {
  detail: string;
}

export interface IUpdatePasswordResponse extends IResponse {
  secret_code: string;
  session: string;
  username: string;
}

export interface IUser {
  id?: string;
  name: string;
  email: string;
  type: USER_TYPES;
  created_at?: string;
  updated_at?: string;
  lender_id?: number;
  lender?: ILender;
}

export interface IUserResponse {
  user: IUser;
}
export interface IUsersListResponse {
  items: IUser[];
  count: number;
  page: number;
  page_size: number;
}

export interface ILoginResponse extends IUserResponse {
  access_token: string;
}

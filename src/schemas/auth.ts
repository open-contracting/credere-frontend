import { t } from '@transifex/native';
import { TypeOf, object, string } from 'zod';

const emailSchema = string().min(1, t('Email address is required')).email(t('Email Address is invalid'));
const passwordSchema = string()
  .min(1, t('Password is required'))
  .min(12, t('Password must be more than 12 characters'));
const otp = string().min(6, t('OTP length must be 6 digits')).max(6, t('OTP length must be 6 digits'));

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
  secret: string;
}

const registerSchema = object({
  name: string().min(1, t('Full name is required')).max(100),
  email: emailSchema,
});

export type RegisterInput = TypeOf<typeof registerSchema>;

export const setPasswordSchema = object({
  password: passwordSchema,
  passwordConfirm: string().min(1, t('Please confirm your password')),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ['passwordConfirm'],
  message: t('Passwords do not match'),
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
  message: string;
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
  type?: string;
  created_at?: string;
  updated_at?: string;
}

export interface IUserResponse {
  user: IUser;
}

export interface ILoginResponse extends IUserResponse {
  access_token: string;
}

import { t } from '@transifex/native';
import { TypeOf, object, string } from 'zod';

const emailSchema = string().min(1, t('Email address is required')).email(t('Email Address is invalid'));
const nameSchema = string().min(1, t('Name is required'));
const userTypeSchema = string().min(1, t('User type is required'));
// const lenderSchema = string().min(1, t('Lender is required'));

export const registerUserSchema = object({
  email: emailSchema,
  name: nameSchema,
  type: userTypeSchema,
  // lender: lenderSchema,
});

export type RegisteruserInput = TypeOf<typeof registerUserSchema>;

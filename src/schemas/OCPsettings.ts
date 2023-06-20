import { t } from '@transifex/native';
import { TypeOf, boolean, coerce, object, string } from 'zod';

const creditProviderNameSchema = string().min(1, t('Provider name is required'));
const creditProviderTypeSchema = string().nonempty(t('Provider type is required'));
const microSchema = boolean();
const smallSchema = boolean();
const mediumSchema = boolean();

const limitsSchema = object({
  lower: coerce.number().min(1, t('Lower limit must be greater than 0')),
  upper: coerce.number().min(1, t('Upper limit must be greater than 0')),
})
  .refine((data) => data.lower < data.upper, {
    path: ['lower'],
    message: t('Lower limit must be less than upper limit'),
  })
  .refine((data) => data.lower < data.upper, {
    path: ['upper'],
    message: t('Upper limit must be greater than lower limit'),
  });

const preferencesSchema = object({
  MICRO: microSchema,
  SMALL: smallSchema,
  MEDIUM: mediumSchema,
}).refine((data) => data.MICRO || data.SMALL || data.MEDIUM, {
  path: [''],
  message: t('You need to check at least one option'),
});

export const checkProviderSchema = object({
  name: creditProviderNameSchema,
  type: creditProviderTypeSchema,
  borrower_type_preferences: preferencesSchema,
  limits_preferences: object({
    micro_limits: limitsSchema.optional(),
    small_limits: limitsSchema.optional(),
    medium_limits: limitsSchema.optional(),
  }),
  sla_days: coerce.number().int().positive().min(1, t('SLA days must be greater than 0')),
  email_group: string().email(t('Email Address is invalid')),
});

export type ProviderInput = TypeOf<typeof checkProviderSchema>;

export type PreferencesType = TypeOf<typeof preferencesSchema>;

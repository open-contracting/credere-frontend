import { t } from '@transifex/native';
import { TypeOf, boolean, object, string } from 'zod';

const creditProviderNameSchema = string().min(1, t('Provider name is required'));
const creditProviderTypeSchema = string().nonempty(t('Provider type is required'));
const microSchema = boolean();
const smallSchema = boolean();
const mediumSchema = boolean();
const microLowerSchema = string().optional();
const microUpperSchema = string().optional();
const smallLowerSchema = string().optional();
const smallUpperSchema = string().optional();
const mediumLowerSchema = string().optional();
const mediumUpperSchema = string().optional();
export const checkProviderSchema = object({
  creditProviderName: creditProviderNameSchema,
  creditProviderType: creditProviderTypeSchema,
  Micro: microSchema,
  Small: smallSchema,
  Medium: mediumSchema,
  MicroLower: microLowerSchema,
  MicroUpper: microUpperSchema,
  SmallLower: smallLowerSchema,
  SmallUpper: smallUpperSchema,
  MediumLower: mediumLowerSchema,
  MediumUpper: mediumUpperSchema,
});

export type ProviderInput = TypeOf<typeof checkProviderSchema>;

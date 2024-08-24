import { useQuery } from '@tanstack/react-query';
import { getConstants } from 'src/api/public';
import { FormSelectOption } from 'src/stories/form-select/FormSelect';

export interface IConstant {
  BorrowerDocumentType: Array<FormSelectOption>;
  BorrowerSector: Array<FormSelectOption>;
  BorrowerSize: Array<FormSelectOption>;
  BorrowerType: Array<FormSelectOption>;
}

export default function useConstants(): IConstant | null {
  const { data: constants } = useQuery({
    queryKey: ['constants'],
    queryFn: async () => getConstants(),
    staleTime: 120000,
  });
  return constants;
}

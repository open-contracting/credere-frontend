import { Box } from "@mui/material";
import { useTranslation as useT } from "react-i18next";

import CheckGreen from "../assets/icons/check-green.svg";
import WarnRed from "../assets/icons/warn-red.svg";
import Text from "../stories/text/Text";

const getIcon = (verified: boolean, name: string) => {
  let icon = CheckGreen;

  if (!verified) {
    icon = WarnRed;
  }

  return <img className="self-start" src={icon} alt={`icon-availabily-${name}`} />;
};

interface DataVerificationStatusProps {
  verified: boolean;
  name: string;
  customLabel?: string;
}

export function DataVerificationStatus({ verified, name, customLabel }: DataVerificationStatusProps) {
  const { t } = useT();

  return (
    <Box className="py-2 flex flex-row">
      {getIcon(verified, name)}

      <Text fontVariant className="ml-3 mb-0 text-sm">
        {customLabel || (verified ? t("Yes") : t("No"))}
      </Text>
    </Box>
  );
}

DataVerificationStatus.defaultProps = {
  customLabel: undefined,
};

export default DataVerificationStatus;

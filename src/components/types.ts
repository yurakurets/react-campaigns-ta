import {BoxProps} from "@mui/material";

import {ICampaign} from "./CampaingsTable/types";

export interface IStyledBoxProps extends BoxProps {
  isDrawerOpen: boolean;
}

declare global {
  interface Window {
    AddCampaigns: (campaigns: ICampaign[]) => void;
  }
}

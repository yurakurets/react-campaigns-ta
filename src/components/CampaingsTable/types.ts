import {IDateRange} from "../DateRange/types";
import {Dispatch, SetStateAction} from "react";

export interface ICampaign {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  Budget: number;
}

export interface ICampaignsTableProps {
  dateRange: IDateRange;
  rows: ICampaign[];
  setDateRange: Dispatch<SetStateAction<IDateRange>>;
}

export enum ECampaignStatus {
  active = 'Active',
  inactive = 'Inactive'
}

export type TFilters = 'startDate' | 'endDate';

export interface IFilterBlockProps {
  dateRange: IDateRange
  setDateRange: Dispatch<SetStateAction<IDateRange>>;
}

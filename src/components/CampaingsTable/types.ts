import {Dispatch, SetStateAction} from "react";
import {TableCellProps} from "@mui/material/TableCell";

import {IDateRange} from "../DateRange/types";

export interface ICampaign {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  Budget: number;
}

export interface ICampaignsTableProps {
  rows: ICampaign[];
}

export interface IPagination {
  rowsPerPage: number,
  page: number,
  paddingHeight: number,
}

export interface IStyledTableCellProps extends TableCellProps {
  isActive: boolean;
}

export enum ECampaignStatus {
  active = 'Active',
  inactive = 'Inactive'
}

export type TFilters = 'startDate' | 'endDate';

export interface IFilterBlockProps {
  dateRange: IDateRange
  setDateRange: Dispatch<SetStateAction<IDateRange>>;
  isDrawerOpen: boolean
  setIsDrawerOpen: Dispatch<SetStateAction<boolean>>;
}

import {Dispatch, SetStateAction} from "react";
import {IDateRange} from "../DateRange/types";

interface IDateFilter {
  dateRange: IDateRange;
  setDateRange: Dispatch<SetStateAction<IDateRange>>;
}

export interface IFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    date: IDateFilter
  }
}

import {Dispatch, SetStateAction} from "react";

export interface IDateRange {
  startDate: Date | null;
  endDate: Date | null;
}

export interface IDateRangeComponentProps {
  dateRange: IDateRange;
  setDateRange: Dispatch<SetStateAction<IDateRange>>;
}

import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import {IDateRange} from "../components/DateRange/types";

dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter);

export const isCurrentDateWithinInterval = ({startDate, endDate}: { startDate: string, endDate: string }): boolean =>
  dayjs().isSameOrAfter(dayjs(startDate)) && dayjs().isSameOrBefore(dayjs(endDate));

export const isDateRangeWithinInterval = (
  {startDate, endDate, dateRange}: { startDate: string, endDate: string, dateRange: IDateRange }
): boolean =>
  (!dateRange.startDate || dayjs(startDate).isSameOrAfter(dayjs(dateRange.startDate))) &&
  (!dateRange.endDate || dayjs(endDate).isSameOrBefore(dayjs(dateRange.endDate)));

export const isEndDateAfterStartDate = ({startDate, endDate}: { startDate: string, endDate: string }): boolean =>
  dayjs(endDate).isSameOrAfter(dayjs(startDate))

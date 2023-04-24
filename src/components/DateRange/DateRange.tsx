import React  from 'react';
import {Box} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { styled } from '@mui/material/styles';

import {IDateRangeComponentProps} from "./types";

const StyledBox = styled(Box)(({theme}) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
}))

export const DateRange: React.FC<IDateRangeComponentProps> = ({ dateRange, setDateRange }) => {
  const handleStartDateChange = (date: Date | null) => {
    setDateRange((prevState) => ({
      ...prevState,
      startDate: date,
    }));
  };

  const handleEndDateChange = (date: Date | null) => {
    setDateRange((prevState) => ({
      ...prevState,
      endDate: date,
    }));
  };

  return (
    <StyledBox>
      <DatePicker
        maxDate={dateRange.endDate ?? undefined}
        label="Start Date"
        value={dateRange.startDate}
        onChange={handleStartDateChange}
      />
      <DatePicker
        minDate={dateRange.startDate ?? undefined}
        label="End Date"
        value={dateRange.endDate}
        onChange={handleEndDateChange}
      />
    </StyledBox>
  );
};

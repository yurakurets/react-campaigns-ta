import React from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {styled} from '@mui/material/styles';
import {IFilterDrawerProps} from "./types";
import {DateRange} from "../DateRange";
import {INITIAL_DATE_RANGE} from "../App";

const StyledDrawer = styled(Drawer)(({theme}) => ({
  '& .MuiDrawer-paper': {
    width: '100%',
    maxWidth: 360,
    padding: theme.spacing(3),
  },
}));

const StyledBox = styled(Box)(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

const StyledIconButton = styled(IconButton)(({theme}) => ({
  marginLeft: 'auto',
  marginBottom: theme.spacing(1),
}));

const StyledButton = styled(Button)(() => ({
  marginTop: 'auto',
}));

export const FilterDrawer: React.FC<IFilterDrawerProps> = ({
                                                             isOpen,
                                                             onClose,
                                                             filters: {date: {dateRange, setDateRange}},
                                                           }) => {
  const handleClearFilters = () => {
    setDateRange(INITIAL_DATE_RANGE);
  }

  return (
    <StyledDrawer anchor="right" open={isOpen} onClose={onClose}>
      <StyledIconButton onClick={onClose}>
        <CloseIcon/>
      </StyledIconButton>
      <StyledBox>
        <DateRange dateRange={dateRange} setDateRange={setDateRange}/>
        <StyledButton variant="contained" onClick={handleClearFilters}>
          Clear All Filters
        </StyledButton>
      </StyledBox>
    </StyledDrawer>
  );
};

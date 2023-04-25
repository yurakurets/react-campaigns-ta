import React from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {styled} from '@mui/material/styles';
import {IFilterDrawerProps} from "./types";
import {DateRange} from "../DateRange";
import {INITIAL_DATE_RANGE} from "../App";

export const DRAWER_WIDTH = 320;

const StyledDrawer = styled(Drawer)(({theme}) => ({
  '& .MuiDrawer-paper': {
    width: '100%',
    maxWidth: DRAWER_WIDTH,
    padding: theme.spacing(3),
  },
}));

const StyledBox = styled(Box)(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

const StyledIconButton = styled(IconButton)(({theme}) => ({
  marginRight: 'auto',
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
    <StyledDrawer variant="persistent" anchor="right" open={isOpen} onClose={onClose}>
      <StyledIconButton onClick={onClose}>
        <ChevronRightIcon/>
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

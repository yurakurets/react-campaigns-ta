import React from 'react';
import {Box, Button} from '@mui/material';
import {styled} from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import FilterListIcon from '@mui/icons-material/FilterList';
import dayjs from "dayjs";

import {IFilterBlockProps, TFilters} from "./types";
import {FilterDrawer} from "../FilterDrawer";
import {INITIAL_DATE_RANGE} from "../App";

const StyledFilterContainer = styled(Box)(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  margin: theme.spacing(2, 2, 0, 2),
  gap: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    alignItems: 'flex-start',
    flexDirection: 'column'
  },
}));

const StyledBox = styled(Box)(({theme}) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
}));

const FilterLabel = styled(Box)(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: theme.palette.grey[300],
  borderRadius: 5,
  padding: theme.spacing(1),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  '&:hover': {
    backgroundColor: theme.palette.grey[400],
    cursor: 'pointer',
  },
}));

const StyledCloseIcon = styled(CloseIcon)(({theme}) => ({
  marginLeft: theme.spacing(1),
}));

const ClearFilterButton = styled(Button)(({theme}) => ({
  minWidth: 'unset',
  padding: 0,
  color: theme.palette.grey[500],
  '&:hover': {
    backgroundColor: 'transparent',
    color: theme.palette.grey[700],
  },
}));

export const FilterBlock: React.FC<IFilterBlockProps> = ({
                                                           dateRange: {startDate, endDate},
                                                           setDateRange,
                                                           isDrawerOpen,
                                                           setIsDrawerOpen
                                                         }) => {
  const handleClearFilter = (filter: TFilters) => {
    setDateRange(prevState => (filter === 'startDate' ? {...prevState, startDate: null} : {
      ...prevState,
      endDate: null
    }))
  }

  const handleClearAllFilters = () => {
    setDateRange(INITIAL_DATE_RANGE)
  }

  const handleOpenDrawer = () => setIsDrawerOpen(true);

  const handleCloseDrawer = () => setIsDrawerOpen(false);

  return (
    <StyledFilterContainer>
      <StyledBox>
        <Button onClick={handleOpenDrawer}>
          <FilterListIcon/>
        </Button>
        <FilterDrawer
          onClose={handleCloseDrawer}
          isOpen={isDrawerOpen}
          filters={{date: {dateRange: {startDate, endDate}, setDateRange}}}
        />

        {startDate && (
          <FilterLabel>
            {`Since: ${dayjs(startDate).format('DD/MM/YYYY')}`}
            <ClearFilterButton onClick={() => handleClearFilter('startDate')}>
              <StyledCloseIcon fontSize="small"/>
            </ClearFilterButton>
          </FilterLabel>
        )}
        {endDate && (
          <FilterLabel>
            {`Until: ${dayjs(endDate).format('DD/MM/YYYY')}`}
            <ClearFilterButton onClick={() => handleClearFilter('endDate')}>
              <StyledCloseIcon fontSize="small"/>
            </ClearFilterButton>
          </FilterLabel>
        )}
      </StyledBox>
      {(startDate || endDate) && <FilterLabel onClick={handleClearAllFilters}>
        Clear All
      </FilterLabel>}
    </StyledFilterContainer>
  );
};

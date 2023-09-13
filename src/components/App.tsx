import React, {useCallback, useEffect, useState} from 'react';
import {styled, ThemeProvider} from "@mui/material/styles";
import {Container, CssBaseline, Box} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { v4 as uuidv4 } from 'uuid';

import {theme} from "../mui-theme/theme";
import {CampaignsTable} from "./CampaingsTable";
import {Header} from "./Layout/Header";
import {IDateRange} from "./DateRange/types";
import {ICampaign, IPagination} from "./CampaingsTable/types";
import {isDateRangeWithinInterval, isEndDateAfterStartDate} from "../utils/date";
import {FilterBlock} from "./CampaingsTable/FilterBlock";
import {IStyledBoxProps} from "./types";
import {DRAWER_WIDTH} from "./FilterDrawer/FilterDrawer";
import {logConsoleDescription} from "../utils/browser";
import {MOCK_CAMPAIGNS} from "../utils/mock";
import {DEFAULT_PAGINATION, INITIAL_DATE_RANGE} from "./utils";

logConsoleDescription();

const StyledContainer = styled(Container)(({theme}) => ({
  padding: theme.spacing(2),
}));

const StyledIsDrawerOpenBox = styled(({isDrawerOpen, ...props}: IStyledBoxProps) => (
  <Box {...props} />
))<{ isDrawerOpen: boolean }>(
  ({isDrawerOpen}) => ({
    [theme.breakpoints.up('md')]: {
      marginRight: isDrawerOpen ? DRAWER_WIDTH : 0,
      transition: 'margin-right 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
    },
  })
);

export const App: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [dateRange, setDateRange] = useState<IDateRange>(INITIAL_DATE_RANGE);
  const [campaigns, setCampaigns] = useState<ICampaign[]>(MOCK_CAMPAIGNS);
  const [nameFilter, setNameFilter] = useState<string>('');
  const [pagination, setPagination] = useState<IPagination>(DEFAULT_PAGINATION);

  const addCampaigns = useCallback((newCampaigns: ICampaign[]) => {
    const campaignsWithUniqueIds = newCampaigns.map((item) => ({...item, id: `${item.id}_${uuidv4()}`}));

    setCampaigns(prevState => [...prevState, ...campaignsWithUniqueIds]);
  }, [setCampaigns]);

  useEffect(() => {
    // Expose the addCampaigns method to the browser's JavaScript console
    window.AddCampaigns = addCampaigns;
  }, [addCampaigns]);

  const filteredCampaigns = campaigns.filter(({name, startDate, endDate}) => {
    return (
      isEndDateAfterStartDate({startDate, endDate}) &&
      name.toLowerCase().includes(nameFilter) &&
      isDateRangeWithinInterval({startDate, endDate, dateRange})
    )
  })

  const handleSetFilter = (val: string) => {
    // set page to the first to show proper search results
    setPagination(prevState => ({...DEFAULT_PAGINATION, rowsPerPage: prevState.rowsPerPage}));
    setNameFilter(val);
  }

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssBaseline/>
        <StyledIsDrawerOpenBox isDrawerOpen={isDrawerOpen}>
          <Header setNameFilter={handleSetFilter}/>

          <StyledContainer>
            <TableContainer component={Paper}>
              <FilterBlock
                dateRange={dateRange}
                setDateRange={setDateRange}
                isDrawerOpen={isDrawerOpen}
                setIsDrawerOpen={setIsDrawerOpen}
              />
              <CampaignsTable pagination={pagination} setPagination={setPagination} rows={filteredCampaigns}/>
            </TableContainer>
          </StyledContainer>
        </StyledIsDrawerOpenBox>
      </LocalizationProvider>
    </ThemeProvider>
  )
}

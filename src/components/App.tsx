import React, {useState} from 'react';
import {styled, ThemeProvider} from "@mui/material/styles";
import {Container, CssBaseline} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';

import {theme} from "../mui-theme/theme";
import {CampaignsTable} from "./CampaingsTable";
import {Header} from "./Layout/Header";
import {IDateRange} from "./DateRange/types";
import {ICampaign} from "./CampaingsTable/types";
import {isDateRangeWithinInterval, isEndDateAfterStartDate} from "../utils/date";
import {FilterBlock} from "./CampaingsTable/FilterBlock";

const INITIAL_CAMPAIGNS: ICampaign[] = [
  {
    "id": 1,
    "name": "Divavu",
    "startDate": "9/19/2017",
    "endDate": "3/9/2018",
    "Budget": 88377
  },
  {
    "id": 2,
    "name": "Jaxspan",
    "startDate": "11/21/2017",
    "endDate": "2/21/2018",
    "Budget": 608715
  },
  {
    "id": 3,
    "name": "Miboo",
    "startDate": "11/1/2017",
    "endDate": "6/20/2017",
    "Budget": 239507
  },
  {
    "id": 4,
    "name": "Trilith",
    "startDate": "8/25/2017",
    "endDate": "11/30/2017",
    "Budget": 179838
  },
  {
    "id": 5,
    "name": "Layo",
    "startDate": "11/28/2017",
    "endDate": "3/10/2018",
    "Budget": 837850
  },
  {
    "id": 6,
    "name": "Photojam",
    "startDate": "7/25/2017",
    "endDate": "6/23/2017",
    "Budget": 858131
  },
  {
    "id": 7,
    "name": "Blogtag",
    "startDate": "6/27/2017",
    "endDate": "1/15/2018",
    "Budget": 109078
  },
  {
    "id": 8,
    "name": "Rhyzio",
    "startDate": "10/13/2017",
    "endDate": "1/25/2024",
    "Budget": 272552
  },
  {
    "id": 9,
    "name": "Zoomcast",
    "startDate": "9/6/2017",
    "endDate": "11/10/2017",
    "Budget": 301919
  },
  {
    "id": 10,
    "name": "Realbridge",
    "startDate": "3/5/2018",
    "endDate": "10/2/2017",
    "Budget": 505602
  }
];

export const INITIAL_DATE_RANGE = {
  startDate: null,
  endDate: null,
};

const StyledContainer = styled(Container)(({theme}) => ({
  padding: theme.spacing(2),
}));

export const App: React.FC = () => {
  const [dateRange, setDateRange] = useState<IDateRange>(INITIAL_DATE_RANGE);
  const [campaigns, setCampaigns] = useState<ICampaign[]>(INITIAL_CAMPAIGNS);
  const [nameFilter, setNameFilter] = useState<string>('');

  const filteredCampaigns = campaigns.filter(({name, startDate, endDate}) => {
    return (
      isEndDateAfterStartDate({startDate, endDate}) &&
      name.toLowerCase().includes(nameFilter) &&
      isDateRangeWithinInterval({startDate, endDate, dateRange})
    )
  })

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssBaseline/>
        <Header setNameFilter={setNameFilter}/>

        <StyledContainer>
          <TableContainer component={Paper}>
            <FilterBlock dateRange={dateRange} setDateRange={setDateRange}/>
            <CampaignsTable rows={filteredCampaigns}/>
          </TableContainer>
        </StyledContainer>
      </LocalizationProvider>
    </ThemeProvider>
  )
}

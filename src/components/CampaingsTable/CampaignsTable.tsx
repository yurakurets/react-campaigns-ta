import React, {useCallback, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {styled} from "@mui/material/styles";
import {Container, TablePagination} from "@mui/material";

import {ECampaignStatus, ICampaignsTableProps} from "./types";
import {FilterBlock} from "./FilterBlock";
import {isWithinInterval} from "../../utils/date";

const DEFAULT_ROWS_PER_PAGE = 5;

const StyledContainer = styled(Container)(({theme}) => ({
  padding: theme.spacing(2),
}));

const StyledTableCell = styled(TableCell)<{isActive: boolean}>(({theme: {palette}, isActive}) => ({
  color: isActive ? palette.success.main : palette.error.main,
}));

export const CampaignsTable: React.FC<ICampaignsTableProps> = ({dateRange, rows, setDateRange}) => {
  const [rowsPerPage, setRowsPerPage] = useState<number>(DEFAULT_ROWS_PER_PAGE);
  const [page, setPage] = useState(0);
  const [visibleRows, setVisibleRows] = useState<ICampaignsTableProps['rows'] | null>(rows.slice(
    0,
    DEFAULT_ROWS_PER_PAGE,
  ));
  const [paddingHeight, setPaddingHeight] = React.useState(0);

  const handleChangePage = useCallback(
    (event: unknown, newPage: number) => {
      setPage(newPage);

      const updatedRows = rows.slice(
        newPage * rowsPerPage,
        newPage * rowsPerPage + rowsPerPage,
      );
      setVisibleRows(updatedRows);

      // Avoid a layout jump when reaching the last page with empty rows.
      const numEmptyRows =
        newPage > 0 ? Math.max(0, (1 + newPage) * rowsPerPage - rows.length) : 0;

      const newPaddingHeight = 53 * numEmptyRows;
      setPaddingHeight(newPaddingHeight);
    },
    [rowsPerPage, rows],
  );

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const updatedRowsPerPage = parseInt(event.target.value, 10);

      setRowsPerPage(updatedRowsPerPage);
      setPage(0);

      const updatedRows = rows.slice(
        0,
        updatedRowsPerPage,
      );
      setVisibleRows(updatedRows);

      // There is no layout jump to handle on the first page.
      setPaddingHeight(0);
    },
    [rows],
  );

  return (
    <StyledContainer>
      <TableContainer component={Paper}>
        <FilterBlock dateRange={dateRange} setDateRange={setDateRange} />

        <Table sx={{minWidth: 650}} aria-label="Campaigns table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Start Date</TableCell>
              <TableCell align="right">End Date</TableCell>
              <TableCell align="right">Budget (USD)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows?.map((campaign) => (
              <TableRow key={campaign.id}>
                <TableCell component="th" scope="row">
                  {campaign.name}
                </TableCell>
                <StyledTableCell align="right" isActive={isWithinInterval(campaign.startDate, campaign.endDate)}>
                  {isWithinInterval(campaign.startDate, campaign.endDate)
                    ? ECampaignStatus.active
                    : ECampaignStatus.inactive}
                </StyledTableCell>
                <TableCell align="right">
                  {new Date(campaign.startDate).toLocaleDateString()}
                </TableCell>
                <TableCell align="right">
                  {new Date(campaign.endDate).toLocaleDateString()}
                </TableCell>
                <TableCell align="right">{campaign.Budget}</TableCell>
              </TableRow>
            ))}
            {paddingHeight > 0 && (
              <TableRow
                style={{
                  height: paddingHeight,
                }}
              >
                <TableCell colSpan={5}/>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </StyledContainer>
  );
};

import React, {useCallback, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {styled} from "@mui/material/styles";
import {Container, TablePagination} from "@mui/material";

import {ECampaignStatus, ICampaignsTableProps, IPagination, IStyledTableCellProps} from "./types";
import {isCurrentDateWithinInterval} from "../../utils/date";

const DEFAULT_PAGINATION = {
  rowsPerPage: 5,
  page: 0,
  paddingHeight: 0,
};

const StyledContainer = styled(Container)(({theme}) => ({
  padding: theme.spacing(2),
}));

const StyledTableCell = styled(({isActive, ...props}: IStyledTableCellProps) => (
  <TableCell {...props} />
))<{ isActive: boolean }>(
  ({theme: {palette}, isActive}) => ({
    color: isActive ? palette.success.main : palette.error.main,
  })
);

export const CampaignsTable: React.FC<ICampaignsTableProps> = ({rows}) => {
  const [pagination, setPagination] = useState<IPagination>(DEFAULT_PAGINATION);

  const handleChangePage = useCallback(
    (event: unknown, newPage: number) => {
      // Avoid a layout jump when reaching the last page with empty rows.
      const numEmptyRows =
        newPage > 0 ? Math.max(0, (1 + newPage) * pagination.rowsPerPage - rows.length) : 0;

      const newPaddingHeight = 53 * numEmptyRows;
      setPagination(prevState => ({...prevState, page: newPage, paddingHeight: newPaddingHeight}));
    },
    [pagination, rows],
  );

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const updatedRowsPerPage = parseInt(event.target.value, 10);

      // There is no layout jump to handle on the first page.
      setPagination({...DEFAULT_PAGINATION, rowsPerPage: updatedRowsPerPage});
    },
    [],
  );

  const visibleRows = rows.slice(
    pagination.page * pagination.rowsPerPage,
    pagination.page * pagination.rowsPerPage + pagination.rowsPerPage
  );

  return (
    <StyledContainer>
      <Table sx={{minWidth: 550}} aria-label="Campaigns table">
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
          {visibleRows.map(({startDate, endDate, id, name, Budget}) => (
            <TableRow key={id}>
              <TableCell component="th" scope="row">
                {name}
              </TableCell>
              <StyledTableCell
                align="right"
                isActive={isCurrentDateWithinInterval({startDate, endDate})}
              >
                {isCurrentDateWithinInterval({startDate, endDate})
                  ? ECampaignStatus.active
                  : ECampaignStatus.inactive}
              </StyledTableCell>
              <TableCell align="right">
                {new Date(startDate).toLocaleDateString()}
              </TableCell>
              <TableCell align="right">
                {new Date(endDate).toLocaleDateString()}
              </TableCell>
              <TableCell align="right">{Budget}</TableCell>
            </TableRow>
          ))}
          {pagination.paddingHeight > 0 && (
            <TableRow
              style={{
                height: pagination.paddingHeight,
              }}
            >
              <TableCell colSpan={5}/>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        aria-label="Table pagination"
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={pagination.rowsPerPage}
        page={pagination.page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </StyledContainer>
  );
};

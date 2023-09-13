import React from 'react';
import {AppBar, Toolbar, Typography, Box, InputBase, alpha} from '@mui/material';
import {styled} from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

const StyledToolbar = styled(Toolbar)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}))

const SearchContainer = styled(Box)(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  borderRadius: 5,
  backgroundColor: alpha(theme.palette.grey.A200, 0.1),
  marginLeft: theme.spacing(2),
  padding: theme.spacing(0.5, 1),
  width: 400,
  [theme.breakpoints.down('sm')]: {
    marginLeft: theme.spacing(1),
    width: '100%'
  },
}));

const SearchInput = styled(InputBase)(({theme}) => ({
  marginLeft: theme.spacing(1),
  flexGrow: 1,
  fontSize: '1rem',
  color: theme.palette.common.white,
  '& input': {
    padding: theme.spacing(1),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
    '&::placeholder': {
      color: theme.palette.common.white,
      opacity: 0.5,
    }
  }
}));

interface IHeaderProps {
  setNameFilter(val: string): void;
}

export const Header: React.FC<IHeaderProps> = ({setNameFilter}) => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameFilter(event.target.value.toLowerCase());
  }

  return (
    <AppBar position="static" color="primary">
      <StyledToolbar>
        <Typography variant="h6" component="div">
          Campaigns
        </Typography>
        <SearchContainer>
          <SearchIcon color="action"/>
          <SearchInput
            placeholder="Search…"
            inputProps={{'aria-label': 'Search'}}
            onChange={handleSearchChange}
          />
        </SearchContainer>
      </StyledToolbar>
    </AppBar>
  );
};

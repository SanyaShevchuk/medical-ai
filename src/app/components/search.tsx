import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';

export const SearchInput = ({ value, setValue, onSearch, onClear }: any) => {
  return (
    <Paper
      sx={{ display: 'flex', width: '95%', position: 'absolute', bottom: 0, margin: '12px 2.5%' }}
    >
      <Button onClick={onClear}>Очистити повідомлення</Button>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Які у вас запитання?"
        value={value}
        onChange={(e: any) => setValue(e?.target?.value)}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={onSearch}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
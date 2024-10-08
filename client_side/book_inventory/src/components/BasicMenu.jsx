import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function BasicMenu({title, menuItems, itemsOnClick}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onItemClick = (index) => {
    itemsOnClick[index]()
    handleClose()
  }

  return (
    <>
      <Button
        onClick={handleClick}
        sx={{bgcolor: ''}}
      >
        {title}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      > 
      {menuItems.map((item, index) => (
        <MenuItem key={index} onClick={() => onItemClick(index)}>{item}</MenuItem>
      ))}
      </Menu>
    </>
  );
}

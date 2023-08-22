import React from 'react';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

function AddButton({handleClick}) {
  
  return (
    <IconButton
      sx={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: '#B2B5C2',
        '&:hover': {
          backgroundColor: '#DBA527',
        },
      }}
    >
      <AddIcon onClick={handleClick} fontSize='large'/>
    </IconButton>
  );
}

export default AddButton;

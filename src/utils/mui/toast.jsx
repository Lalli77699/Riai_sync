import React from 'react';

import Snackbar from '@mui/material/Snackbar';

import MuiAlert from '@mui/material/Alert';
 
const Alert = React.forwardRef(function Alert(props, ref) {

  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;

});
 
const ToastMessage = ({ message, severity, open, handleClose }) => {

  return (
<Snackbar

      open={open}

      autoHideDuration={6000}

      onClose={handleClose}

      anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Position it at the top right
>
<Alert onClose={handleClose} severity={severity}>

        {message}
</Alert>
</Snackbar>

  );

};
 
export default ToastMessage;

 
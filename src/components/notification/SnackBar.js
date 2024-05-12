import React, { Fragment, useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

function SnackBarNotification(props) {
    const message = props.message;

    const [open, setOpen] = useState(false);
    useEffect(() => { setOpen(true); }, []);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    }

    const closeAction = (
        <Fragment>
            <IconButton size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose} >
                <CloseIcon fontSize="small" />
            </IconButton>
        </Fragment>
    );

    return (
        <>
            <div>
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message={message}
                    action={closeAction}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                />
            </div>
        </>
    );
}

export default SnackBarNotification;
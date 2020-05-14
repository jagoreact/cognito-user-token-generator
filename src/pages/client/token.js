import React, { useState, useEffect } from 'react';
import Auth from '@aws-amplify/auth';
import TextField from '@material-ui/core/TextField';
import fromUnixTime from 'date-fns/fromUnixTime'
import { useClipboard } from 'use-clipboard-copy';
import Button from '@material-ui/core/Button';
import FileCopyIcon from '@material-ui/icons/FileCopy';

import { makeStyles } from '@material-ui/core/styles';
import RefreshIcon from '@material-ui/icons/Refresh';

const useStyles = makeStyles((theme) => ({
    copyIcon: {
        marginRight: theme.spacing(1)
    },
    right: {
        textAlign: 'right',
        paddingBottom: theme.spacing(1)
    }
}))
export default function Token() {
    const classes = useStyles();
    const clipboard = useClipboard({
        copiedTimeout: 600, // timeout duration in milliseconds
    });
    const [session, setSession] = useState({});

    useEffect(() => {
        const getCurrentSession = async () => {
            try {
                const currentSession = await Auth.currentSession();
                setSession(currentSession)
            } catch (e) {
                console.log(e);
            }
        }
        getCurrentSession();
    }, [])



    const getCurrentSession = async () => {
        try {
            const currentSession = await Auth.currentSession();
            setSession(currentSession)
        } catch (e) {
            console.log(e);
        }
    }

    return <>
        <div className={classes.right}>

            <Button variant="outlined" onClick={getCurrentSession}>
                <RefreshIcon className={classes.copyIcon} /> Refresh Token If Expired
            </Button>
            <Button
                variant="outlined"
                color="primary"
                onClick={clipboard.copy}><FileCopyIcon className={classes.copyIcon} /> {clipboard.copied ? 'Copied!' : 'Copy To Clipboard'}</Button>


        </div>
        <TextField
            multiline
            value={session.accessToken && session.accessToken.jwtToken}
            fullWidth
            rows={8}
            variant="outlined"
            helperText={` Expired At: ${fromUnixTime(session.accessToken && session.accessToken.payload.exp)}`}
            inputProps={{
                ref: clipboard.target
            }}

        />
    </>
}
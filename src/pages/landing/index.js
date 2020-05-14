import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://jagoreact.com/">
                JagoReact.com
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    title: {
        textAlign: 'center'
    }
}));

export default function SignIn() {
    const classes = useStyles();

    const history = useHistory();

    const [form, setForm] = useState({
        poolId: '',
        clientId: ''
    })

    const [error, setError] = useState({

    })

    const handleChange = e => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        })

        setError({
            ...error,
            [e.target.name]: ''

        })
    }

    const validate = () => {
        const newError = {};

        if (!form.poolId) {
            newError.poolId = "Pool ID wajib diisi";
        }

        if (!form.clientId) {
            newError.clientId = "Client ID wajib diisi";
        }

        return newError;
    }


    const handleSubmit = e => {

        e.preventDefault();

        const findErrors = validate();

        if (Object.values(findErrors).some(message => message !== "")) {
            setError(findErrors);
        } else {
            history.push(`/client/${form.poolId}/${form.clientId}`)
        }


    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <VpnKeyIcon />
                </Avatar>
                <Typography component="h1" variant="h5" className={classes.title}>
                    Cognito Client Access Token Generator
        </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="poolId"
                        label="User Pool ID"
                        name="poolId"
                        autoComplete="poolId"
                        autoFocus
                        onChange={handleChange}
                        value={form.poolId}
                        helperText={error.poolId}
                        error={error.poolId ? true : false}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="clientId"
                        label="App Client ID"
                        name="clientId"
                        autoComplete="clientId"
                        onChange={handleChange}
                        value={form.clientId}
                        helperText={error.clientId}

                        error={error.clientId ? true : false}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Open
          </Button>

                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}
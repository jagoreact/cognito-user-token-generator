import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Auth from '@aws-amplify/auth';
import { useAuth } from '../../components/auth';
import Token from './token';

const useStyles = makeStyles(theme => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    buttonProgress: {

        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}))
export default function Login() {

    const classes = useStyles();

    const { setUser, user } = useAuth();

    const [form, setForm] = useState({
        username: '',
        password: '',
        new_password: ''
    });

    const [error, setError] = useState({

    });

    const [loading, setLoading] = useState(false);

    const handleChange = e => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        })

        setError({

        })
    }

    const validateSignIn = () => {
        const newError = {};

        if (!form.username) {
            newError.username = "Username wajib diisi";
        }

        if (!form.password) {
            newError.password = "Password wajib diisi";
        }

        return newError;
    }


    const handleSignIn = async e => {

        e.preventDefault();

        const findErrors = validateSignIn();

        if (Object.values(findErrors).some(message => message !== "")) {
            setError(findErrors);
        } else {
            // history.push(`/client/${form.poolId}/${form.clientId}`)
            setLoading(true)
            try {

                const user = await Auth.signIn(form.username, form.password);

                console.log(user)
                setUser(user);

            } catch (e) {
                console.log(e)
                setError({
                    username: e.message
                })
            }
            setLoading(false)
        }


    }

    const validateUpdatePassword = () => {
        const newError = {};

        if (!form.new_password) {
            newError.new_password = "New Password wajib diisi";
        }



        return newError;
    }
    const handleUpdatePassword = async (e) => {
        e.preventDefault();

        const findErrors = validateUpdatePassword();

        if (Object.values(findErrors).some(message => message !== "")) {
            setError(findErrors);
        } else {
            // history.push(`/client/${form.poolId}/${form.clientId}`)
            setLoading(true);
            try {

                const currentUser = await Auth.completeNewPassword(
                    user, // the Cognito User Object
                    form.new_password, // the new password
                    //   // OPTIONAL, the required attributes
                    //   {
                    //     email: "yudasukmana1992@gmail.com"
                    //   }
                );

                console.log(currentUser)
                //setUser(user);

            } catch (e) {
                console.log(e)
                setError({
                    new_password: e.message
                })
            }
            setLoading(false)
        }
    }

    const handleSignOut = async () => {
        try {

            await Auth.signOut()
            setUser(null);

        } catch (e) {
            console.log(e)
        }
    }

    if (!user) {
        return (<form className={classes.form} noValidate onSubmit={handleSignIn}>
            <TextField
                disabled={loading}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={form.username}
                onChange={handleChange}
                helperText={error.username}
                error={error.username ? true : false}
            />
            <TextField
                disabled={loading}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={form.password}
                onChange={handleChange}
                autoComplete="new-password"
                helperText={error.password}
                error={error.password ? true : false}
            />
            <div className={classes.wrapper}>

                <Button
                    disabled={loading}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Sign In
        </Button>
                {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </div>

        </form>)
    }


    if (user.challengeName) {

        if (user.challengeName === "NEW_PASSWORD_REQUIRED") {

            return (<>
                <Typography variant="h6">NEW PASSWORD REQUIRED</Typography>
                <form className={classes.form} noValidate onSubmit={handleUpdatePassword} >
                    <TextField
                        disabled={loading}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="new_password"
                        label="New Password"
                        type="password"
                        id="new_password"
                        value={form.new_password}
                        onChange={handleChange}
                        autoComplete="new-password"
                        helperText={error.new_password}
                        error={error.new_password ? true : false}
                    />
                    <div className={classes.wrapper}>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={loading}
                        >
                            Update Password
        </Button>
                        {loading && <CircularProgress size={24} className={classes.buttonProgress} />
                        }
                    </div>
                </form></>)
        }

    }

    return <>

        <Typography variant="h6">Welcome, {user.username} (<Button variant="text" onClick={handleSignOut}>SignOut</Button>)!</Typography>
        <Typography >Here are your access token (JWT):</Typography>

        <Token />

    </>
}
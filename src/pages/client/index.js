import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Auth from '@aws-amplify/auth';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';
import Login from './login';
import AuthProvider from '../../components/auth';

import IconButton from '@material-ui/core/IconButton';
import ExitToApp from '@material-ui/icons/ExitToApp';
import GitHubIcon from '@material-ui/icons/GitHub';
const useStyles = makeStyles(theme => ({
    title: {
        flexGrow: 1
    },
    logo: {
        marginRight: theme.spacing(2)
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
}))

export default function Client() {

    const params = useParams();
    const history = useHistory();
    const classes = useStyles()

    const [isConfigured, setConfigured] = useState(false);

    useEffect(() => {

        Auth.configure({


            region: params.poolId.split("_")[0],
            userPoolId: params.poolId,
            userPoolWebClientId: params.clientId

        })
        setConfigured(true)
        console.log({
            region: params.poolId.split("_")[0],
            userPoolId: params.poolId,
            userPoolWebClientId: params.clientId
        })


    }, [params.poolId, params.clientId])

    const handleSignout = async e => {
        try {
            await Auth.signOut();
            history.push("/")
        } catch (e) {
            console.log(e);
        }
    }

    if (!isConfigured) {
        return null
    }
    return <>
        <AuthProvider>
            <AppBar position="absolute" >
                <Toolbar>
                    <VpnKeyIcon className={classes.logo} />
                    <Typography variant="h6" className={classes.title} noWrap>Cognito User Access Token Generator</Typography>
                    <IconButton href="https://github.com/jagoreact/cognito-user-token-generator" color="inherit">
                        <GitHubIcon />
                    </IconButton>
                    <IconButton onClick={handleSignout} color="inherit">
                        <ExitToApp />
                    </IconButton>

                </Toolbar>
            </AppBar>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="md" className={classes.container}>

                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography >
                                User Pool ID: {params.poolId}
                            </Typography>
                            <Typography>
                                App Client ID: {params.clientId}
                            </Typography>

                        </Grid>

                        <Grid item xs={12}>
                            <Login />
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </AuthProvider>
    </>
}
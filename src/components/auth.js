import React, { useState, useEffect, useContext, useCallback } from 'react';
import Auth from '@aws-amplify/auth';

const AuthContext = React.createContext();

export function useAuth() {

    return useContext(AuthContext);
}
export default function AuthProvider(props) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const getUserInfo = async () => {
            setLoading(true);
            try {
                const userInfo = await Auth.currentUserPoolUser();
                console.log(userInfo)
                setUser(userInfo)
            } catch (e) {
                console.log(e)
            }
            setLoading(false);
        }

        getUserInfo();

    }, [])

    const setUserCallback = useCallback((user) => {
        setUser(user);
    }, [])

    return <AuthContext.Provider value={{
        user,
        setUser: setUserCallback,
        loading
    }}>
        {props.children}
    </AuthContext.Provider>

}
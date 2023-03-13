import React, {createContext, useState, useContext, useEffect} from 'react'
import Cookies from 'js-cookie'
import {useRouter,} from 'next/router'
import api from '../utils/api';
import Loading from "@/components/loading";
import {GET_MY_INFO, POST_LOGIN} from "@/constans/urls";


const AuthContext = createContext({});

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter();

    useEffect(() => {
        async function loadUserFromCookies() {
            const token = Cookies.get('token')
            if (token) {
                api.defaults.headers.Authorization = `Bearer ${token}`
                const {data: user} = await api.get(GET_MY_INFO)
                if (user) setUser(user);
            }
            setLoading(false)
        }

        loadUserFromCookies()
    }, [])

    const login = async (email, password) => {

        if (user !== null) return;

        const {data} = await api.post(POST_LOGIN, {identifier: email, password: password})
        const {jwt: token} = data;

        if (token) {
            Cookies.set('token', token, {expires: 60})
            api.defaults.headers.Authorization = `Bearer ${token}`
            const {data: user} = await api.get(GET_MY_INFO)
            setUser(user)
            router.push('/');
        }
    }

    const logout = () => {
        Cookies.remove('token')
        setUser(null)
        delete api.defaults.headers.Authorization
        router.push('/');
    }


    return (
        <AuthContext.Provider value={{isAuthenticated: !!user, user, login, isLoading: loading, logout}}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = () => useContext(AuthContext)


export const ProtectRoute = ({children}) => {

    const router = useRouter();
    const {isAuthenticated, isLoading} = useAuth();

    if (isLoading) return <Loading/>;

    if ((!isAuthenticated && router.pathname !== '/login')) {
        router.push('/login');
        return;
    }

    return children;
};
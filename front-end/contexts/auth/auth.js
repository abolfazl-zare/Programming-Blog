import React, {createContext, useState, useContext, useEffect} from 'react'
import Cookies from 'js-cookie'
import {useRouter,} from 'next/router'
import api from '../../utils/api';
import Loading from "../../components/loading";
import {GET_MY_INFO, POST_LOGIN} from "../../constans/urls";
import {privateRoutes} from "./private-routes";
import {REMOVE, SET, useStore} from "../store/store";


const AuthContext = createContext({});


export const AuthProvider = ({children}) => {

    const [loading, setLoading] = useState(true)
    const router = useRouter();
    const {authenticatedUser, action} = useStore();

    useEffect(() => {
        async function loadUserFromCookies() {
            const token = Cookies.get('token')
            if (token) {
                api.defaults.headers.Authorization = `Bearer ${token}`
                const {data: user} = await api.get(GET_MY_INFO)
                if (user) {
                    action({
                        type: SET,
                        path: "authenticatedUser",
                        payload: user
                    })
                }
                ;
            }
            setLoading(false)
        }

        loadUserFromCookies()
    }, [])

    const login = async (email, password) => {

        if (authenticatedUser) return;

        const {data} = await api.post(POST_LOGIN, {identifier: email, password: password})
        const {jwt: token} = data;

        if (token) {
            Cookies.set('token', token, {expires: 60})
            api.defaults.headers.Authorization = `Bearer ${token}`
            const {data: user} = await api.get(GET_MY_INFO)
            action({
                type: SET,
                path: "authenticatedUser",
                payload: user
            })
            router.push('/');
        }
    }

    const logout = () => {
        Cookies.remove('token')
        action({
            type: REMOVE,
            path: "authenticatedUser",
        })
        delete api.defaults.headers.Authorization
        router.push('/');
    }


    return (
        <AuthContext.Provider value={{isAuthenticated: !!authenticatedUser, login, isLoading: loading, logout}}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = () => useContext(AuthContext)


export const ProtectRoute = ({children}) => {

    const router = useRouter();
    const {pathname} = router;
    const {isAuthenticated, isLoading} = useAuth();

    if (isLoading) return <Loading className="w-100 py-40 flex justify-center"/>;

    if (privateRoutes.includes(pathname) && !isAuthenticated) {
        router.push('/login');
        return;
    }

    return children;
};
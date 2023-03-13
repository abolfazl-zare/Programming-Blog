import '@/styles/globals.css'
import {AuthProvider, ProtectRoute} from "../contexts/auth"
import Layout from "@/components/layout";

import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";

export default function App({Component, pageProps}) {
    return (
        <>
            <AuthProvider>

                <Layout>

                    <ProtectRoute>

                        <Component {...pageProps} />

                    </ProtectRoute>

                </Layout>

            </AuthProvider>
            
            <ToastContainer {...{
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            }}/>
        </>
    )
}

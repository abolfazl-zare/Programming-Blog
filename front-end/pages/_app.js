import '../styles/globals.css'
import {AuthProvider, ProtectRoute} from "../contexts/auth/auth"
import Layout from "../components/layout";
import {StoreProvider} from "../contexts/store/store";

import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import toastConfig from "../constans/toast-config";

export default function App({Component, pageProps}) {
    return (
        <>
            <StoreProvider>

                <AuthProvider>

                    <Layout>

                        <ProtectRoute>

                            <Component {...pageProps} />

                        </ProtectRoute>

                    </Layout>

                </AuthProvider>

            </StoreProvider>

            <ToastContainer {...toastConfig}/>
        </>
    )
}

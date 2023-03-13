import '@/styles/globals.css'
import {AuthProvider, ProtectRoute} from "../contexts/auth"
import Layout from "@/components/layout";

export default function App({Component, pageProps}) {
    return (
        <AuthProvider>

            <Layout>

                <ProtectRoute>

                    <Component {...pageProps} />

                </ProtectRoute>

            </Layout>

        </AuthProvider>
    )
}

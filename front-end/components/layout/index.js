import Navigation from "./navigation";
import {Footer} from "./footer";
import {ToastContainer} from "react-toastify";
import Meta from "@/components/layout/Meta";

function Layout({children}) {
    return (
        <>
            <Meta/>
            
            <Navigation/>

            {children}

            <Footer/>
        </>
    );
}

export default Layout;

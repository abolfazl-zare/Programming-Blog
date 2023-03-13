import Navigation from "./navigation";
import {Footer} from "./footer";
import {ToastContainer} from "react-toastify";

function Layout({children}) {
    return (
        <>
            <Navigation/>

            {children}
            
            <Footer/>
        </>
    );
}

export default Layout;

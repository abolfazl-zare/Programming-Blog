import Navigation from "./navigation";
import {Footer} from "./footer";

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

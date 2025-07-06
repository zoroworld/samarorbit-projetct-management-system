// import Header from "./header";
// import Footer from "./footer";
import { Outlet } from "react-router-dom";

const Main = () =>{
    return (
        <>
            {/* <Header>Website Header</Header> */}
            <main>
                <Outlet />
            </main>
            {/* <Footer>Website Footer</Footer> */}
        </>
    );
}

export default Main;
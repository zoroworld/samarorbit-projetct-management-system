
import { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import Navbar from "./header";
import { Outlet } from "react-router-dom";



const UserLayout = () => {

  const[userData, setUserData] = useState([]);

  const getfetcUserData = async () =>{
    const username = await JSON.parse(localStorage.getItem('user'));
    if (!username) {
       window.location.href = '/login';
       return;
     }
    //  console.log(username);
     
     setUserData(username);
  }

  useEffect(() => {
     
     getfetcUserData();

  }, []);


  return (
    <>
    {!userData ? (
      <div style={{ display: "flex", height: "100vh", justifyContent: "center", alignItems: "center" }}>
        <h1>Loading...</h1>
      </div>
    ) : (
        <div style={{ display: "flex", height: "100vh" }}>
          <div className="col-md-3 col-xl-2 col-xxl-2 sidebar">
             <Sidebar />
          </div>
          
          <div className="col-md-9 col-xl-10 col-xxl-10 main-content">
              <Navbar />
              <main style={{ padding: "1rem" }}>
              <Outlet context={userData}/>
              </main>
               <div className="py-6 px-6 text-center">
                <p className="mb-0 fs-4">Design and Developed by <a href="/" target="_blank" rel="noopener noreferrer">manish panda</a></p>
              </div>
          </div>

        </div>
    )}
    </>
  );
};

export default UserLayout;

// // localStorage.removeItem("token");

// // navigate("/login");

// import "../styles/Header.css";

// import { useNavigate } from "react-router-dom";


// export default function Header(){

// const navigate = useNavigate();


// const logout = ()=>{

//     localStorage.removeItem("token");

//     navigate("/login");

// }


// return(

// <header className="header">


// <div className="logo">

//      SteamGuard

// </div>



// <div className="header-right">


// <span>
//     Admin
// </span>


// <button onClick={logout}>
// Logout
// </button>


// </div>


// </header>


// )

// }

import "../styles/Header.css";
import logo from "../assets/alphacore logo.png";
import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
export default function Header({

    sidebarOpen,
    setSidebarOpen,

    collapsed,
    setCollapsed

})  {
const navigate = useNavigate();
  // Later we'll get this from login API
  const user = {
    name: "Admin",
    email: "admin@alphacore.in"
  };
const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/login", { replace: true });

};
  return (
    <header className="header">

    <div className="header-left">

 <button
    className="menu-btn"
    onClick={() => {

        if (window.innerWidth <= 768) {

            setSidebarOpen(!sidebarOpen);

        } else {

            setCollapsed(!collapsed);

        }

    }}
>
    <Menu size={22} />
</button>

  <img
    src={logo}
    alt="AlphaCore"
    className="header-logo"
  />

  <div>

    <h2>SteamGuard</h2>

    <span>Industrial IIoT Platform</span>

  </div>

</div>
      <div className="header-right">

        <div className="user-info">
          <h4>{user.name}</h4>
          <p>{user.email}</p>
        </div>

        <div className="avatar">
          {user.name.charAt(0)}
        </div>
 <button
    className="header-logout"
    onClick={handleLogout}
>
    Logout
</button>
      </div>

    </header>
  );
}
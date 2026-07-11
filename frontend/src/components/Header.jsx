<<<<<<< HEAD
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
=======
import "../styles/Header.css";

import logo from "../assets/alphacore logo.png";

import { useNavigate } from "react-router-dom";
import { 
  Menu,
  ChevronDown,
  User,
  Settings,
  LogOut
} from "lucide-react";

import { useState, useEffect, useRef } from "react";


>>>>>>> 9e08fb9 (Initial commit)
export default function Header({

    sidebarOpen,
    setSidebarOpen,

    collapsed,
    setCollapsed

<<<<<<< HEAD
})  {
const navigate = useNavigate();
  // Later we'll get this from login API
  const user = {
    name: "Admin",
    email: "admin@alphacore.in"
  };
=======
}) {


const navigate = useNavigate();

const [open, setOpen] = useState(false);

const dropdownRef = useRef(null);



const user = {

    name:"Admin",

    email:"admin@alphacore.in"

};



>>>>>>> 9e08fb9 (Initial commit)
const handleLogout = () => {

    localStorage.removeItem("token");

<<<<<<< HEAD
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
=======
    navigate("/login",{replace:true});

};



useEffect(()=>{


const closeDropdown=(e)=>{

if(
dropdownRef.current &&
!dropdownRef.current.contains(e.target)
){

setOpen(false);

}

};


document.addEventListener(
"mousedown",
closeDropdown
);


return()=>{

document.removeEventListener(
"mousedown",
closeDropdown
);

};


},[]);



return (

<header className="header">


<div className="header-left">


<button

className="menu-btn"

onClick={()=>{


if(window.innerWidth <=768){

setSidebarOpen(!sidebarOpen);

}

else{

setCollapsed(!collapsed);

}


}}

>

<Menu size={22}/>

</button>



<img

src={logo}

alt="AlphaCore"

className="header-logo"

/>


<div className="brand">

<h2>
SteamGuard
</h2>

<span>
Industrial IIoT Platform
</span>

</div>


</div>



<div className="header-right">



<div

className="profile-section"

ref={dropdownRef}

onClick={()=>setOpen(!open)}

>


<div className="user-info">

<h4>
{user.name}
</h4>

<p>
{user.email}
</p>

</div>



<div className="avatar">

{user.name.charAt(0)}

</div>


<ChevronDown 
size={18}
className={
open ? "rotate" : ""
}
/>



{open && (

<div className="profile-dropdown">


<div className="dropdown-user">

<div className="avatar big">

{user.name.charAt(0)}

</div>


<div>

<h4>
{user.name}
</h4>

<p>
{user.email}
</p>

</div>


</div>



<hr/>


<button
onClick={()=>navigate("/profile")}
>

<User size={18}/>

Profile

</button>



<button
onClick={()=>navigate("/settings")}
>

<Settings size={18}/>

Settings

</button>



<hr/>



<button

className="logout-item"

onClick={handleLogout}

>

<LogOut size={18}/>

Logout

</button>



</div>

)}


</div>



</div>


</header>

);

>>>>>>> 9e08fb9 (Initial commit)
}
import "../styles/Header.css";

import logo from "../assets/alphacore logo.png";

import { useNavigate } from "react-router-dom";

import { Menu, ChevronDown } from "lucide-react";

import { useState } from "react";


export default function Header({

    sidebarOpen,
    setSidebarOpen,

    collapsed,
    setCollapsed

}) {


    const navigate = useNavigate();


    const [profileOpen, setProfileOpen] = useState(false);



    const user = {

        name:"Admin",

        email:"admin@alphacore.in"

    };





    const handleLogout = ()=>{


        localStorage.removeItem("token");


        navigate("/login",{

            replace:true

        });


    };





    const toggleSidebar = ()=>{


        if(window.innerWidth <= 768){


            setSidebarOpen(!sidebarOpen);


        }
        else{


            setCollapsed(!collapsed);


        }


    };





    return (

        <header className="header">


            <div className="header-left">


                <button

                    className="menu-btn"

                    onClick={toggleSidebar}

                >

                    <Menu size={22}/>


                </button>





                <img

                    src={logo}

                    alt="SteamGuard"

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

                    className="profile"

                    onClick={()=>setProfileOpen(!profileOpen)}

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
                            profileOpen 
                            ? "rotate"
                            : ""
                        }

                    />




                </div>





                {
                    profileOpen && (

                        <div className="profile-dropdown">


                            <div className="dropdown-user">


                                <h4>
                                    {user.name}
                                </h4>


                                <p>
                                    {user.email}
                                </p>


                            </div>





                            <button

                                onClick={handleLogout}

                                className="dropdown-logout"

                            >

                                Logout


                            </button>



                        </div>

                    )
                }





            </div>



        </header>

    );

}
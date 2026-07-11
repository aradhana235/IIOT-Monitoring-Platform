// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { login } from "../services/authService";
// import { useNavigate } from "react-router-dom";

// import {
//   Box,
//   Button,
//   Checkbox,
//   CircularProgress,
//   FormControlLabel,
//   IconButton,
//   InputAdornment,
//   Paper,
//   TextField,
//   Typography,
// } from "@mui/material";

// import {
//   Visibility,
//   VisibilityOff,
//   EmailOutlined,
//   LockOutlined,
// } from "@mui/icons-material";

// import "../styles/login.css";

// const schema = yup.object({
//   email: yup
//     .string()
//     .email("Please enter a valid email address.")
//     .required("Email is required."),
//   password: yup
//     .string()
//     .min(8, "Password must be at least 8 characters.")
//     .required("Password is required."),
// });

// export default function Login() {
//     const navigate = useNavigate();


//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(schema),
//   });

//   // const onSubmit = async (data) => {
//   //   setLoading(true);

//   //   console.log("Login Request:", data);

//   //   // Next Step:
//   //   // authService.login(data)

//   //   setTimeout(() => {
//   //     setLoading(false);
//   //   }, 1500);
//   // };
// const onSubmit = async (data) => {
//   try {
//     setLoading(true);

//     // const response = await login(data);

//     // alert(response.message);

//     // navigate("/otp", {
//     //   state: {
//     //     email: data.email,
//     //   },
//     // });

//     const response = await login(data);


//     alert(response.message);


//     localStorage.setItem(
//       "userId",
//       response.userId
//     );


//     localStorage.setItem(
//       "email",
//       response.email
//     );
// console.log("Navigating to OTP...");
// console.log(response);


// localStorage.setItem(
//   "userId",
//   response.userId
// );

// localStorage.setItem(
//   "email",
//   response.email
// );


// navigate("/otp", {
//   state: {
//     email: response.email,
//     userId: response.userId
//   },
// });


//   } catch (error) {


//     alert(
//       error.response?.data?.message 
//       || "Login Failed"
//     );


//   } finally {

//     setLoading(false);

//   }

// };

// //   } catch (error) {

// //     alert(
// //       error.response?.data?.message || "Login Failed"
// //     );

// //   } finally {
// //     setLoading(false);
// //   }
// // };
//   return (
//   <Box className="login-container">

//     <Paper elevation={6} className="login-card">

//       <Typography 
//         variant="h4" 
//         fontWeight={700}
//         align="center"
//       >
//         Enterprise IIoT Platform
//       </Typography>


//       <Typography 
//         color="text.secondary" 
//         mb={4}
//         align="center"
//       >
//         Welcome Back
//       </Typography>


//       <form onSubmit={handleSubmit(onSubmit)}>


//         <TextField
//           label="Email Address"
//           fullWidth
//           margin="normal"
//           {...register("email")}
//           error={!!errors.email}
//           helperText={errors.email?.message}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <EmailOutlined />
//               </InputAdornment>
//             ),
//           }}
//         />


//         <TextField
//           label="Password"
//           fullWidth
//           margin="normal"
//           type={showPassword ? "text" : "password"}
//           {...register("password")}
//           error={!!errors.password}
//           helperText={errors.password?.message}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <LockOutlined />
//               </InputAdornment>
//             ),

//             endAdornment: (
//               <InputAdornment position="end">

//                 <IconButton
//                   onClick={() =>
//                     setShowPassword(!showPassword)
//                   }
//                 >

//                   {
//                     showPassword 
//                     ? <VisibilityOff />
//                     : <Visibility />
//                   }

//                 </IconButton>

//               </InputAdornment>
//             ),
//           }}
//         />


//         <Box className="login-options">

//           <FormControlLabel
//             control={<Checkbox />}
//             label="Remember Me"
//           />


//           <Typography className="forgot-password">
//             Forgot Password?
//           </Typography>

//         </Box>


//         <Button
//           type="submit"
//           variant="contained"
//           fullWidth
//           size="large"
//           className="login-btn"
//           disabled={loading}
//         >

//           {
//             loading 
//             ? <CircularProgress color="inherit" size={24}/>
//             : "SIGN IN"
//           }

//         </Button>


//       </form>


//       <Typography
//         mt={4}
//         align="center"
//         color="text.secondary"
//         fontSize={13}
//       >
//         © 2026 Enterprise IIoT Platform
//       </Typography>


//     </Paper>

//   </Box>
// );
// }

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// import { login } from "../services/authService";
// // import companyLogo from "../assets/alphacore logo.png";
// import bgImage from "../assets/login-bg.png";
// import "../styles/Login.css";

// export default function Login() {


//   const navigate = useNavigate();


//   const [email,setEmail] = useState("");
//   const [password,setPassword] = useState("");

//   const [showPassword,setShowPassword] = useState(false);

//   const [loading,setLoading] = useState(false);

//   const [error,setError] = useState("");




//   const handleSubmit = async(e)=>{


//     e.preventDefault();


//     setError("");

//     setLoading(true);



//     try{


//       const response = await login({

//         email,
//         password

//       });



//       console.log(
//         "LOGIN RESPONSE",
//         response
//       );



//       localStorage.setItem(
//         "userId",
//         response.userId
//       );


//       localStorage.setItem(
//         "email",
//         response.email
//       );



//       navigate("/otp",{

//         state:{

//           email:response.email,

//           userId:response.userId

//         }

//       });



//     }
//     catch(err){


//       console.log(err);


//       setError(

//         err.response?.data?.message
//         ||
//         "Login Failed"

//       );


//     }
//     finally{


//       setLoading(false);


//     }


//   };





// return (

// <div className="login-container">

//   <div
//     className="iot-background"
//     style={{
//       backgroundImage: `url(${bgImage})`,
//     }}
//   >
//     <div className="overlay"></div>
//   </div>

// <div className="login-wrapper">

// <div className="login-card">

// <div className="login-header">

// </div>

// <form

// onSubmit={handleSubmit}

// className="login-form"

// >



// {
// error &&

// <div className="error-box">

// ⚠️ {error}

// </div>

// }





// <label>

// Email Address

// </label>



// <div className="input-box">


// <span>
// 📧
// </span>


// <input

// type="email"

// placeholder="Enter email address"

// value={email}

// onChange={(e)=>
// setEmail(e.target.value)
// }

// />


// </div>








// <label>

// Password

// </label>


// <div className="input-box">


// <span>
// 🔑
// </span>


// <input

// type={
// showPassword
// ?
// "text"
// :
// "password"
// }

// placeholder="Enter password"

// value={password}

// onChange={(e)=>
// setPassword(e.target.value)
// }

// />



// <span

// className="eye"

// onClick={()=>
// setShowPassword(!showPassword)
// }

// >

// {
// showPassword
// ?
// "🙈"
// :
// "👁"
// }

// </span>



// </div>






// <div className="forgot">

// Forgot Password?

// </div>







// <button

// disabled={loading}

// className="login-button"

// >


// {

// loading

// ?

// "Signing In..."

// :

// <>
// Sign In
// <span>
// →
// </span>
// </>

// }


// </button>





// </form>







// <div className="footer">

// © 2026 Alphacore Technologies

// </div>





// </div>






// </div>
// </div>

// );


// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

import bgImage from "../assets/login-bg.png";

import "../styles/Login.css";

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");
    setLoading(true);

    try {

      const response = await login({
        email,
        password,
      });

      localStorage.setItem("userId", response.userId);
      localStorage.setItem("email", response.email);

      navigate("/otp", {
        state: {
          email: response.email,
          userId: response.userId,
        },
      });

    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Login Failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="login-page">

      {/* Background */}

      <div
        className="login-bg"
        style={{
          backgroundImage: `url(${bgImage})`
        }}
      >

        <div className="bg-overlay"></div>

      </div>

      {/* Login Card */}

      <div className="login-panel">

        <div className="login-card">

          <div className="login-title">
          </div>

          {error &&

            <div className="error-box">

              {error}

            </div>

          }

          <form
            onSubmit={handleSubmit}
          >

            <label>Email Address</label>

            <div className="input-group">

              <span>👤</span>

              <input

                type="email"

                placeholder="Enter your email"

                value={email}

                onChange={(e) =>
                  setEmail(e.target.value)
                }

              />

            </div>

            <label>Password</label>

            <div className="input-group">

              <span>🔒︎</span>

              <input

                type={
                  showPassword
                    ? "text"
                    : "password"
                }

                placeholder="Enter password"

                value={password}

                onChange={(e) =>
                  setPassword(e.target.value)
                }

              />

              <button
                type="button"
                className="eye-btn"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >

                {
                  showPassword
                    ? "✖"
                    : "👁"
                }

              </button>

            </div>

            <div className="forgot">

              Forgot Password?

            </div>

            <button
              className="login-btn"
              disabled={loading}
            >

              {
                loading
                  ? "Signing In..."
                  : "Sign In →"
              }

            </button>

          </form>

          <div className="copyright">

            © 2026 Alphacore Technologies

          </div>

        </div>

      </div>

    </div>

  );

}
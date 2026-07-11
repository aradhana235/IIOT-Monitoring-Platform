// import React,{useState} from "react";
// import {useNavigate} from "react-router-dom";
// import {verifyOtp} from "../services/authService";


// function Otp(){

// console.log("OTP Page Loaded");
// const navigate = useNavigate();


// const [otp,setOtp]=useState("");

// const [error,setError]=useState("");



// const handleVerify = async(e)=>{

// e.preventDefault();


// try{


// const userId =
// localStorage.getItem("userId");



// const response =
// await verifyOtp({

// userId:Number(userId),

// otp

// });



// console.log(response);



// localStorage.setItem(
// "token",
// response.token
// );



// navigate("/dashboard");



// }
// catch(err){

// console.log(err);

// setError(
// "Invalid OTP"
// );

// }



// };



// return(

// <div className="login-container">


// <div className="login-card">


// <h2>
// Verify OTP
// </h2>


// <form onSubmit={handleVerify}>


// <input

// type="text"

// maxLength="6"

// placeholder="Enter OTP"

// value={otp}

// onChange={
// (e)=>setOtp(e.target.value)
// }

// />



// <button type="submit">

// Verify

// </button>



// {
// error &&
// <p className="error">
// {error}
// </p>
// }



// </form>


// </div>


// </div>


// );


// }

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { verifyOtp,resendOtp  } from "../services/authService";
import bgImage from "../assets/login-bg.png";

import "../styles/otp.css";
import { colors } from "@mui/material";

export default function Otp() {

  const navigate = useNavigate();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);

  const inputRefs = useRef([]);

  useEffect(() => {

    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);

  }, [timer]);

const handleChange = (value, index) => {

    if (!/^\d*$/.test(value)) return;

    // Paste Handle
    if (value.length > 1) {

        const pasted = value.slice(0, 6).split("");

        const newOtp = [...otp];

        pasted.forEach((digit, i) => {

            if (index + i < 6) {
                newOtp[index + i] = digit;
            }

        });

        setOtp(newOtp);

        const nextIndex = Math.min(index + pasted.length, 5);

        inputRefs.current[nextIndex]?.focus();

        return;
    }

    const newOtp = [...otp];

    newOtp[index] = value;

    setOtp(newOtp);

    if (value && index < 5) {
        inputRefs.current[index + 1].focus();
    }

};

  const handleKeyDown = (e, index) => {

    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      inputRefs.current[index - 1].focus();
    }

  };
const handlePaste = (e) => {

    e.preventDefault();

    const pastedData = e.clipboardData
        .getData("text")
        .replace(/\D/g, "")
        .slice(0, 6);

    if (!pastedData) return;

    const newOtp = [...otp];

    pastedData.split("").forEach((digit, index) => {
        newOtp[index] = digit;
    });

    setOtp(newOtp);

    inputRefs.current[Math.min(pastedData.length - 1, 5)]?.focus();

};
const handleResend = async () => {

    try {

        const userId = localStorage.getItem("userId");

        await resendOtp(userId);

        setTimer(60);

        setOtp(["","","","","",""]);

        setError("");

        inputRefs.current[0]?.focus();

    } catch (err) {

        console.log(err);

        setError("Unable to resend OTP");

    }

};

  const handleVerify = async (e) => {

    e.preventDefault();

    const finalOtp = otp.join("");

    if (finalOtp.length !== 6) {

      setError("Please enter 6 digit OTP");
      return;

    }

    try {

      setLoading(true);

      const userId = localStorage.getItem("userId");

      const response = await verifyOtp({

        userId: Number(userId),
        otp: finalOtp

      });

      localStorage.setItem("token", response.token);

      navigate("/home");

    } catch (err) {

      console.log(err);

      setError("Invalid OTP");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="otp-page">

      {/* Background */}

      <div
        className="otp-bg"
        style={{
          backgroundImage: `url(${bgImage})`
        }}
      >

        <div className="otp-overlay"></div>

      </div>

      {/* OTP Panel */}

      <div className="otp-panel">

        <div className="otp-card">

          <div className="otp-header">

           <h3 className="otp-heading">OTP Verification</h3>

            <h6>
              Enter the 6-digit verification code sent to your registered email.
            </h6>

            <p className="otp-email">
              {localStorage.getItem("email")}
            </p>

          </div>

          <form onSubmit={handleVerify}>

            {error && (

              <div className="otp-error">

                ⚠️ {error}

              </div>

            )}
{/* 
            <div className="otp-box-container"> */}
            <div
  className="otp-box-container"
  onPaste={handlePaste}
>

              {otp.map((digit, index) => (

                <input

                  key={index}

                  ref={(el) => (inputRefs.current[index] = el)}

                  type="text"

                  inputMode="numeric"

                  maxLength={1}

                  value={digit}

                  onChange={(e) =>
                    handleChange(e.target.value, index)
                  }

                  onKeyDown={(e) =>
                    handleKeyDown(e, index)
                  }

                  className="otp-input"

                />

              ))}

            </div>
{/* 
            <div className="otp-info">

              OTP sent to your registered email

            </div> */}

            <button

              className="verify-button"

              disabled={loading}

              type="submit"

            >

              {loading
                ? "Verifying..."
                : "Verify & Continue"}

            </button>
<div className="resend">

  {timer > 0 ? (

    <>Resend OTP in {timer}s</>

  ) : (

    <span
      className="resend-link"
      onClick={handleResend}
    >
      Resend OTP
    </span>

  )}

</div>
          </form>

          <div className="otp-footer">

            © 2026 Alphacore Technologies

          </div>

        </div>

      </div>

    </div>

  );

}
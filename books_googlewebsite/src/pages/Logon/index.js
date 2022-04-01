import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import GoogleLogin from "react-google-login";
import './styles.css';

export default function Logon() {
    const history = useNavigate();

    const [loginData, setLoginData] = useState()

    const handleFailure = (result) => {
        alert(result);
    }
    const handleLogin = async (googleData) => {
        localStorage.setItem('loginData', googleData.profileObj.name)
        history("/home");
        console.log(googleData.profileObj.name)

    }

    const handleLogout = () => {
        localStorage.removeItem('loginData');
        setLoginData(null);
    }

    const client_id = "790056714247-4n2q6b9q23j48srcir445g4eogpcjqe4.apps.googleusercontent.com"
    return (
        <div className="logon-container">
            <h1>Books Google</h1>
            <section className="form">
                <GoogleLogin
                    clientId={client_id}
                    buttonText="Login in with Google"
                    onSuccess={handleLogin}
                    onFailure={handleFailure}
                    cookiePolicy={'single_host_origin'}
                >

                </GoogleLogin>

            </section>

        </div>
    )
}
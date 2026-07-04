import React, {useState} from 'react'
import Login from './Login';
import Register from './Register';
import '../style/authPage.css'

function AuthPage() {

    const [isLogin,setIsLogin] = useState(true);

  return (

    <div className={`auth-container ${isLogin ? "login-mode" : "register-mode"}`}>

        <div className="auth-box">


            <div className="form-section">


            {
                isLogin ?

                <Login/>

                :

                <Register switchLogin={()=>setIsLogin(true)} />

            }

            {
                isLogin ?
                <p className="switch-text">
                    Don't have an account?
                    <button onClick={()=>setIsLogin(false)}>
                        Register
                    </button>
                </p>

                :

                <p className="switch-text">
                    Already have an account?
                    <button onClick={()=>setIsLogin(true)}>
                        Login
                    </button>
                </p>

            }


            </div>



            <div className="content-section">


            {

            isLogin ?

            <>
            <h1>
                Welcome Back
            </h1>

            <p>
                Login to continue PRMS platform
            </p>
            </>

            :

            <>
            <h1>
                Create Account
            </h1>

            <p>
                Join our PRMS platform
            </p>
            </>
            }
            </div>
        </div>


    </div>


  )
}

export default AuthPage;
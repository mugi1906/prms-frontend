import React from "react";
import "../style/splashScreen.css";

function SplashScreen() {
    return (
        <div className="splash-screen">

            <div className="splash-content">

                <h1>
                    PRMS
                </h1>

                <p>
                    Project Review Management System
                </p>

                <div className="splash-spinner"></div>

            </div>

        </div>
    );
}

export default SplashScreen;
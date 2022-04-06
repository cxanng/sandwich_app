import React from "react";

import {
    HashRouter as Router,
    Routes,
    Route
} from "react-router-dom"

import NavBar from "./navBarAndFooter/NavBar";
import Homepage from "./homepage/Homepage";

const SandwichApp = () => {
    return (
        <div className="sandwich-app">
            <Router>
                <NavBar />

                <Routes>
                    <Route path="/menu" element={<></>} />
                    <Route path="/" element={<Homepage />} />
                </Routes>
            </Router>
        </div>
    )
};

export default SandwichApp

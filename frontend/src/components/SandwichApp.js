import React from "react";

import {
    HashRouter as Router,
    Routes,
    Route
} from "react-router-dom"

import NavBar from "./navBarAndFooter/NavBar";
import Footer from "./navBarAndFooter/Footer";
import Homepage from "./homepage/Homepage";
import Menu from "./menu/Menu";
import Order from "./order/Order";

const SandwichApp = () => {
    return (
        <div className="sandwich-app">
            <Router>
                <NavBar />

                <Routes>
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/order" element={<Order />} />
                    <Route path="/" element={<Homepage />} />
                </Routes>
            </Router>
            <Footer />
        </div>
    )
};

export default SandwichApp

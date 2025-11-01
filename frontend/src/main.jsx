
import React from "react";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Navbar from "./navbar.jsx";
import Footer from "./footer.jsx";
import ONavbar from "./ownerNav.jsx";

// Mount Header inside #navbar
const navbar = document.getElementById("navbar");
if (navbar) {
    createRoot(navbar).render(
        <StrictMode>
            <Navbar />
        </StrictMode>
    );
}

// Mount Header inside #navbar
const ownerNavbar = document.getElementById("onavbar");
if (ownerNavbar) {
    createRoot(ownerNavbar).render(
        <StrictMode>
            <ONavbar />
        </StrictMode>
    );
}

// Mount Footer inside #footer
const footer = document.getElementById("footer");
if (footer) {
    createRoot(footer).render(
        <StrictMode>
            <Footer />
        </StrictMode>
    );
}


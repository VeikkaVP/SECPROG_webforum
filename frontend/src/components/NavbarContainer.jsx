import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../assets/NavbarContainer.css'; // Import your CSS file

const NavbarContainer = () => {
    // Access userRole from the Redux state
    const userRole = useSelector(state => state.user.user.role);

    // Define navigation links for each role
    const navLinks = {
        guest: [
            { to: "/", text: "Home" },
            { to: "/login", text: "Login" },
            { to: "/register", text: "Register" }
        ],
        user: [
            { to: "/", text: "Home" },
            { to: "/posts", text: "Posts" },
            { to: "/posts/new", text: "New Post" },
            { to: "/logout", text: "Logout" }
        ]
    };

    // Select the correct links to display based on the user's role
    const linksToDisplay = navLinks[userRole?.toLowerCase()] || navLinks['guest'];

    return (
        <nav>
            {linksToDisplay.map(link => (
                <Link key={link.text} to={link.to} className="nav-link"> {/* Apply class */}
                    {link.text}
                </Link>
            ))}
            {" Role: " + userRole}
        </nav>
    );
};

export default NavbarContainer;

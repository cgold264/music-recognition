import React from "react";

class Navbar extends React.Component {   
    render () {
        return(
        <header id="header" class="d-flex flex-column justify-content-center">
            <nav id="navbar" class="navbar nav-menu">
            <ul>
                <li><a href="#home" class="nav-link scrollto active"><i class="bx bx-home"></i> <span>Home</span></a></li>
                <li><a href="#about" class="nav-link scrollto active"><i class="bx bx-user"></i> <span>About</span></a></li>
                <li><a href="#portfolio" class="nav-link scrollto active"><i class="bx bx-book-content"></i> <span>Portfolio</span></a></li>
                {/* {<li><a href="#contact" class="nav-link scrollto active"><i class="bx bx-envelope"></i> <span>Contact</span></a></li>} */}
            </ul>
            </nav>
        </header>
        );
    }
}

export default Navbar;
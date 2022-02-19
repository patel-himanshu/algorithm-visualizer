import React from "react";
import logo from "../../logo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";

const Navbar = () => {
	return (
		<div>
			<nav className="navbar text-light sticky-top">
				<div className="navbar-brand font-weight-bold">
					<img src={logo} alt="Logo" className="logo mr-3" />
					Algorithm Visualizer
				</div>
			</nav>
		</div>
	);
};

export default Navbar;

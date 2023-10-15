import { useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isMobile } from "react-device-detect";
import MenuIcon from "@mui/icons-material/Menu";
import ModalMenu from "../common/ModalMenu";

function Header() {
	const navigate = useNavigate();
	const isScreenSmall = useMediaQuery("(max-width: 500px)");
	const [menuOpen, setMenuOpen] = useState(false);

	const toggleMenu = () => {
		setMenuOpen((prevMenuOpen) => !prevMenuOpen);
	};

	const headerStyles = {
		nav: {
			position: "relative",
			fontSize: "1.2em",
			background: "#182A3A",
			height: "80px",
			width: "100%",
			minWidth: isScreenSmall || isMobile ? "300px" : "500px",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			boxShadow:
				"inset 0px 10px 31px 3px rgba(0,0,0,0.34),0px 5px 21px 0px rgba(0,0,0,0.71)",
			zIndex: 100,
			borderBottom: "1px solid white",
		},
		navContainer:{
			width: "84%",
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center",
		},
		logo: {
			display: "inline-block",
			width:"10%",
			cursor: "pointer",
			color: "white",
			fontWeight: "700",
			fontSize: "1.5em",
			marginLeft: isScreenSmall || isMobile ? "30px" : "0",
			display:"flex",
			justifyContent:"center",
			marginLeft:"20px"
		},
		navUl: {
			padding:"0",
			height: "100%",
			display: "flex",
			justifyContent: "flex-end",
			alignItems: "center",
			fontSize: isScreenSmall || isMobile ? "1em" : "initial",
		},
		navLi: {
			margin: "0 30px",
			cursor: "pointer",
			color: "white",
			fontWeight: "450",
			width:"100px",
			display:"flex",
			justifyContent: "center",
			alignItems: "center",
		},
		linkActive: {
			transition: "0.5s",
			color: "grey",
			display:"flex",
			justifyContent: "center",
			alignItems: "center",
			width:"100px",
			height: isScreenSmall || isMobile ? "initial" : "80px",
			borderBottom: isScreenSmall || isMobile ? "none" : "1px solid red",
		},
		iconContainer: {
			width: "100%",
			display: "flex",
			justifyContent: "flex-end",
		},
		icon: {
			marginRight: "5%",
			fontSize: "1.5em",
			color: "white",
			cursor: "pointer",
		},
		modal: {
			height: "100%",
			width: "100%",
			position: "absolute",
			marginTop: "125px",
			zIndex: 1,
		},
	};

	return (
		<nav style={headerStyles.nav}>
			<div style={headerStyles.navContainer}>
				<p style={headerStyles.logo} onClick={() => navigate("/")}>
					LOGO
				</p>
				{!isScreenSmall || isMobile ? (
					<ul style={headerStyles.navUl}>
						<li style={headerStyles.navLi}>
							<p
								className="hover"
								onClick={() => navigate("/")}
								style={{
									...(window.location.pathname === "/" &&
										headerStyles.linkActive),
								}}
							>
								Home
							</p>
						</li>
						<li style={headerStyles.navLi}>
							<p
								className="hover"
								onClick={() => navigate("/news")}
								style={{
									...(window.location.pathname === "/news" &&
										headerStyles.linkActive),
								}}
							>
								News
							</p>
						</li>
						<li style={headerStyles.navLi}>
							<p
								className="hover"
								onClick={() => navigate("/contact")}
								style={{
									...(window.location.pathname === "/contact" &&
										headerStyles.linkActive),
								}}
							>
								Contact
							</p>
						</li>
					</ul>
				) : (
					<div style={headerStyles.iconContainer}>
						<MenuIcon
							className="hover"
							sx={headerStyles.icon}
							onClick={() => setMenuOpen((prevMenuOpen) => !prevMenuOpen)}
						/>
					</div>
				)}
			</div>
			{menuOpen && isScreenSmall && (
				<div style={headerStyles.modal}>
					<ModalMenu
						headerStyles={headerStyles}
						menuOpen={menuOpen}
						toggleMenu={toggleMenu}
					/>
				</div>
			)}
		</nav>
	);
}

export default Header;

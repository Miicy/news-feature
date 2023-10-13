import { Divider, useMediaQuery } from "@mui/material";
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
            
		},
		navUl: {
			float: "right",
			height: "100%",
			width: "80%",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
		},
		navLi: {
			display: "inline-block",
			margin: "0 40px",
			cursor: "pointer",
			color: "white",
			fontWeight: "450",
		},
		linkActive: {
			transition: "0.5s",
			color: "grey",
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
            height:"100%",
            width:"100%",
			position: "absolute",
			marginTop: "120px",
            zIndex: 1,
            
		},
	};

	return (
		<nav style={headerStyles.nav}>
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
					<Divider orientation="vertical" variant="middle" />
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
					<Divider orientation="vertical" variant="middle" light />
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
			{menuOpen || isScreenSmall && (
				<div style={headerStyles.modal}>
					<ModalMenu headerStyles={headerStyles} menuOpen={menuOpen} toggleMenu={toggleMenu} />
				</div>
			)}
		</nav>
	);
}

export default Header;

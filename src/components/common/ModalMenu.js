import { useNavigate } from "react-router-dom";

function ModalMenu({ headerStyles, menuOpen, toggleMenu }) {
	const modalMenuStyles = {
		...headerStyles,
		container: {
			marginTop: "0",
			backgroundColor: "#455059",
			height: "calc(100vh - 85px)",
			width: "100%",
			boxShadow: "inset 0px 5px 31px 3px rgba(0,0,0,0.34)",
		},
		navUl: {
			...headerStyles.navUl,
			flexDirection: "column",
			justifyContent: "flex-start",
			float: "none",
			width: "none",
			height: "100%",
		},
		navLi: {
			...headerStyles.navLi,
			margin: "40px 0",
		},
	};

	const navigate = useNavigate();

	return (
		<div style={modalMenuStyles.container}>
			<ul style={modalMenuStyles.navUl}>
				<li style={modalMenuStyles.navLi}>
					<p
						className="hover"
						onClick={() => {
							navigate("/");
							toggleMenu();
						}}
						style={{
							...(window.location.pathname === "/" && headerStyles.linkActive),
						}}
					>
						Home
					</p>
				</li>
				<li style={modalMenuStyles.navLi}>
					<p
						className="hover"
						onClick={() => {
							navigate("/news");
							toggleMenu();
						}}
						style={{
							...(window.location.pathname === "/news" &&
								headerStyles.linkActive),
						}}
					>
						News
					</p>
				</li>
				<li style={modalMenuStyles.navLi}>
					<p
						className="hover"
						onClick={() => {
							navigate("/contact");
							toggleMenu();
						}}
						style={{
							...(window.location.pathname === "/contact" &&
								headerStyles.linkActive),
						}}
					>
						Contact
					</p>
				</li>
			</ul>
		</div>
	);
}

export default ModalMenu;

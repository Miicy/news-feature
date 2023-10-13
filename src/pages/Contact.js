import { Breadcrumbs, useMediaQuery } from "@mui/material";
import Link from "@mui/material/Link";
import { isMobile } from "react-device-detect";

function Contact() {
  const isScreenSmall = useMediaQuery("(max-width: 500px)");

	const contactPageStyles = {
		container: {
			width: "95%",
		},
    breadcrumbs:{
      width: "100%",
      display: "flex",
      justifyContent: (isScreenSmall || isMobile) ? "center" : "initial"
    }
	};
	return (
		<div style={contactPageStyles.container}>
			<div style={contactPageStyles.breadcrumbs}>
				<Breadcrumbs aria-label="breadcrumb">
					<Link color="inherit" href="/">
						Home
					</Link>
					<p color="textPrimary">Contact</p>
				</Breadcrumbs>
			</div>
		</div>
	);
}
export default Contact;

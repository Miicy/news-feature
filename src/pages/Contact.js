import { Breadcrumbs, useMediaQuery } from "@mui/material";
import Link from "@mui/material/Link";
import { isMobile } from "react-device-detect";
import BreadcrumbsPage from "../components/common/Breadcrumbs";
import "./pages.css";

function Contact() {
	const isScreenSmall = useMediaQuery("(max-width: 500px)");

	const contactPageStyles = {

	};
	return (
		<div className="innerPageContainer">
			<div className="breadcrumbsContainer">
				<BreadcrumbsPage link={"Contact"} />
			</div>
		</div>
	);
}
export default Contact;

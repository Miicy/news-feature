import Link from "@mui/material/Link";
import { Breadcrumbs, useMediaQuery } from "@mui/material";
import { isMobile } from "react-device-detect";
import { selectScreenSize } from "../../store/reducers/layoutSlice";
import { useSelector } from "react-redux";

function BreadcrumbsPage({ second, link }) {
	const screenSize = useSelector(selectScreenSize);
	
	return (
		<Breadcrumbs
			aria-label="breadcrumb"
			sx={{
				fontSize:
					isMobile || screenSize === "small"
						? "0.85em"
						: screenSize === "medium"
						? "0.95em"
						: "1em",
			}}
		>
			<Link color="inherit" href="/">
				Home
			</Link>
			{second && (
				<Link color="inherit" href={`/${second}`}>
					{second}
				</Link>
			)}
			<p color="textPrimary">{link}</p>
		</Breadcrumbs>
	);
}

export default BreadcrumbsPage;

import Link from "@mui/material/Link";
import { Breadcrumbs } from "@mui/material";
import { isMobile } from "react-device-detect";
import { selectScreenSize } from "../../store/reducers/layoutSlice";
import { useSelector } from "react-redux";

function BreadcrumbsPage({ second, secondUrl, third, thirdUrl, link }) {
	const screenSize = useSelector(selectScreenSize);
	
	return (
		<Breadcrumbs
			aria-label="breadcrumb"
			sx={{
				fontSize:
					isMobile || screenSize === "small"
						? "0.8em"
						: screenSize === "medium"
						? "0.95em"
						: "1em",
			}}
		>
			<Link color="inherit" href="/">
				Home
			</Link>
			{second && (
				<Link color="inherit" href={`/${secondUrl}`}>
					{second}
				</Link>
			)}
			{third && (
				<Link color="inherit" href={`/${thirdUrl}`}>
					{third}
				</Link>
			)}
			<p color="textPrimary">{link}</p>
		</Breadcrumbs>
	);
}

export default BreadcrumbsPage;

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "@mui/material";
import { setScreenSize } from "../store/reducers/layoutSlice";

const ScreenSizeListener = () => {
	const dispatch = useDispatch();
	const isSmallScreen = useMediaQuery("(max-width: 600px)");
	const isMediumSmaller = useMediaQuery("(max-width: 800px)");
	const isMediumScreen = useMediaQuery("(max-width: 1200px)");

	useEffect(() => {
		if (isSmallScreen) {
			dispatch(setScreenSize("small"));
		} else if (isMediumSmaller) {
			dispatch(setScreenSize("medium-s"));
		} else if (isMediumScreen) {
			dispatch(setScreenSize("medium"));
		} else {
			dispatch(setScreenSize("large"));
		}
	}, [dispatch, isSmallScreen, isMediumScreen]);

	return null;
};

export default ScreenSizeListener;

import { isDesktop, isMobile } from "react-device-detect";
import { useCallback, useEffect, useRef, useState } from "react";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useTheme } from "@emotion/react";
import SquareOutlinedIcon from '@mui/icons-material/CropSquare';
import SquareIcon from '@mui/icons-material/SquareRounded';
import { useDispatch, useSelector } from "react-redux";
// import { dispatchGetAllGalleryImages } from "../../adminPanel/adminPanel.actions";
import pic1 from "../../media/background-dark.jpg";
import pic2 from "../../media/background-light.jpg";
import pic3 from "../../media/pic1.jpg";
import pic4 from "../../media/pic2.jpg";
import pic5 from "../../media/pic3.jpg";
import useGetAllNews from "../../helpers/hooks/getAllNews";
import { selectScreenSize } from "../../store/reducers/layoutSlice";

function Gallery() {
	const dispatch = useDispatch();
	const timeRef = useRef(null);
	const [slides, setSlides] = useState([]);
    const screenSize = useSelector(selectScreenSize);
    const allNews = useGetAllNews();

	const images = [pic1, pic2, pic3, pic4, pic5];

	useEffect(() => {
		// dispatch(dispatchGetAllGalleryImages()).then((data) => {
		// 	const galleryImagesArray = data.galleryImages;
		// 	console.log(galleryImagesArray);
		// 	setSlides(galleryImagesArray.map((image) => image.imageURL));
		// });
		setSlides(images.map((image) => image));
	}, [dispatch]);

	const [currentImage, setCurrentImage] = useState(0);

	const handlePreviosClick = () => {
		const isFirstSlide = currentImage === 0;
		const newIndex = isFirstSlide ? slides.length - 1 : currentImage - 1;
		setCurrentImage(newIndex);
	};

	const handleNextClick = useCallback(() => {
		const isLastSlide = currentImage === slides.length - 1;
		const newIndex = isLastSlide ? 0 : currentImage + 1;
		setCurrentImage(newIndex);
	}, [currentImage, slides]);

	const handleSquareClick = (slideIndex) => {
		setCurrentImage(slideIndex);
	};

	useEffect(() => {
		if (timeRef.current) {
			clearTimeout(timeRef.current);
		}
		timeRef.current = setTimeout(() => {
			handleNextClick();
		}, 5000);
		return () => {
			clearTimeout(timeRef.current);
		};
	}, [handleNextClick]);

	//styles
	const theme = useTheme();

	const gallery = {
		container: {
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			alignItems: "center",
			height: "100%",
			width: "100%",
			backgroundImage: `url(${slides[currentImage]})`,
			backgroundPosition: "center",
			transition: isDesktop ? "background-image 0.8s ease" : null,
			backgroundSize: "cover",
			borderRadius: "15px",
			position: "relative",
            
		},
		arrowContainer: {
			backgroundColor: theme.palette.primary.opacity80,
			height: "100%",
			display: "flex",
			alignItems: "center",
			borderTopLeftRadius: "5px",
		},
		arrow: {
			position: "absolute",
			width: "100%",
			height: "100%",
			top: "50%",
			left: "50%",
			transform: "translate(-50%, -50%)",
			color: theme.palette.primary.main,
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center",
		},
		sliderSquare: {
			position: "absolute",
			top: "10px",
			left: "50%",
			transform: "translateX(-50%)",
			width: isDesktop ? "17%" : "50%",
			display: "flex",
			flexDirection: "row",
			justifyContent: "space-around",
			alignItems: "center",
		},
        p:{
            position: "absolute",
            bottom: "0px",
            width:"100%",
            backgroundColor: theme.palette.primary.opacity80,
            height:"250px",
            cursor: "pointer",
            color:theme.palette.opposite.main,

        },
        newsTitle:{
            fontSize: screenSize === "small" || isMobile ? "1em" : "2em",
			marginLeft: screenSize === "small" || isMobile ? "10px" : "20px",
			fontWeight: "bold",

        },
        content:{
            fontSize: screenSize === "small" || isMobile ? "0.9em" : "1.2em",
			margin: screenSize === "small" || isMobile ? "5px 5px" : "5px 30px",
			minHeight:screenSize === "small" || isMobile ? "50px" : "100px",
        },
        date:{
            width:isMobile || screenSize === "small" ? "95%" : "98%",
			display: "flex",
			justifyContent: "flex-end",
			alignItems: "center",
			marginLeft: "10px",
			marginRight: isMobile || screenSize === "small" ? "10px" : "10px",
			fontSize: isMobile && screenSize === "small" || screenSize === "medium"
					? "0.7em"
					: "0.85em",
        }
	};

	return (
		<div style={gallery.container}>
			{/* <div style={gallery.arrow}>
				<div style={gallery.arrowContainer}>
					<NavigateBeforeIcon
						sx={{
							fontSize: isDesktop ? "5.5em" : "3em",
							cursor: "pointer",
							transition: "color 0.3s",
						}}
						className="hover-style"
						onClick={handlePreviosClick}
					/>
				</div>
				<div
					style={{
						...gallery.arrowContainer,
						borderTopLeftRadius: "0px",
						borderTopRightRadius: "5px",
					}}
				>
					<NavigateNextIcon
						sx={{
							fontSize: isDesktop ? "5.5em" : "3em",
							cursor: "pointer",
							transition: "color 0.3s",
						}}
						className="hover-style"
						onClick={handleNextClick}
					/>
				</div>
			</div> */}
			<div style={gallery.sliderSquare}>
				{slides.map((slide, slideIndex) => (
					<div key={slideIndex}>
						{slideIndex === currentImage ? (
							<SquareIcon
								sx={{
									fontSize: isDesktop ? "2.1em" : "1.6em",
									cursor: "pointer",
									transition: "color 0.3s",
									color: theme.palette.red.main,
								}}
								onClick={() => handleSquareClick(slideIndex)}
							/>
						) : (
							<SquareOutlinedIcon
								sx={{
									fontSize: isDesktop ? "2em" : "1.5em",
									cursor: "pointer",
									transition: "color 0.3s",
									color: theme.palette.primary.main,
								}}
								className="hover-style"
								onClick={() => handleSquareClick(slideIndex)}
							/>
						)}
					</div>
				))}
			</div>
            <div style={gallery.p}>
            <p style={gallery.newsTitle}> Title</p>
            <p style={gallery.content}>Content</p>
            <p style={gallery.date}>Date</p>

            </div>
		</div>
	);
}

export default Gallery;

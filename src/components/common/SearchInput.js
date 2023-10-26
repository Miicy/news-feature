import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Divider from "@mui/material/Divider";
import SearchIcon from "@mui/icons-material/SearchOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import { selectScreenSize } from "../../store/reducers/layoutSlice";
import { useSelector } from "react-redux";
import { useTheme } from "@emotion/react";
import { isMobile } from "react-device-detect";

function SearchInput() {
	const [value, setValue] = useState("");
	const theme = useTheme();
	const screenSize = useSelector(selectScreenSize);

	const SearchInputStyles = {
		container: {
			minWidth:
				screenSize === "large"
					? "350px"
					: screenSize === "medium"
					? "250px"
					: screenSize === "medium-s"
					? "200px"
					: "100px",
		},
	};
	return (
		<div style={SearchInputStyles.container}>
			<TextField
				fullWidth
				type="text"
				size="small"
				placeholder="Search..."
				onChange={(e) => setValue(e.target.value)}
				value={value}
				color="opposite"
				InputProps={{
					sx: { width: screenSize === "small" ? "240px" : "100%" },
					endAdornment: [
						value && (
							<InputAdornment>
								<ClearIcon
									onClick={() => setValue("")}
									sx={{ fontSize: "1em" }}
								/>
							</InputAdornment>
						),
						<InputAdornment
							key="searchIcon"
							position="end"
							sx={{ marginRight: -1, height: "2em" }}
						>
							<Divider
								sx={{
									ml: 0.5,
									mr: 0.5,
								}}
								orientation="vertical"
								variant="middle"
							/>
							<SearchIcon sx={{ fontSize: "1.3em", cursor: "pointer" }} />
						</InputAdornment>,
					],
				}}
			/>
		</div>
	);
}

export default SearchInput;

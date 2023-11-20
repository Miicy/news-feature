import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Divider from "@mui/material/Divider";
import SearchIcon from "@mui/icons-material/SearchOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import { selectScreenSize } from "../../store/reducers/layoutSlice";
import { useSelector } from "react-redux";
import SearchModal from "./SearchModal";

function SearchInput({ onSearch, filteredNews  }) {
	const [value, setValue] = useState("");
	const screenSize = useSelector(selectScreenSize);
	const [keyPressed, setKeyPressed] = useState(false);
	
	const handleSearch = () => {
		onSearch(value);
	};

	const clearInput = () => {
		setValue("");
		setKeyPressed(false);
	};

	const handleKeyPress = () => {
		onSearch(value);
		if (!keyPressed) {
			setKeyPressed(true);
		}
	};

	const SearchInputStyles = {
		container: {
			position:"relative",
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
				onKeyDown={handleKeyPress}
				InputProps={{
					sx: { width: screenSize === "small" ? "240px" : "100%" },
					endAdornment: (
						<InputAdornment position="end">
							{value && (
								<ClearIcon
									onClick={clearInput}
									sx={{ fontSize: "1em", cursor: "pointer" }}
								/>
							)}
							<Divider
								sx={{
									ml: 0.5,
									mr: 0.5,
								}}
								orientation="vertical"
								variant="middle"
							/>
							<SearchIcon
								onClick={handleSearch}
								sx={{ fontSize: "1.3em", cursor: "pointer" }}
							/>
						</InputAdornment>
					),
				}}
			/>
			{keyPressed && value && <SearchModal filteredNews={filteredNews} />}
		</div>
	);
}

export default SearchInput;

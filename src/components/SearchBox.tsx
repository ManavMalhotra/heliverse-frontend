import { Search } from "@mui/icons-material";
import { Box, TextField } from "@mui/material";

function SearchBox({
  searchQuery,
  setSearchQuery,
}: {
  serachQuery: string;
  setSearchQuery: Function;
}) {
  return (
    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
      <Search sx={{ color: "action.active", mr: 1, my: 0.5 }} />
      <TextField
        label={searchQuery ? searchQuery : "Search"}
        variant="standard"
        onInput={(e) => {
          // set time after 2 seconds
          setTimeout(() => {
            setSearchQuery(e.target.value);
          }, 2000);
        }}
        value={searchQuery}
        id="margin-normal input-with-sx"
        margin="normal"
      />
    </Box>
  );
}

export default SearchBox;

import Box from "@mui/material/Box";
import Filters from "../Filters";
import MovieList from "../MovieList";

export default function Body() {
    return (
        <Box sx={{
            display: 'flex',
            gap: '12px',
            padding: '12px',
            maxWidth: { xs: '65%', sm: '75%', md: '85%', lg: '100%', },
        }}>
            <Filters />
            <MovieList />
        </Box>
    );
};
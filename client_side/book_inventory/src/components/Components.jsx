import { Box, Container, Typography } from "@mui/material"
import { topbar, page } from "./Styles"


export const Topbar = () => {

    return (
        <Box sx={topbar}>
            <Typography variant="h1" sx={page}>Book Inventory</Typography>
        </Box>
        
    )
}
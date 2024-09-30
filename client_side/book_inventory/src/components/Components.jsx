import { Box, Container, Typography } from "@mui/material"
import { topbar, page, row, padding } from "./Styles"
// import PersonIcon from '@mui/icons-material/Person';
import { Book, Person } from "@mui/icons-material"

export const Topbar = () => {

    return (
        <Box sx={{...topbar, ...padding}}>
            <Box sx={row}>
                <Book />
                <Typography variant="h1" >Book Inventory</Typography>    
            </Box>
            
            <Box sx={{...row,  bgcolor: '', width: '10rem'}}> 
                <Person />
                <Typography variant="h6">User</Typography>    
            </Box>
            
        </Box>
        
    )
}
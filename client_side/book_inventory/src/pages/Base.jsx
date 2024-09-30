import { Box } from "@mui/material"
import { Topbar } from "../components/Components"
import { Outlet } from "react-router-dom"
import { card, page } from "../components/Styles"


const Base = () => {

    return (
        <Box sx={{p: 1}}>
            <Topbar />
            <Box sx={{...page, ...card}}>
                <Outlet />    
            </Box>
        </Box>
    ) 
}

export default Base
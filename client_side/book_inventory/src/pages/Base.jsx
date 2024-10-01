import { Box } from "@mui/material"
import { Topbar } from "../components/Topbar"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { page } from "../components/Styles"
import { getAccessToken, getRefreshToken } from "./authentication/auth"
import { useEffect } from "react"


const Base = () => {
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        const accessToken = getAccessToken();
        const refreshToken = getRefreshToken();

        if (!accessToken || !refreshToken) {
            navigate('/login');
        } else {
            if (location.pathname === "/") {
                navigate('/books');
            }
        }
    }, [navigate]);

    return (
        <Box>
            <Topbar />
            <Box sx={{...page}}>
                <Outlet />    
            </Box>
        </Box>
    ) 
}

export default Base
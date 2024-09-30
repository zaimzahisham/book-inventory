import { Box, Container, Typography } from "@mui/material"
import { topbar, page, row, padding } from "./Styles"
// import PersonIcon from '@mui/icons-material/Person';
import { Book, Person } from "@mui/icons-material"
import { useEffect, useState } from "react"
import config from "../config"
import { axiosInstance } from "../pages/authentication/auth"
import { useNavigate } from "react-router-dom"
import universalCookie from "universal-cookie"

export const Topbar = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const cookie = new universalCookie('/');

    const fetchUser = async () => {
        try{
            const apiUrl = config.server_url + '/user/'
            const response = await axiosInstance.get(apiUrl)
            setUser(response.data)    
            cookie.set("is_author", response.data.is_author, {
                httpOnly: false,
                secure: false,
                path: '/'
            });
            console.log("topbar", response.data)
        }catch(error){
            navigate('/login')
        }
        
    }

    useEffect(() => {
        fetchUser()
    }, [])
    
    return (
        <Box sx={{...topbar, ...padding}}>
            <Box sx={row}>
                <Book />
                <Typography variant="h1" >Book Inventory</Typography>    
            </Box>
            
            <Box sx={{...row,  bgcolor: '', width: '10rem'}}> 
                <Person />
                <Typography variant="h6">{user?.username}</Typography>    
            </Box>
            
        </Box>
        
    )
}
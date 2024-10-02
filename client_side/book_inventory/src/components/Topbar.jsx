import { Box, Container, Typography } from "@mui/material"
import { topbar, page, row, padding } from "./Styles"
import { Book, Person } from "@mui/icons-material"
import { useEffect, useState } from "react"
import config from "../config"
import { axiosInstance, clearJwtCookie } from "../pages/authentication/auth"
import { useNavigate } from "react-router-dom"
import universalCookie from "universal-cookie"
import BasicMenu from "./BasicMenu"

export const Topbar = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const cookie = new universalCookie('/')
    const [menuItems, setMenuItems] = useState([])
    const [itemsOnClick, setItemsOnClick] = useState([])


    const fetchUser = async () => {
        try{
            const apiUrl = config.server_url + '/user/'
            const response = await axiosInstance.get(apiUrl)
            setUser(response.data)    
            const isAuthor = response.data.is_author
            cookie.set("is_author", isAuthor, {
                httpOnly: false,
                secure: false,
                path: '/'
            });

            if (isAuthor) {
                setMenuItems(["Add Book", "Logout"])
                setItemsOnClick([addBook, logout])
            }else{
                setMenuItems(["Logout"])
                setItemsOnClick([logout])
            }
        }catch(error){
            console.log(`topbar fetchUser error: ${error}`)
            navigate('/login')
        }
        
    }

    const logout = () => {
        try{
            clearJwtCookie()
            navigate('/')
        }catch(error){
            console.log(`logout error: ${error}`)
        }
    }

    const addBook = () => {
        navigate('books/add')
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
                <Person sx={{bgcolor:'', mb: 0.5,}}/>
                <BasicMenu title={user?.username} menuItems={menuItems} itemsOnClick={itemsOnClick} />
            </Box>
            
        </Box>
        
    )
}
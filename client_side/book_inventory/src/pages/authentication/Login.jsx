import { Typography, Box, Card, TextField, Button } from "@mui/material"
import { centerBox, column, page, row, textInput, theme } from "../../components/Styles"
import { Book } from "@mui/icons-material"
import { axiosInstance, noCredentialsAxiosInstance, setJwtCookie } from "./auth"
import config from "../../config"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [Password, setPassword] = useState('')

    const login = async () => {
        try{
            const apiUrl = config.server_url + '/user/token/'
            const data = {
                username: username,
                password: Password
            }
            console.log(apiUrl, data)
            const response = await noCredentialsAxiosInstance.post(apiUrl, data)
            const token = response.data;
            setJwtCookie(token)
            axiosInstance.defaults.headers['Authorization'] = `Bearer ${token.access}`
            if (response.status === 200) {
                console.log("login success")
                navigate('/')
            }else{
                console.log("There is an error while logging in")
            }
            
        }catch(error){
            console.log('Error occurred while logging in:', error)
        }
    }


    return (
        <Box sx={{...page, ...centerBox}}>
            <Card sx={{width: '30rem', boxShadow: 3, p: 3}}>
                <Box sx={{...row, color: theme.palette.primary.main}}>
                    <Book />
                    <Typography variant="h2">Book Inventory</Typography>       
                </Box>
                <Box sx={{...column, p: 1, mt: 2}}>
                    <Typography variant="h1" mb={2}>Login</Typography> 
                    <Typography variant="h3">Username</Typography>
                    <TextField sx={textInput} onChange={(e) => setUsername(e.target.value)}/>
                    <Typography variant="h3">Password</Typography>
                    <TextField type="password" sx={textInput} onChange={(e) => setPassword(e.target.value)}/>
                    <Button variant="contained" sx={{width: 1, mb: 1}} onClick={login}>Login</Button>
                    <Typography variant="h3" textAlign={'center'}>Don't have an account? <a href="/register">Register</a></Typography>
                </Box>  
            </Card>
        </Box>
        
    )
}

export default Login
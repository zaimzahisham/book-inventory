import { Typography, Box, Card, TextField, Button } from "@mui/material"
import { column, page, row, textInput, theme } from "../../components/Styles"
import { Book } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { noCredentialsAxiosInstance } from "./auth"
import config from "../../config"

const Register = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [Password, setPassword] = useState('')

    const register = async () => {
        try{
            const apiUrl = config.server_url + '/user/register/'
            const data = {
                username: username,
                email: email,
                password: Password
            }
            console.log(apiUrl, data)
            const response = await noCredentialsAxiosInstance.post(apiUrl, data)
            console.log(response)
            if (response.status === 201) {
                navigate('/login')
            }else{
                console.log("There is an error while registering")
            }
            
        }catch(error){
            console.log('Error occurred while registering:', error)
        }
    }

    return (
        <Box sx={{...page, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Card sx={{width: '30rem', boxShadow: 3, p: 3}}>
                <Box sx={{...row, color: theme.palette.primary.main}}>
                    <Book />
                    <Typography variant="h2">Book Inventory</Typography>       
                </Box>
                <Box sx={{...column, p: 1, mt: 2}}>
                    <Typography variant="h1" mb={2}>Register</Typography> 
                    <Typography variant="h3">Username</Typography>
                    <TextField sx={textInput} onChange={(e) => setUsername(e.target.value)}/>
                    <Typography variant="h3">Email</Typography>
                    <TextField sx={textInput} onChange={(e) => setEmail(e.target.value)}/>
                    <Typography variant="h3">Password</Typography>
                    <TextField type="password" sx={textInput} onChange={(e) => setPassword(e.target.value)}/>
                    <Button variant="contained" sx={{width: 1, mb: 1}} onClick={register}>Register</Button>
                </Box>  
            </Card>
        </Box>
        
    )
}

export default Register
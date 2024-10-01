import { Typography, Box, Card, TextField, Button } from "@mui/material"
import { centerBox, column, page, row, textInput, theme } from "../../components/Styles"
import { ArrowBackIos, Book } from "@mui/icons-material"
import config from "../../config"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { axiosInstance } from "../authentication/auth"
import { red } from "@mui/material/colors"

const BookForm = ({method}) => {
    const navigate = useNavigate()
    const { id } = useParams();
    const [book, setBook] = useState(null)

    const constructApiUrl = () => {
        var apiUrl = config.server_url + '/api/books/'
        if (method === 'Update') {
            apiUrl += `${id}/`
        }
        return apiUrl
    }

    const createOrUpdateBook = async () => {
        try{
            const apiUrl = constructApiUrl()
            console.log(apiUrl)
            console.log(book)
            const response = method === 'Update' ? await axiosInstance.put(apiUrl, book) : await axiosInstance.post(apiUrl, book)
            if (response.status === 200 || response.status === 201) {
                console.log(method + " success")
                navigate('/')
            }else{
                console.log(`createOrUpdateBook: ${method} Error occurred`)
            }
            
        }catch(error){
            console.log('createOrUpdateBook: Unexpected Error occurred', error)
        }
    }

    const fetchBook = async () => {
        try{
            const apiUrl = constructApiUrl()
            const response = await axiosInstance.get(apiUrl)
            setBook(response.data)
            console.log(`fetched book:`, response.data)
        }catch(error){
            console.log('Error occurred while fetching book:', error)
        }
    }

    const deleteBook = () => {
        try{
            const apiUrl = constructApiUrl()
            axiosInstance.delete(apiUrl)
            navigate('/')
        }catch(error){
            console.log('Error occurred while deleting book:', error)
        }
    }

    useEffect(() => {
        console.log("ID?", id)
        if (id) {
            fetchBook()
        }
    } 
    , [])


    return (
        <Box sx={{...page}}>
            <Box sx={{ ...centerBox}}>
                <Card sx={{width: '30rem', boxShadow: 3, p: 3}}>
                    <Box sx={{...row, color: theme.palette.primary.main}}>
                        <ArrowBackIos sx={{cursor: 'pointer'}} onClick={() => navigate('/')}/>
                        <Book />
                        <Typography variant="h2">{method} Book</Typography>       
                    </Box>
                    <Box sx={{...column, p: 1, mt: 2}}>
                        <Typography variant="h3">Title</Typography>
                        <TextField sx={textInput} value={book?.title} onChange={(e) => setBook({...book, title: e.target.value})}/>
                        <Typography variant="h3">Author</Typography>
                        <TextField sx={textInput} value={book?.author} onChange={(e) => setBook({...book, author: e.target.value})}/>
                        <Typography variant="h3">Genre</Typography>
                        <TextField sx={textInput} value={book?.genre} onChange={(e) => setBook({...book, genre: e.target.value})}/>
                        <Typography variant="h3">Description</Typography>
                        <TextField sx={textInput} value={book?.description} onChange={(e) => setBook({...book, description: e.target.value})}/>
                        <Typography variant="h3">Price (RM)</Typography>
                        <TextField type="number" sx={textInput} value={book?.price} onChange={(e) => setBook({...book, price: e.target.value})}/>
                        <Typography variant="h3">PublicationDate</Typography>
                        <TextField type="date" sx={textInput} value={book?.publication_date} onChange={(e) => setBook({...book, publication_date: e.target.value})}/>
                        <Button variant="contained" sx={{width: 1, mb: 1}} onClick={createOrUpdateBook}>{method}</Button>
                        {
                            !id? null:
                            <Button variant="outlined" sx={{width: 1, mb: 1, borderColor: red[500], color: red[500]}} onClick={deleteBook}>Delete</Button>
                        }
                    </Box>  
                </Card>    
            </Box>
            
        </Box>
        
    )
}

export default BookForm
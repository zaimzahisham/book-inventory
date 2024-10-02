import { Typography, Box, Button, IconButton } from "@mui/material"
import { centerBox, column, page, row, rowColumn } from "../../components/Styles"
import { useEffect, useState } from "react"
import { axiosInstance } from "../authentication/auth"
import config from "../../config"
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material"
import BookCard from "./BookCard"
import BasicPaginator from "../../components/BasicPaginator"

const Books = () => {
    const [books, setBooks] = useState([])
    const [pageInfo, setPageInfo] = useState({})

    const fetchBooks = async (page) => {
        try{
            const apiUrl = page?? config.server_url + '/api/books/'
            console.log(`fetchbooks url: ${apiUrl}`)
            const response = await axiosInstance.get(apiUrl)
            setBooks(response.data.results)
            console.log("books", response.data.results)

            delete response.data.results
            setPageInfo(response.data)
            console.log("page info", response.data)
        }catch(error){
            console.log('Error occurred while fetching books:', error)
        }
    }

    useEffect(() => {
        fetchBooks()
    }, [])

    return (
        <Box sx={{...page}}>
            <Box sx={{...column, ...centerBox}}>
                <Typography variant="h2" sx={{textAlign: 'center'}}>POPULAR BOOKS</Typography>    
                <Typography variant="h1" sx={{textAlign: 'center'}}>Here are our popular books you might like</Typography>     
                <Box sx={{...row}}>
                    <Button variant="contained">View All</Button>
                    <Button variant="outlined">Explore More</Button>
                </Box>
                <Box sx={{...rowColumn, ...centerBox}}>
                    {
                        books.map((book) => {
                            return (
                                <BookCard book={book} />
                                
                            )
                        })
                    }
                </Box>
                <BasicPaginator pageInfo={pageInfo} onPrevious={() => fetchBooks(pageInfo.links.previous)} onNext={() => fetchBooks(pageInfo.links.next)}/>
            </Box>
            
        </Box>
        
    )
}

export default Books
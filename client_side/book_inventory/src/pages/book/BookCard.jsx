import { FavoriteBorderOutlined } from "@mui/icons-material"
import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material"
import { getIsAuthor } from "../authentication/auth"
import { useNavigate } from "react-router-dom"
import { cardButton, centerBox, column } from "../../components/Styles"
import { grey } from "@mui/material/colors"
import noPhotoImage from '../../assets/no-photo.png';

const BookCard = ({book}) => {
    const isAuthor = getIsAuthor()
    const navigate = useNavigate()

    return (
        <Card sx={{width: '15rem', margin: 2}}>
            <Box sx={{ position: 'relative' }}>
                <CardMedia sx={{...centerBox, height: '15rem', bgcolor: grey[200]}} title={book.title} image={noPhotoImage} />
                <Box sx={{position: 'absolute', bottom: 0, left: 0, right: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', p: 2}}>
                    <Typography variant="h2" sx={{bgcolor: 'background.paper', borderRadius: 1, fontWeight: 'bold', p: 1, boxShadow: 2}}>
                        ${book.price}
                    </Typography>
                    {isAuthor? 
                    <Button variant="contained" sx={{ ...cardButton }} onClick={() => navigate(`/books/update/${book.id}`)}>Edit</Button>
                    :   
                    <Button variant="contained" sx={{ ...cardButton }} startIcon={<FavoriteBorderOutlined />}>
                        Save
                    </Button>
                    }
                </Box>    
            </Box>
            
            <CardContent sx={{height: '15rem'}}>
                <Box sx={{...column}}>
                    <Typography variant="h2">{book.title}</Typography>
                        <Typography variant="h3">{book.author}</Typography>
                    <Typography variant="h4">Genre: {book.genre}</Typography>
                    <Typography variant="h4" sx={{fontStyle: "italic"}}>{book.description}</Typography>
                    <Typography variant="h5">Published on: {book.publication_date}</Typography>    
                </Box>
            </CardContent>
            {
                !isAuthor? null :
                <CardActions sx={{justifyContent: 'end'}}>
                    
                </CardActions>    
            }
        </Card>
    )
}

export default BookCard
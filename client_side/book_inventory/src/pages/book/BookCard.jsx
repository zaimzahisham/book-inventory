import { ImageNotSupportedOutlined } from "@mui/icons-material"
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material"
import { getIsAuthor } from "../authentication/auth"
import { useNavigate } from "react-router-dom"
import { centerBox, theme } from "../../components/Styles"
import { grey } from "@mui/material/colors"

const BookCard = ({book}) => {
    const isAuthor = getIsAuthor()
    const navigate = useNavigate()

    return (
        <Card sx={{width: '17.5rem', margin: 2}}>
            <CardMedia sx={{...centerBox, height: '15rem', bgcolor: grey[200]}} title={book.title} >
                <ImageNotSupportedOutlined sx={{height: 0.5, width: 0.5, color: theme.palette.secondary.main}}/>
            </CardMedia>
            <CardContent sx={{height: '15rem'}}>
                <Typography variant="h2">{book.title}</Typography>
                <Typography variant="h4">{book.genre}</Typography>
                <Typography variant="h3">{book.author}</Typography>
                <Typography variant="h4">{book.publication_date}</Typography>
                <Typography variant="h4">{book.description}</Typography>
                <Typography variant="h3">{book.price}</Typography>    
            </CardContent>
            {
                !isAuthor? null :
                <CardActions sx={{justifyContent: 'end'}}>
                    <Button variant="outlined" onClick={() => navigate(`/books/update/${book.id}`)}>Edit</Button>
                </CardActions>    
            }
        </Card>
    )
}

export default BookCard
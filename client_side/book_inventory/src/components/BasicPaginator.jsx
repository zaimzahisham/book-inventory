import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material"
import { Box, IconButton, Typography } from "@mui/material"
import { centerBox, row } from "./Styles"


const BasicPaginator = ({pageInfo, onPrevious, onNext}) => {
    return(
        <Box sx={{...row, ...centerBox}}>
            <IconButton onClick={onPrevious}>
                <ArrowBackIosNew/>
            </IconButton>
            <Typography variant="h3">{pageInfo.page} of {pageInfo.total_pages}</Typography>
            <IconButton  onClick={onNext}>
                <ArrowForwardIos/>
            </IconButton>
        </Box>
    )
}

export default BasicPaginator
import { Box, Grid, Typography } from "@mui/material"
import useStyles from "./styles"

const Home = ()=>{
    const classes = useStyles();
    return (
        <Grid>
            <Box className ={classes.root}>
                <Typography variant="h3">
                    Lista de Tareas
                </Typography>
            </Box>
            <Box>

            </Box>
        </Grid>
    )

}

export default Home
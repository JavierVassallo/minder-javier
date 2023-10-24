import { Box, Grid, Typography } from "@mui/material"
import useStyles from "./styles"
import Task from "./Task";

const Home = ()=>{
    const classes = useStyles();
    return (
        <Grid className ={classes.root}>
            <Box >
                <Typography variant="h3">
                    Lista de Tareas
                </Typography>
            </Box>
            <Box>
            <Box>
                <Typography>
                    Pendientes
                </Typography>
                <Grid>
                    <Task />
                </Grid>
            </Box>
            <Box>
                <Typography>
                    Pendientes
                </Typography>
                <Grid>
                    
                </Grid>
            </Box>
            </Box>
            
        </Grid>
    )

}

export default Home
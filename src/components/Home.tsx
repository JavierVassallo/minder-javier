import { Box, CircularProgress, Grid, IconButton, Typography } from "@mui/material"
import useStyles from "./styles"
import Task from "./Task";
import { useGet } from "../hooks/useFetch";
import { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import ModalCreate from "./ModalCreate";
const Home = ()=>{
    const classes = useStyles();
    const { data, loading, error,refetch } = useGet('http://localhost:3000/tasks');
    const { data: dataCategories, loading : loadingCategories, error: errorCategories } = useGet('http://localhost:3000/categories');
    const [pendientes,setPendientes]= useState([])
    const [finalizadas,setFinalizadas]= useState([])
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleRefetch = ()=>{
        refetch()
    }
    useEffect(()=>{
      if(data && dataCategories){
        
        let pen =[]
        let fin = []
        data.forEach((task)=>{
            if(task.completed){
                const categoria = task.category = dataCategories.find((element)=> element.id === task.category_id)
                fin.push({...task,category:categoria})
                
            }else{
                const categoria2 = dataCategories.find((element)=> element.id === task.category_id)
                pen.push({...task, category:categoria2})
            }
        })
        
        setPendientes(pen)
        setFinalizadas(fin)
      }  
    },[data,dataCategories])
    return (
        error ? 
        <p>Hubo un error en la carga de datos</p>
        : 
        loading ? 
        (<Box className ={classes.root}>
            <CircularProgress />
        </Box> )
        : 
        (<><Grid className ={classes.root}>
            <Box>     
                <Box>
                    <Typography variant="h3">
                        Lista de Tareas
                    </Typography>
                </Box>
                <Box>
                
                    <Box>
                    <p className ={classes.categories}>
                        Pendientes
                    </p>
                    <Grid>
                        {pendientes.length > 0 && pendientes.map((p,index)=>{
                                return <Task key={index} data={p} handleRefetch={handleRefetch} />
                        })}
                        
                    </Grid>
                </Box> : <Box>
                    <p className ={classes.categories}>
                        Terminadas
                    </p>
                    <Grid>
                    {finalizadas.length > 0 && finalizadas.map((f, index)=>{
                                return <Task key={index} data={f} handleRefetch={handleRefetch} />
                        })}
                    </Grid>
                </Box>  
                
               
                </Box>
            </Box>
            
            
        </Grid>
        <Box className={classes.boxButtonRoot}>
            <Box className={classes.boxButton}>
            <IconButton style={{background:'blue'}} onClick={handleClickOpen}>
                <AddIcon style={{color:'#fff'}}/>
            </IconButton>
            </Box>
        </Box>
        <ModalCreate 
            loadingCategories={loadingCategories} 
            categories={dataCategories} open={open} 
            handleClose={handleClose}
            handleRefetch={handleRefetch}
        />
        </>
        )
    )

}

export default Home
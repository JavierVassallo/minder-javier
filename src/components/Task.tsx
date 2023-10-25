import { Box, Card, Checkbox, Typography } from "@mui/material"
import { usePut } from "../hooks/useFetch";
import { useEffect } from "react";

const Task = ({data, handleRefetch})=>{
    const { sendPutData, loadingPut , errorPut } = usePut(`http://localhost:3000/tasks/${data.id}`);
   
    const handleChange = async ()=>{
        data.completed = !data.completed
        let respuesta = await sendPutData(data)
        
        
        handleRefetch()
    }
    useEffect(()=>{
        if(errorPut){
            alert('no se pudo actualizar')
        }
    },[errorPut])
    return (
         <Card style={{width:'30vw', backgroundColor:data.category?.color ?? '#fff', marginBottom:'3vh' }}>
       
                <Box style={{display:'flex', justifyContent:'start', alignItems:'center', }}>
                        <Checkbox  checked={data.completed}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }} 
                        />
                        <Box style={{marginLeft:'1vw'}}>
                            <Typography style={{fontSize:'1.2rem'}}>{`${data.category?.name} : ${data.title}`}</Typography>
                            <Typography style={{fontSize:'1rem'}}>{data.description}</Typography>
                        </Box>
                    
                </Box>
        </Card>)

       
}

export default Task
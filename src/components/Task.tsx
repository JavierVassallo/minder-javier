import { Box, Card, Checkbox, Typography } from "@mui/material"
import { useState } from "react"

const Task = ()=>{
    const [checked,setChecked] = useState(false)
    const handleChange = ()=>{
        setChecked(!checked)
    }
    return (
         <Card style={{width:'20vw', backgroundColor:'green'}}>
       
                <Box style={{display:'flex', justifyContent:'start', alignItems:'center', }}>
                    <Checkbox  checked={checked}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }} />
                    <Typography>aljsdnalskd</Typography>
                </Box>
        </Card>)

       
}

export default Task
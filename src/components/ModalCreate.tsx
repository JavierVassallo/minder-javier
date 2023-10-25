import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { usePost } from '../hooks/useFetch';

const ModalCreate = ({open,handleClose, categories,loadingCategories,handleRefetch})=>{
  
  const { sendPostData, loadingPost, errorPost } = usePost('http://localhost:3000/tasks');
 
  const [category,setCategory] = useState("")
  const [errorCategory,setErrorCategory] =useState(false)

  const [description,setDescription] =useState("")

  const [title,setTitle] =useState("")
  const [errorTitle,setErrorTitle] =useState(false)

  const handleChangeCategory = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
    setErrorCategory(false)
  };

  const crearTarea = async ()=>{
    if(!category || !title){
      !category && setErrorCategory(true)
      !title && setErrorTitle(true)
      return
    }
    const postData = {
                    id: uuidv4(),
                    title,
                    description,
                    category_id: category,
                    completed: false
                   }
    
    const response = await sendPostData(postData);
    if(errorPost){
      alert('hubo un error al crear la tarea')
      return
    }
    if (response) {
      // Realizar acciones después de una solicitud POST exitosa
      console.log('Solicitud POST exitosa:', response);
      handleClose()
      handleRefetch()
    }

  }
  

    return (
      loadingCategories ? '.... cargando' :
        <div >
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            
          >
            <DialogTitle id="alert-dialog-title">
              {"Nueva Tarea"}
            </DialogTitle>
            <DialogContent style={{minWidth:'30vw',display:'flex', justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
         
                  <TextField 
                    error={errorTitle}
                    helperText={errorTitle ? "Titulo Obligatorio" : null}
                    inputProps={{ maxLength: 40 }} 
                    sx={{minWidth: '80%'}} 
                    id="title-text-field" 
                    onChange={(e)=>{setTitle(e.target.value);setErrorTitle(false)}} 
                    label="Titulo" 
                    variant="standard" 
                    value={title} 
                  />
                  <TextField 
                    inputProps={{ maxLength: 100 }} 
                    sx={{minWidth: '80%'}} 
                    id="description-text-field" 
                    onChange={(e)=>{setDescription(e.target.value)}} 
                    label="Descripcion" 
                    variant="standard" 
                    value={description} 
                  />
                  <FormControl variant="standard" sx={{ m: 1, minWidth: '80%' }}>
                    <InputLabel id="select-categories-label">Categoria</InputLabel>
                    <Select
                      labelId="select-categories-label"
                      id="select-categories"
                      value={category}
                      onChange={handleChangeCategory}
                      label="Categoria"
                      error={errorCategory}
                    >
                      
                      {categories.map((c,index)=>{
                        return <MenuItem key={index} value={c.id}>{c.name}</MenuItem>
                      })}
                      
                    </Select>
                  </FormControl>
             
            </DialogContent>
            <DialogActions>
              <Button variant='outlined' onClick={handleClose}>Cancelar</Button>
              {/*uso el loadingPost para retornar una funcion vacia para que no se pueda 
              presionar el boton muchas veces y evitar el multiclick y el crear muchas tareas iguales 
              de forma inconciente */}
              <Button variant='contained' onClick={ loadingPost ? ()=>{} : crearTarea} >
                {loadingPost ? 'creando ...' : 'Crear'}
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
}

export default ModalCreate;
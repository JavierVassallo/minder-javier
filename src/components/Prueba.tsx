import { useEffect, useState } from "react";
import { useGet, usePost } from "../hooks/useFetch";

const Prueba = ()=>{
const { data, loading, error,refetch } = useGet('http://localhost:3000/tasks');
const { data: dataCategories, loading : loadingCategories, error: errorCategories,refetch: refetchCategories } = useGet('http://localhost:3000/categories');

useEffect(()=>{
console.log(data,loading,error)
console.log(dataCategories,loadingCategories,errorCategories)
},[data,loading,error,dataCategories,loadingCategories,errorCategories])

const reload = ()=>{
    refetch()
}

const reloadCategories = ()=>{
    refetchCategories()
}
const [postData, setPostData] = useState({
    category_id:"46265b1f-ffba-5cd2-9d55-36ec7e3ac095",
    completed:false,
    description :"Biasdasdasden maduros",
    id: "asdas",
    title:"Comprar 1kg dasdasdasdsde tomates"});
  const { sendPostData, loadingPost, errorPost } = usePost('http://localhost:3000/tasks');

  const handlePost = async () => {
    const response = await sendPostData(postData);

    if (response) {
      // Realizar acciones después de una solicitud POST exitosa
      console.log('Solicitud POST exitosa:', response);
    }
  };
        
  

return <>{loadingPost && <div>Cargando...</div>}
{errorPost && <div>Error: {errorPost?.message}</div>}<button onClick = {reload}>refetch</button>
<button onClick = {handlePost}>postear</button>
<button onClick = {reloadCategories}>reload cat</button></>
}

export default Prueba
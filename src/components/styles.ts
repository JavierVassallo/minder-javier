import { makeStyles } from '@mui/styles';

 const useStyles = makeStyles(() => ({
  root: {
    display:'flex',
    justifyContent:'center',
    alignItem:'center'
  },
  categories:{
    fontSize:'1.8rem',
    fontWeight:700,
  },
  boxButtonRoot:{
    display:'flex',
    justifyContent:'center', 
    marginTop:'2vh'
  },
  boxButton:{
    display:'flex',
    justifyContent:'flex-end', 
    width:'35vw'
  }
}));

export default useStyles

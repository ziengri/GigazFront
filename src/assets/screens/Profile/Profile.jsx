import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Container,
    Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle,
    Fab,
    Grid, TextField,Paper,
    Typography
} from "@mui/material";
import axios from '../../../../axios'
import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined';
import EngineeringOutlinedIcon from '@mui/icons-material/Engineering';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch ,useSelector} from "react-redux";
import { useEffect,useState } from "react";
import { fetchObjects } from "../../../redux/slices/objectSlice";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";





function Profile() {
    const {items,status}=useSelector(state=>state.object)
    const [load,setLoad] = useState()
    const dispatch = useDispatch();
    useEffect(()=>{
        // dispatch(fetchObjects())
    },[])
    const {
        register,
        handleSubmit,
        setError,
        formState:{errors,isValid}
    }=useForm({
        defaultValues:{
            buildingName:'',
            buildingAddress:''
        },
        mode:'onChange'
    });
    const onSubmit= async (values)=>{
        console.log('Add Obj: ',values)
        axios.post(`api/building`,values).then((res)=>{
            setLoad(Math.random())
            setOpen(false)
            console.log("пРИХОД",res.data)
        }).catch((err)=>{
            console.log(err)
        })
    }
    const [open,setOpen] = useState(false)
     return(
        <Container>
            <Paper sx={{marginTop:"20px"}}>
                <Typography variant="h4" sx={{textAlign:"center"}}>Профиль</Typography>
                
            </Paper>
        </Container>
     )
 }
 export default Profile
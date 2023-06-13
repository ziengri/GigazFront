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
    Grid, TextField,
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




const cart=(
    <Card >
        <CardContent>
            <Typography variant='h4' sx={{textAlign:'center'}}>Дом</Typography>
            <Typography variant='h6' sx={{textAlign:'center'}}>г.Казань</Typography>
        </CardContent>
        <CardActions sx={{
            display:'flex',flexDirection:'column'
        }}>
            <Button  size="large" variant='contained' sx={{}}> <EngineeringOutlinedIcon sx={{mr:'0.2em'}}/>Учет рабочих</Button>
            <Button  size="large" variant='contained' sx={{mt:'0.8em'}}><WarehouseOutlinedIcon sx={{mr:'0.2em'}}/>Склад</Button>
        </CardActions>
    </Card>
)
function Objects() {
    const {items,status}=useSelector(state=>state.object)
    const [load,setLoad] = useState()
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchObjects())
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
            {/*display:'flex',justifyContent:'space-between'*/}
            <Box sx={{display:'flex',mt:"0.9em",mb:'0.4em'}}> <Typography sx={{textAlign:'center',flexGrow:1}} variant='h4'>Обьекты</Typography>
                <Fab onClick={()=>(setOpen(true))} size="medium" color="secondary" aria-label="add"><AddIcon /></Fab>
            </Box>
                <Dialog open={open} onClose={()=>(setOpen(false))}>
                <form onSubmit={handleSubmit(onSubmit)}> 
                    <DialogTitle>Добавить объект</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Название объекта"
                            error={Boolean(errors.buildingName?.message)}
                            helperText={errors.buildingName?.message}
                            {...register('buildingName',{required:'Введите название'})}
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Адрес объекта"
                            error={Boolean(errors.buildingAddress?.message)}
                            helperText={errors.buildingAddress?.message}
                            {...register('buildingAddress',{required:'Введите адрес'})}
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={()=>(setOpen(false))}>Отменить</Button>
                        <Button type="submit" variant='outlined'>Добавить</Button>
                    </DialogActions>
                    </form>
                </Dialog>
            <Grid container spacing={7}>
                {status=='loading'? (<p>Loading</p>):
                items.map((item,index)=>(
                <Grid key={index} item xs={12} sm={6} md={4} >
                    <Card >
                        <CardContent>
                            <Typography variant='h4' sx={{textAlign:'center'}}>{item.name}</Typography>
                            <Typography variant='h6' sx={{textAlign:'center'}}>{item.address}</Typography>
                        </CardContent>
                        <CardActions sx={{
                            display:'flex',flexDirection:'column'
                        }}>
                            <Button  size="large" component={Link} to={`/objects/accounting/${item._id}`} variant='contained' sx={{}}> <EngineeringOutlinedIcon sx={{mr:'0.2em'}}/>Учет рабочих</Button>
                            <Button  size="large" component={Link} to={`/objects/storage/${item.storageId}`} variant='contained' sx={{mt:'0.8em'}}><WarehouseOutlinedIcon sx={{mr:'0.2em'}}/>Склад</Button>
                        </CardActions>
                    </Card>
                </Grid>    
                ))}
                {/* <Grid item xs={12} sm={6} md={4}>
                    {cart}
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    {cart}
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    {cart}
                </Grid> */}

            </Grid>
        </Container>
     )
 }
 export default Objects
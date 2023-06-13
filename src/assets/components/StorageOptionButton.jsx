import {useState,useEffect} from 'react'
import {
    Box,
    Divider,
    Button,
    Card,
    CardActions,
    CardContent,
    Container,
    Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle,
    Fab,
    Grid, TextField,
    Typography,InputAdornment,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,Paper,IconButton,Menu,MenuItem,Select,InputLabel
} from "@mui/material";
import StyledMenu from "./StyledMenu";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InventoryIcon from '@mui/icons-material/Inventory';
import AddIcon from '@mui/icons-material/Add';
import axios from '../../../axios';
import { useDispatch,useSelector } from 'react-redux';
import { fetchObjects } from '../../redux/slices/objectSlice';
import { useParams } from 'react-router';
import { useForm } from 'react-hook-form';




{/* <Button onClick={()=>(setOpen(true))} variant="contained" sx={{height:'50px'}} aria-label="add"><AddIcon /></Button>
<Dialog open={Dopen} onClose={()=>(setOpen(false))}>
    <DialogTitle>Добавить продукт</DialogTitle>
    <DialogContent>
        <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Название продукта"
            type="text"
            fullWidth
            variant="standard"
        />
        <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Количество"
            type="number"
            fullWidth
            variant="standard"
        />
    </DialogContent>
    <DialogActions>
        <Button onClick={()=>(setOpen(false))}>Отменить</Button>
        <Button onClick={()=>(setOpen(false))} variant='outlined'>Добавить</Button>
    </DialogActions>
</Dialog> */}
const StorageOptionButton=(props)=> {
    const {id} = useParams()
    const [count,setCount] = useState(1)
    const [items,setItems] = useState()
    const {
        register,
        handleSubmit,
        setError,
        formState:{errors,isValid}
    }=useForm({
        defaultValues:{
            count:1,
            to:''
        },
        mode:'onChange'
    });
    const {
        register:register2,
        handleSubmit:handleSubmit2,
        setError:setError2,
        formState:{errors:errors2,isValid:isValid2}
    }=useForm({
        defaultValues:{
            name:props.productName,
            count:props.productCount
        },
        mode:'onChange'
    });
    const onEditSubmit= async (values)=>{
        console.log('Edit: ',values)
        axios.patch(`api/storage/${id}`,values).then((res)=>{
            props.setLoad(Math.random())
            setEditOpen(false)
            console.log("пРИХОД",res.data)
        }).catch((err)=>{
            console.log(err)
            return(
                <p>Ошиька</p>
            )
        })
    }
    const onSubmit= async (values)=>{
        console.log(values)
        const delivery={
            "name":props.productName,
            "count":values.count,
            "from":id,
            "to":values.to,
        }
        console.log('Delivery: ',delivery)
        axios.post(`api/delivery`,delivery).then((res)=>{
            props.setLoad(Math.random())
            setSendOpen(false)
            console.log("пРИХОД",res.data)
        }).catch((err)=>{
            console.log(err)
            return(
                <p>Ошиька</p>
            )
        })
    }
    const onClickDelete= async (values)=>{
        const delivery={
            "name":props.productName
        }
        console.log('Delivery: ',delivery)
        axios.post(`api/storage/delete-item/${id}`,delivery).then((res)=>{
            props.setLoad(Math.random())
            setDeleteOpen(false)
            console.log("пРИХОД",res.data)
        }).catch((err)=>{
            console.log(err)
            return(
                <p>Ошиька</p>
            )
        })
    }
    useEffect(()=>{
        console.log(id)
        axios.get(`api/building/storage/${id}`).then((res)=>{
            console.log("пРИХОД",res.data)
            setItems(res.data)
        }).catch((err)=>{
            console.log(err)
            return(
                <p>Ошиька загрузки</p>
            )
        })
        
    },[])
    const [sendOpen,setSendOpen] = useState(false)
    const [deleteOpen,setDeleteOpen] = useState(false)
    const [editOpen,setEditOpen] = useState(false)

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
     return(
     <>
        <IconButton aria-label="more"
         id="demo-customized-menu"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined} 
        aria-haspopup="true" 
        onClick={handleClick}
        >
            <MoreVertIcon />
        </IconButton>
        <StyledMenu
         id="demo-customized-menu"
         MenuListProps={{
         'aria-labelledby': 'demo-customized-button',}}
         anchorEl={anchorEl}
         open={open}
         onClose={handleClose}
        >
            <MenuItem key='1' disableRipple  onClick={()=>{setSendOpen(true)}}><SendIcon/> Отправить</MenuItem>
                <Dialog  open={sendOpen} onClose={()=>(setSendOpen(false))}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogTitle>Отправить продукт</DialogTitle>
                    <DialogContent>
                        <Typography variant='h6'>
                        {props.productName}
                        </Typography>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Количество"
                            error={Boolean(errors.count?.message)}
                            helperText={errors.count?.message}
                            type="number"
                            {...register('count',{required:'Должно быть больше 0 и меньше количества'})}
                            value={count}
                            onChange={(event) => {
                                console.log(event.target.value)
                                console.log(props)
                              if(!(event.target.value>props.productCount || event.target.value<1)){
                                console.log("Ok")
                                setCount(event.target.value);
                              }
                            }}
                            fullWidth
                            variant="standard"
                        />
                        <InputLabel id="demo-simple-select-standard-label">Куда отправить</InputLabel>
                        <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        label="Куда отправить"
                        fullWidth
                        variant="standard"
                        error={Boolean(errors.to?.message)}
                        helperText={errors.to?.message}
                        {...register('to',{required:'Выбирите склад отправки'})}
                        >
                            {!items?<></>:items.map((el,index)=>(
                            <MenuItem key={index} value={el.storageId}>{el.name}</MenuItem>
                            ))}

                        </Select>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={()=>(setSendOpen(false))}>Отменить</Button>
                        <Button type='submit' variant='outlined'>Добавить</Button>
                    </DialogActions>
                    </form>
                </Dialog>
            <MenuItem key='1' disableRipple onClick={()=>{setDeleteOpen(true)}}><DeleteIcon/> Удалить</MenuItem>
            <Dialog open={deleteOpen} onClose={()=>(setDeleteOpen(false))}>
                    <DialogTitle>Удалить продукт</DialogTitle>
                    <DialogContent>
                        <Typography variant='h7'>
                            Вы действительно хотите удалить продукт?
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={()=>(setDeleteOpen(false))}>Отменить</Button>
                        <Button onClick={onClickDelete} variant='outlined'>Удалить</Button>
                    </DialogActions>
                </Dialog>
            <MenuItem key='1' disableRipple onClick={()=>{setEditOpen(true)}}><EditIcon/>Изменить</MenuItem>
            <Dialog open={editOpen} onClose={()=>(setEditOpen(false))}>
                    <form onSubmit={handleSubmit2(onEditSubmit)}>
                    <DialogTitle>Изменить продукт</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                             id="name"
                            label="Название продукта"
                            error={Boolean(errors2.name?.message)}
                            helperText={errors2.name?.message}
                            {...register2('name',{required:'Введите название'})}
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="count"
                            error={Boolean(errors2.count?.message)}
                            helperText={errors2.count?.message}
                            {...register2('count',{required:'Введите кол-во'})}
                            label="Количество"
                            type="number"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={()=>(setEditOpen(false))}>Отменить</Button>
                        <Button type='submit' variant='outlined'>Изменить</Button>
                    </DialogActions>
                    </form>
                </Dialog>
        </StyledMenu>
     </>
     )
 }
 export default StorageOptionButton
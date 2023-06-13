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
    TableRow,Paper,IconButton,Menu,MenuItem
} from "@mui/material";
import StorageOptionButton from "../../components/StorageOptionButton";

import InventoryIcon from '@mui/icons-material/Inventory';
import AddIcon from '@mui/icons-material/Add';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

import axios from "../../../../axios";
import {useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import * as dayjs from 'dayjs'
import DeliveryDialog from "../../components/DeliveryDialog";
import { useForm } from "react-hook-form";





function Storage() {
    const [find,setFind] = useState('')
    const onFindChange=(ev)=>{
        setFind(ev.target.value);
        console.log("Changed")
    }
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
    const onSubmit= async (values)=>{
        console.log(values)
        axios.put(`api/storage/${id}`,values).then((res)=>{
            setLoad(Math.random())
            setOpen(false)
            console.log("пРИХОД",res.data)
        }).catch((err)=>{
            console.log(err)
            return(
                <p>Ошиька</p>
            )
        })
    }
    const [load,setLoad] = useState()
    const [isLoading,setIsLoading] = useState(true)
    const [data, setData] = useState();
    const { id } = useParams();
    console.log(id)
    useEffect(() =>{
        axios.get(`/api/storage/${id}`).then((res)=>{
            setData(res.data);
            setIsLoading(false)
        }).catch((err)=>{
            console.log(err)
            return(
                <p>Ошиька загрузки</p>
            )
        })
    },[load])

    let azat = "pidor"
    const [Dopen,setOpen] = useState(false)
    const [deliveryOpen,setDeliveryOpen] = useState(false)

    
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    if (isLoading) {
        return(
            <p>Loading</p>
        )
    }
     return(
        <Container maxWidth="md">
            <Typography>--Веррнуться к обектам</Typography>
            <Box  sx={{marginTop:"35px",borderRadius:"10px"}}>
                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'space-around',alignItems:'center',flexWrap:'wrap'}}>
                    <TextField
                            sx={{marginBottom:'18px',width:'320px',margin:'15px auto'}}
                            id="input-with-icon-textfield"
                            label="Поиск товара"
                            value={find}
                            onChange={(event) => onFindChange(event)}
                            InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                <InventoryIcon/>
                                </InputAdornment>
                            ),
                            }}
                            variant="outlined"
                    />
                    <Button onClick={()=>(setOpen(true))} variant="contained" sx={{height:'50px'}} aria-label="add"><AddIcon /></Button>
                    <Dialog open={Dopen} onClose={()=>(setOpen(false))}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                        <DialogTitle>Добавить продукт</DialogTitle>
                        
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Название продукта"
                                error={Boolean(errors.name?.message)}
                                helperText={errors.name?.message}
                                {...register('name',{required:'Введите название продукта'})}
                                type="text"
                                fullWidth
                                variant="standard"
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Количество"
                                {...register('count')}
                                type="number"
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
                    <Button onClick={()=>(setDeliveryOpen(true))} variant="contained" sx={{height:'50px'}} color="success" aria-label="add"><LocalShippingIcon/></Button>
                    <Dialog open={deliveryOpen}  maxWidth='lg' fullWidth={true} onClose={()=>(setDeliveryOpen(false))}>
                        <DialogTitle>Заявки доставок</DialogTitle>
                        <DialogContent>
                            <DeliveryDialog/>
                        </DialogContent>
                    </Dialog>
                </Box>
            <Typography>Список товаров</Typography>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label='simple table'>
					<TableHead>
						<TableRow>
							<TableCell align='left'>Товар</TableCell>
							<TableCell alignя='left'>Кол-Во</TableCell>
                            <TableCell alignя='center'></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{!data?<p>Loading..</p>:(find==''?data.products.map((row,index) => (
							<TableRow
								key={index}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
								<TableCell component='th'align='left' scope='row'>
									{row.name}
								</TableCell>
								<TableCell align='left'>{row.count}шт</TableCell>
                                <TableCell>
                                <StorageOptionButton 
                                productName={row.name}
                                productCount={row.count}
                                setLoad={setLoad}

                                /> 
                                </TableCell>
							</TableRow>
						)):data.products.filter(function (el) {
                            const str =el.name.toLowerCase()||''
                            console.log(str)
                            return  str.includes(find.toLowerCase())
                          }).map((row,index) => (
                            <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component='th'align='left' scope='row'>
                                    {row.name}
                                </TableCell>
                                <TableCell align='left'>{row.count}шт</TableCell>
                                <TableCell>
                                    <StorageOptionButton 
                                    productName={row.name}
                                    productCount={row.count}
                                    setLoad={setLoad}/> 
                                </TableCell>
                            </TableRow>
                        )))}
					</TableBody>
				</Table>
			</TableContainer>
            </Box>
        </Container>
     )
 }
 export default Storage
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
    TableRow,Paper,Checkbox
} from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';
import {useState,useEffect} from "react";
import { useSelector,useDispatch } from "react-redux";
import { fetchDeliveryAll } from "../../../redux/slices/deliverySlice";
import { useParams } from "react-router";
import axios from '../../../../axios'


function Delivery() {
    const [open,setOpen] = useState(false)
    const {deliverys} = useSelector(state=>state.delivery)
    const dispatch= useDispatch()

    const onStartClick =  (ev,id)=>{
        axios.patch(`api/delivery/start/${id}`).then((res)=>{
            dispatch(fetchDeliveryAll())})
    }
    const onFinishClick = (ev,id)=>{
        axios.patch(`api/delivery/finish/${id}`).then((res)=>{
            dispatch(fetchDeliveryAll())})
    }
    useEffect(()=>{
        dispatch(fetchDeliveryAll())
    },[])
     return(
            <Container  sx={{marginTop:"35px",borderRadius:"10px"}}>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label='simple table'>
					<TableHead>
						<TableRow>
							<TableCell align='center'>Товар</TableCell>
							<TableCell >Количество</TableCell>
                            <TableCell >Из</TableCell>
							<TableCell >В</TableCell>
							<TableCell >Статус</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
                        {!deliverys?<p>Loading...</p>:deliverys.map((item,index)=>(
							<TableRow
                            key={item._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component='th'align='center' scope='row'>
                                {item.name}
                            </TableCell>
                            <TableCell >
                            {item.count}шт
                            </TableCell>
                            <TableCell >
                            {item.from}
                            </TableCell>
                            <TableCell >
                            {item.to}
                            </TableCell>
                            <TableCell>
                            {item.status=='Ожидает прибытия'?
                            (
                                <Box sx={{display:'flex',alignItems:'center'}}>
                                    <Button  onClick={(ev)=>{onFinishClick(ev,item.id)}} variant="outlined" color="success" startIcon={<DoneIcon color="success"/>}>
                                                Доставить
                                    </Button>
                                </Box>
                            ):(item.status=='Ожидает отправки'?(
                            <Box sx={{display:'flex',alignItems:'center'}}>
                                      <Button onClick={(ev)=>{onStartClick(ev,item.id)}} variant="outlined" startIcon={<ScheduleSendIcon color="primary"/>}>
                                                Начать отправку
                                      </Button>
                            </Box>
                            ):(
                            <Box sx={{display:'flex',alignItems:'center'}}>
                                Прибыло
                            </Box>
                                ))
                            }

                            </TableCell>
                        </TableRow>
                        ))}
					</TableBody>
				</Table>
			</TableContainer>
            </Container>
     )
 }
 export default Delivery
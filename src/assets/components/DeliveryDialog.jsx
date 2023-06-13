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
import { fetchDeliveryByObject } from "../../redux/slices/deliverySlice";
import { useParams } from "react-router";


function DeliveryDialog() {
    const {id} =useParams()
    const [open,setOpen] = useState(false)
    const {deliverys} = useSelector(state=>state.delivery)
    const dispatch= useDispatch()
    useEffect(()=>{
        dispatch(fetchDeliveryByObject(id))
    },[])
     return(
            <Box  sx={{marginTop:"35px",borderRadius:"10px"}}>
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
                                    <HourglassEmptyIcon color="warning"/>Ожидает прибытия
                                </Box>
                            ):(item.status=='Ожидает отправки'?(
                            <Box sx={{display:'flex',alignItems:'center'}}>
                                <ScheduleSendIcon color="primary"/>Ожидает отправки
                            </Box>
                            ):(
                            <Box sx={{display:'flex',alignItems:'center'}}>
                                <DoneIcon color="success"/>Прибыло
                            </Box>
                                ))
                            }

                            </TableCell>
                        </TableRow>
                        ))}
					</TableBody>
				</Table>
			</TableContainer>
            </Box>
     )
 }
 export default DeliveryDialog
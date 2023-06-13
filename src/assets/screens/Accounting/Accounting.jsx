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
import axios from "../../../../axios";
import KeyIcon from '@mui/icons-material/Key';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {useEffect, useState} from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useSelector,useDispatch } from "react-redux";
import { useParams } from "react-router";
import * as dayjs from 'dayjs'
import { fetchAccountingByDate } from "../../../redux/slices/accountingSlice";

function createData(name, tel, money, supervizor, object, spec) {
	return { name, tel, money, supervizor, object, spec }
}

const rows = [
	createData('Павел Котов', '+7(939)386-73-96', '20 000руб', 'Серегей Александович', 'ТЭЦ', 'Разнорабочий'),
	createData('Павел Котов', '+7(939)386-73-96', '20 000руб', 'Серегей Александович', 'ТЭЦ', 'Разнорабочий'),
	createData('Павел Котов', '+7(939)386-73-96', '20 000руб', 'Серегей Александович', 'ТЭЦ', 'Разнорабочий'),
	createData('Павел Котов', '+7(939)386-73-96', '20 000руб', 'Серегей Александович', 'ТЭЦ', 'Разнорабочий'),
	createData('Павел Котов', '+7(939)386-73-96', '20 000руб', 'Серегей Александович', 'ТЭЦ', 'Разнорабочий')
]

function Accounting() {
    const { id } = useParams();
    const [find,setFind] = useState('')
    const [date,setDate] = useState(dayjs().format('YYYY-MM-DD'))
    const [open,setOpen] = useState(false)
    const {items,status} = useSelector(state=>state.accounting)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchAccountingByDate({date,id}))
    },[])
    console.log(items)
    const onFindChange=(ev)=>{
        setFind(ev.target.value);
        console.log("Changed")
        if(ev.target.value!=''){
            const ar = items.workers.filter(function (el) {
                const str =el.workerId.fullName.toLowerCase()||''
                console.log(str)
                return  str.includes(find.toLowerCase())
              });
            console.log(ar)
        }
    }
    const onDateChange=(val)=>{
        const Y = val.$y
        const W = ((val.$M+1) < 10 ? '0' : '') + (val.$M+1)
        const D = (val.$D < 10 ? '0' : '') + val.$D
        const seletedDate = `${Y}-${W}-${D}`
        setDate(seletedDate)
        dispatch(fetchAccountingByDate({date:seletedDate,id}))
    }
    const onCheckBoxChange=async (event)=>{
        // console.log("Try to change",event)
        console.log(event.target.id)
        console.log(event.target.checked)

        const res = await axios.patch(`api/building/${id}`,{"date": date,"status":event.target.checked,"workerId":event.target.id})
        // __reactProps$miz1uzjqo4n
        console.log(res)



        
    }
     return(
        <Container maxWidth="md">
            <Typography>--Веррнуться к обектам</Typography>
            <Box  sx={{marginTop:"35px",borderRadius:"10px"}}>
                <Box sx={{display:'flex',flexDirection:'row',justifyContent:'space-between',flexWrap:'wrap'}}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <   DatePicker onChange={onDateChange} label="Выбор даты" sx={{width:'320px',margin:'15px auto'}} format="YYYY/MM/DD" defaultValue={dayjs()} />
                    </LocalizationProvider>
                    <TextField
                            sx={{marginBottom:'18px',width:'320px',margin:'15px auto'}}
                            id="input-with-icon-textfield"
                            label="ФИО"
                            value={find}
                            onChange={(event) => onFindChange(event)}
                            InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                <AccountCircleIcon/>
                                </InputAdornment>
                            ),
                            }}
                            variant="outlined"
                    />
            </Box>
            <Typography>Список рабочих</Typography>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label='simple table'>
					<TableHead>
						<TableRow>
							<TableCell align='center'>ФИО</TableCell>
							<TableCell alignя='center'>Был</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
                        {/* {console.log(!Boolean(items)} */}
						{(!Boolean(items)&&status=='loading' || status=="error")?<p>Loading</p>:(find==''?items?.workers?.map((row) => (
                            (row.workerId?.fullName?(
                                <TableRow
                                key={row.workerId._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component='th'align='center' scope='row'>
                                    {row.workerId.fullName}
                                </TableCell>
                                <TableCell align='center'>
                                    <Checkbox defaultChecked={row.was} aria-label={row.workerId._id} id={row.workerId._id} onChange={onCheckBoxChange} size="small"sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />
                                </TableCell>
                            </TableRow>
                            ):<></>)

                        )):items?.workers?.filter(function (el) {
                            const str =el.workerId?.fullName?.toLowerCase()||''
                            console.log(str)
                            return  str.includes(find.toLowerCase())
                          }).map((row) => (
                            <TableRow
                                key={row.workerId._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component='th'align='center' scope='row'>
                                    {row.workerId?.fullName}
                                </TableCell>
                                <TableCell align='center'>
                                    <Checkbox defaultChecked={row.was} aria-label={row.workerId._id} id={row.workerId._id} onChange={onCheckBoxChange} size="small"sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />
                                </TableCell>
                            </TableRow>
                        ))
                          )}
					</TableBody>
				</Table>
			</TableContainer>
            </Box>
        </Container>
     )
 }
 export default Accounting
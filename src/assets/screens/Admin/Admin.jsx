import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Container,
    Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle,
    Fab,InputAdornment,
    Grid, TextField,Paper,
    Typography,Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,IconButton,Collapse,
    TableRow
} from "@mui/material";
import axios from '../../../../axios'
import AddIcon from '@mui/icons-material/Add';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { KeyboardArrowUp,KeyboardArrowDown,AccountCircle,Edit,HighlightOff } from "@mui/icons-material";
import { useDispatch ,useSelector} from "react-redux";
import { useEffect,useState } from "react";
import { fetchObjects } from "../../../redux/slices/objectSlice";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";



{/* <Typography variant="h6" sx={{textAlign:"center"}}>Пользователи</Typography> */}
function Row() {
    // (props)
    // const { row } = props;
    const [open, setOpen] = useState(false);
    const [edit, setOpenEdit] = useState(false);
    const [del,setOpenDel] = useState(false);
  
    return (
      <>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            <TableCell component="th" scope="row">
            Павел Котов
            </TableCell>
            <TableCell >Роли
                <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
                >
                {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                </IconButton>
            </TableCell>
            <TableCell >Админ</TableCell>
            <TableCell sx={{maxWidth:"100px"}}>
                <Button onClick={()=>(setOpenEdit(true))} variant="outlined" color="warning" startIcon={<Edit color="warning"/>}>Изменить</Button>
                <Dialog open={edit} onClose={()=>(setOpenEdit(false))}>
                {/* <form onSubmit={handleSubmit(onSubmit)}>  */}
                    <DialogTitle>Добавить объект</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Название объект"
                            // error={Boolean(errors.buildingName?.message)}
                            // helperText={errors.buildingName?.message}
                            // {...register('buildingName',{required:'Введите название'})}
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Адрес объекта"
                            // error={Boolean(errors.buildingAddress?.message)}
                            // helperText={errors.buildingAddress?.message}
                            // {...register('buildingAddress',{required:'Введите адрес'})}
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={()=>(setOpenEdit(false))}>Отменить</Button>
                        <Button type="submit" variant='outlined'>Добавить</Button>
                    </DialogActions>
                    {/* </form> */}
                </Dialog>
            </TableCell>
            <TableCell sx={{maxWidth:"100px"}}>
                <Button onClick={()=>(setOpenDel(true))} variant="outlined" color="error" startIcon={<HighlightOff color="error"/>}>Удалить</Button>
                <Dialog open={del} onClose={()=>(setOpenDel(false))}>
                {/* <form onSubmit={handleSubmit(onSubmit)}>  */}
                    <DialogTitle>Добавить объект</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Название объекта"
                            // error={Boolean(errors.buildingName?.message)}
                            // helperText={errors.buildingName?.message}
                            // {...register('buildingName',{required:'Введите название'})}
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Адрес объекта"
                            // error={Boolean(errors.buildingAddress?.message)}
                            // helperText={errors.buildingAddress?.message}
                            // {...register('buildingAddress',{required:'Введите адрес'})}
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={()=>(setOpenDel(false))}>Отменить</Button>
                        <Button type="submit" variant='outlined'>Добавить</Button>
                    </DialogActions>
                    {/* </form> */}
                </Dialog>
            </TableCell>

         

        </TableRow>
        <TableRow>
        <Collapse in={open} timeout="auto" unmountOnExit>
            <Typography variant="body1">Дом Тэц</Typography> 
        </Collapse>
        </TableRow>
      </>
    );
  }


function Admin() {
    const {items,status}=useSelector(state=>state.object)
    const [load,setLoad] = useState()
    const [colapse,setColapse] = useState()
    const dispatch = useDispatch();
    const [open,setOpen] = useState(false)
     return(
        <Container>
            <Paper sx={{marginTop:"20px"}}>
                <Typography variant="h4" sx={{textAlign:"center"}}>Админ-панель</Typography>
                <Paper elevation={0} sx={{margin:"10px auto",maxWidth:"1000px"}}>
                <Typography variant="h6" sx={{textAlign:"center"}}>Пользователи</Typography>
                    <Box sx={{display:'flex',flexDirection:'row',justifyContent:'space-around',alignItems:'center',flexWrap:'wrap'}}>
                    <TextField
                            sx={{width:"300px"}}
                            id="input-with-icon-textfield"
                            label="Поиск"
                            value={find}
                            onChange={(event) => onFindChange(event)}
                            InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                <AccountCircle/>
                                </InputAdornment>
                            ),
                            }}
                            variant="outlined"
                    />
                        <Button onClick={()=>(setOpen(true))} color='inherit' sx={{height:"55px"}} variant="outlined"> <PersonAddIcon sx={{mr:"0.3em"}}/> Добавить пользователя</Button>
                        <Dialog open={open} onClose={()=>(setOpen(false))}>
                        {/* <form onSubmit={handleSubmit(onSubmit)}>  */}
                            <DialogTitle>Добавить объект</DialogTitle>
                            <DialogContent>
                                <Box sx={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="Имя"
                                        // error={Boolean(errors.buildingName?.message)}
                                        // helperText={errors.buildingName?.message}
                                        // {...register('buildingName',{required:'Введите название'})}
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="Фамилия"
                                        sx={{marginLeft:"20px"}}
                                        // error={Boolean(errors.buildingName?.message)}
                                        // helperText={errors.buildingName?.message}
                                        // {...register('buildingName',{required:'Введите название'})}
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                    />
                                </Box>
       
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Адрес объекта"
                                    // error={Boolean(errors.buildingAddress?.message)}
                                    // helperText={errors.buildingAddress?.message}
                                    // {...register('buildingAddress',{required:'Введите адрес'})}
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={()=>(setOpen(false))}>Отменить</Button>
                                <Button type="submit" variant='outlined'>Добавить</Button>
                            </DialogActions>
                            {/* </form> */}
                        </Dialog>
                    </Box>
                    <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                        <TableHead>
                            <TableRow>
                                <TableCell >ФИО</TableCell>
                                <TableCell >Роль</TableCell>
                                <TableCell >Доступ</TableCell>
                                <TableCell ></TableCell>
                                <TableCell ></TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <Row/>
                          
                        </TableBody>
                    </Table>
                </TableContainer>
                </Paper>
            </Paper>
        </Container>
     )
 }
 export default Admin
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
    Typography,InputAdornment
} from "@mui/material";
import KeyIcon from '@mui/icons-material/Key';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {useState} from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuth, selectIsAuth } from "../../../redux/slices/authSlice";
import { Navigate } from "react-router";



            /* sx={{maxWidth:'600px'}} */

function Login() {
    const {data,status} = useSelector(state=>state.auth)
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        setError,
        formState:{errors,isValid}
    }=useForm({
        defaultValues:{
            login:'',
            password:''
        },
        mode:'onChange'
    });
    const onSubmit= async (values)=>{
        console.log('Login: ',values)
        const res = await dispatch(fetchAuth(values))
        if(!res.payload){
           return alert("Не удаллось авторизоваться")
        }
        if(res.payload.token){
            console.log(res)
            window.localStorage.setItem('token',res.payload.token)
        }
    }
    const [open,setOpen] = useState(false)
    if(data && status=='loaded'){
        return(<Navigate to='/objects'/>)
    }
     return(
        <Container maxWidth="sm">
            <form onSubmit={handleSubmit(onSubmit)}> 
            <Box  sx={{marginTop:"35px",borderRadius:"10px"}}>
                <Card >
                {/* ,margin:'0 auto' */}
                    <CardContent>
                        <Box sx={{textAlign:'center'}}>
                        <img src="../../../../public/helmet.png" style={{maxHeight:'95px'}} alt="" />
                        </Box>
                        <Typography variant='h5' sx={{textAlign:'center'}}>Войти в систему</Typography>
                        <Typography variant='body1' sx={{textAlign:'center',maxWidth:'150px',fontSize:"0.8em",margin:'0 auto'}}>Войдите в систему что бы получить доступ</Typography>

                    </CardContent>
                    <CardActions sx={{
                        display:'flex',flexDirection:'column'
                    }}>
                        <TextField
                            sx={{marginBottom:"18px"}}
                            id="input-login"
                            label="Логин"
                            error={Boolean(errors.login?.message)}
                            helperText={errors.login?.message}
                            InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                <AccountCircleIcon/>
                                </InputAdornment>
                            ),
                            }}
                            variant="outlined"
                            {...register('login',{required:'Введите логин'})}
                        />
                        <TextField
                            sx={{marginBottom:"18px",marginLeft:'0px!important'}}
                            id="input-password"
                            label="Пароль"
                            error={Boolean(errors.password?.message)}
                            helperText={errors.password?.message}
                            type="password"
                            InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                <KeyIcon/>
                                </InputAdornment>
                            ),
                            }}
                            variant="outlined"
                            {...register('password',{required:'Введите пароль'})}
                        />
                        <Button  size="large" type="submit" variant='contained' sx={{mt:'0.8em',padding:'8px 90px'}}>Войти</Button>
                        <Divider light />
                    </CardActions>
                    <CardContent>
                        <Box sx={{padding:'0 50px'}}>
                            <Divider light>
                                <Typography variant='body1' sx={{textAlign:'center'}}>Я забыл пароль</Typography>
                            </Divider>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
            </form>

        </Container>
     )
 }
 export default Login
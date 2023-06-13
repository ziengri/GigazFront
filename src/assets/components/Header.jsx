import {
    AppBar,
    Box,
    Button,
    Container, Divider,
    Drawer,
    IconButton,
    Link, List, ListItem,
    ListItemButton, ListItemText,
    Toolbar,
    Typography
} from "@mui/material";
import {Link as RouterLink,useNavigate } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import EngineeringIcon from '@mui/icons-material/Engineering';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import styles from './Header.module.css';
import {useState,useEffect} from "react";
import { useSelector,useDispatch } from "react-redux";
import { fetchAuthMe, logout, selectIsAuth } from "../../redux/slices/authSlice";
import {Navigate} from 'react-router'

function Header() {
    const {data,status} = useSelector(state=>state.auth)
    const navigate = useNavigate()
    const dispatch= useDispatch()
    useEffect(()=>{ 
        dispatch(fetchAuthMe())
    },[])
    const onClickLogout=()=>{
        if(window.confirm("Вы действительно хотите выйти?")){
            dispatch(logout())
            window.localStorage.removeItem('token')
            navigate('/login')
        } 
    }
    if(!data && status=='error' && window.location.pathname!='/login'){
        navigate('/login')
    }
    const [drawer,setDrawer]=useState(false)

    return(
        <>
            <AppBar position='static'>
                <Container>
                    <Toolbar >
                        <Typography variant="h5" sx={{flexGrow:1}}>Gigas</Typography>
                        {(!data && status=='error'||status=='loading')?
                        <></>
                        :<>                        <IconButton
                            className={styles.menu}
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={()=>(setDrawer(true))}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Box className={styles.links}>
                            <Button color='inherit' to='/admin' component={RouterLink} > <AdminPanelSettingsIcon sx={{mr:"0.3em"}}/> Админ</Button>
                            <Button  color='inherit' to='/profile' component={RouterLink}> <PersonIcon sx={{mr:"0.3em"}}/> Профиль</Button>
                            <Button color='inherit' to='/objects' component={RouterLink} ><HomeWorkIcon sx={{mr:"0.3em"}}/> Обьекты</Button>
                            <Button color='inherit' to='/workers' component={RouterLink} > <EngineeringIcon sx={{mr:"0.3em"}}/> Рабочие</Button>
                            <Button color='inherit' to='/delivery' component={RouterLink} > <LocalShippingIcon sx={{mr:"0.3em"}}/> Доставки</Button>
                            <Button color='inherit' onClick={()=>{onClickLogout()}}>  Выйти</Button>
                        </Box></>} 
                    </Toolbar>
                </Container>
            </AppBar>
            <Drawer
                anchor='right'
                open={drawer}
                onClose={()=>(setDrawer(false))}

            >
                <List sx={{minWidth:'200px'}}>
                    <ListItem>
                        <ListItemButton to='/admin' component={RouterLink}>
                            <AdminPanelSettingsIcon sx={{mr:"0.3em"}}/>
                            <ListItemText primary="Админ"  />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemButton to='/profile' component={RouterLink}>
                            <PersonIcon sx={{mr:"0.3em"}}/>
                            <ListItemText primary="Профиль"  />
                        </ListItemButton>
                    </ListItem>
                    <Divider />

                    <ListItem>
                        <ListItemButton to='/objects' component={RouterLink}>
                            <HomeWorkIcon sx={{mr:"0.3em"}}/>
                            <ListItemText primary="Обьекты"  />
                        </ListItemButton>
                    </ListItem>
                    <Divider />

                    <ListItem>
                        <ListItemButton to='/workers' component={RouterLink}>
                            <EngineeringIcon sx={{mr:"0.3em"}}/>
                            <ListItemText primary="Рабочие"  />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemButton to='/delivery' component={RouterLink}>
                            <LocalShippingIcon sx={{mr:"0.3em"}}/>
                            <ListItemText primary="Доставки"  />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemButton to='/delivery'  onClick={()=>{onClickLogout()}} component={RouterLink}>
                            <ListItemText primary="Выйти"  />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                </List>
            </Drawer>
        </>
    )
}
export default Header
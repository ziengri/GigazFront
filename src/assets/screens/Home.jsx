import {AppBar, Button, Container, Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person.js";



function Home() {
    return(
        // style={{backgroundColor:'white'}}
        <AppBar position='fixed'>
            <Container fixed>
                <Toolbar>
                    <Drawer
                        anchor='right'
                        open={drawer}
                        onClose={setDrawer(false)}
                    >
                        <List>
                            <ListItem>
                                <ListItemButton component="a" href="#simple-list">
                                    <PersonIcon sx={{mr:"0.3em"}}/>
                                    <ListItemText primary="Spam"  />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Drawer>
                </Toolbar>
            </Container>
        </AppBar>

)

}


export default Home
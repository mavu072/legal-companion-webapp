import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LogoutIcon from '@mui/icons-material/Logout';
import CreateIcon from '@mui/icons-material/Create';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { AppContext } from '../context-provider/Context';

const drawerWidth = 240;
const appName = 'AI Legal Companion';

function ResponsiveChatUI() {
    const { auth, user, mode, toggleColorMode, firestore } = React.useContext(AppContext);

    const signOutUser = () => {
        auth.signOut();
    }

    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const defaultTheme = createTheme({ palette: { mode } });

    const drawer = (
        <div>
            <Toolbar sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center'
            }}>
                <Tooltip title='New chat'>
                    <IconButton>
                        <CreateIcon />
                    </IconButton>
                </Tooltip>
            </Toolbar>
            <List>
                <ListItem>
                    <Typography><small>Recent chats</small></Typography>
                </ListItem>
                {['Converstation Name 1', 'Converstation Name 2', 'Converstation Name 3'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemText primary={text} sx={{ whiteSpace: 'nowrap' }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            {
                !user &&
                <List>
                    <Divider />
                    <ListItem>
                        <Tooltip title='Sign In or Sign Up'>
                            <Button
                                color="primary"
                                variant="contained"
                                size="small"
                                component="a"
                                href="/login"
                                sx={{ flexGrow: 1 }}
                            >
                                Sign In or Sign Up
                            </Button>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip title='Switch mode'>
                            <Button
                                color="primary"
                                variant="outlined"
                                size="small"
                                onClick={toggleColorMode}
                                sx={{ flexGrow: 1 }}
                            >
                                Switch to {mode === 'light' ? 'dark' : 'light'} mode
                            </Button>
                        </Tooltip>
                    </ListItem>
                </List>
            }
        </div>
    );

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    sx={{
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                        ml: { sm: `${drawerWidth}px` },
                        color: `${ mode === 'light' ? 'black' : 'color.default' }`,
                        backgroundColor: `${ mode === 'light' ? 'white' : 'background.default' }`,
                    }} >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                            {appName}
                        </Typography>
                        {
                            user && <Tooltip title='Sign out'>
                                <IconButton onClick={signOutUser}>
                                    <LogoutIcon />
                                </IconButton>
                            </Tooltip>
                        }
                    </Toolbar>
                </AppBar>
                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexGrow: 1 }}
                    aria-label="Recent chats" >
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Drawer
                        variant="temporary"
                        open={mobileOpen}
                        onTransitionEnd={handleDrawerTransitionEnd}
                        onClose={handleDrawerClose}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        {drawer}
                    </Drawer>
                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                        open
                    >
                        {drawer}
                    </Drawer>
                </Box>
                <Box component="main"
                    sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }} >
                    <Toolbar />
                    <Typography paragraph>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
                        enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
                        imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
                        Convallis convallis tellus id interdum velit laoreet id donec ultrices.
                        Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                        adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
                        nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
                        leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
                        feugiat vivamus at augue. At augue eget arcu dictum varius duis at
                        consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
                        sapien faucibus et molestie ac.
                    </Typography>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default ResponsiveChatUI;

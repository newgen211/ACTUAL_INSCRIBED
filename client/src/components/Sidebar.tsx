import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Switch } from '@mui/material';
import { Home, People, Public, PersonPin, Settings, ModeNight } from '@mui/icons-material';

export default function Sidebar() {

    return (

        <Box flex={2} p={2}
            sx={{
                display: { xs: 'none', sm: 'block' }
            }}
        >
            
            <Box position='fixed'>

                <List>

                    {/* Home Item */}
                    <ListItem disablePadding>

                        <ListItemButton>

                            <ListItemIcon><Home /></ListItemIcon>
                            <ListItemText primary="Home" />

                        </ListItemButton>

                    </ListItem>

                    {/* For You Feed Item */}
                    <ListItem disablePadding>

                        <ListItemButton>

                            <ListItemIcon><People /></ListItemIcon>
                            <ListItemText primary="For You" />

                        </ListItemButton>

                    </ListItem>

                    {/* Discover Feed Item */}
                    <ListItem disablePadding>

                        <ListItemButton>

                            <ListItemIcon><Public /></ListItemIcon>
                            <ListItemText primary="Discover" />

                        </ListItemButton>

                    </ListItem>

                    {/* Profile Item */}
                    <ListItem disablePadding>

                        <ListItemButton>

                            <ListItemIcon><PersonPin /></ListItemIcon>
                            <ListItemText primary="Profile" />

                        </ListItemButton>

                    </ListItem>

                    {/* Settings Item */}
                    <ListItem disablePadding>

                        <ListItemButton>

                            <ListItemIcon><Settings /></ListItemIcon>
                            <ListItemText primary="Settings" />

                        </ListItemButton>

                    </ListItem>

                    {/* Dark Mode Item */}
                    <ListItem disablePadding>

                        <ListItemButton>

                            <ListItemIcon><ModeNight /></ListItemIcon>
                            <Switch />

                        </ListItemButton>

                    </ListItem>

                </List>

            </Box>

        </Box>

    );

}
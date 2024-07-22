import { Avatar, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Switch, Typography } from '@mui/material';
import { Home, People, Public, PersonPin, Settings } from '@mui/icons-material';

export default function Sidebar() {

    return (

        <Box flex={2} p={2}
            sx={{
                display: { xs: 'none', sm: 'block' },
            }}
        >
            
            <Box position='fixed'
                sx={{
                    height: '100vh',
                    width: '240px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
            >

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

                </List>

            {/* Bottom Section */}

            <List sx={{ mb: 2 }}>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Avatar>EK</Avatar>
                                <Typography>ekasky</Typography>
                            </Box>
                            <Switch sx={{ marginLeft: 'auto' }} />
                        </ListItemButton>
                    </ListItem>
            </List>


            </Box>

        </Box>

    );

}
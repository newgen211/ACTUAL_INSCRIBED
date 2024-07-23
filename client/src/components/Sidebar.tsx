import React, { useState } from 'react';
import { Avatar, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Switch, Typography } from '@mui/material';
import { Home, People, Public, PersonPin, Settings } from '@mui/icons-material';
import { IUser } from '../pages/Homepage';
import SettingsDialog from './Settings';

interface SidebarProps {
    userInfo: IUser | null;
}

export default function Sidebar({ userInfo }: SidebarProps) {

    // State to manage the open/close state of the SettingsDialog
    const [openSettings, setOpenSettings] = useState(false);

    const handleOpenSettings = () => setOpenSettings(true);
    const handleCloseSettings = () => setOpenSettings(false);

    return (
        <Box flex={2} p={2} borderRight={1}
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
                        <ListItemButton onClick={handleOpenSettings}>
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
                                <Avatar src={userInfo?.profile_image}>{userInfo ? `${userInfo.first_name[0]}${userInfo.last_name[0]}` : 'U'}</Avatar>
                                <Typography>{userInfo?.username}</Typography>
                            </Box>
                            <Switch sx={{ marginLeft: 'auto' }} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>

            {/* Settings Dialog */}
            <SettingsDialog open={openSettings} onClose={handleCloseSettings} />
        </Box>
    );
}

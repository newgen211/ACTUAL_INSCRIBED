import styled from '@emotion/styled';
import { AppBar, Avatar, Box, IconButton, InputBase, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { Air, Settings, Logout } from '@mui/icons-material';
import { useState } from 'react';

/* Create a custom Toolbar */
const StyledToolbar = styled(Toolbar)({

    display: 'flex',
    justifyContent: 'space-between'

});

/* Custom Search Bar */
const Search = styled("div")( ({theme}) => ({
    
    backgroundColor: 'white',
    padding: '0 10px',
    borderRadius: '10px',
    width: '40%'

}));


/* Custom component to display user */
const UserBox = styled(Box)({
    
    display: 'flex',
    alignItems: 'center',
    gap: '10px'

});

export default function Navbar() {

    /* Define State to keep track if menu is open or closed */
    const [menuOpen, setMenuOpen] = useState(false);

    return (

        <AppBar position='sticky'>
            
            <StyledToolbar>

                {/* Logo */}
                <Typography variant='h6'
                    sx={{
                        display: { xs: 'none', sm: 'block' }
                    }}
                >
                    Inscribed
                </Typography>

                <Air
                    sx={{
                        display: { xs: 'block', sm: 'none' }
                    }}
                />

                {/* Search Bar */}
                <Search>
                    <InputBase placeholder='Search...' />
                </Search>

                {/* Icons Bar */}
                <UserBox>
                    
                    <Typography>Username</Typography>
                    <Avatar
                        sx={{ width: 30, height: 30 }}
                        onClick = {(e) => setMenuOpen(true)}
                        src='https://miro.medium.com/v2/resize:fit:720/format:webp/0*Ggt-XwliwAO6QURi.jpg' 
                        alt = 'XX'
                    />
                    
                    <Menu
                        id="demo-positioned-menu"
                        aria-labelledby="demo-positioned-button"
                        open={menuOpen}
                        onClose={(e) => setMenuOpen(false)}
                        anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                    >
                        
                        <MenuItem>Profile</MenuItem>
                        <MenuItem>My account</MenuItem>
                        <MenuItem>Logout</MenuItem>

                    </Menu>

                </UserBox>

            </StyledToolbar>

        </AppBar>

    );

}
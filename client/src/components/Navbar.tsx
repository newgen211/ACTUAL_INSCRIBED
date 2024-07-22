import styled from '@emotion/styled';
import { AppBar, Avatar, Box, IconButton, InputBase, Toolbar, Typography } from '@mui/material';
import { Air, Settings, Logout } from '@mui/icons-material';

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
                    <Avatar sx={{ width: 30, height: 30 }} src='https://miro.medium.com/v2/resize:fit:720/format:webp/0*Ggt-XwliwAO6QURi.jpg' />

                </UserBox>

            </StyledToolbar>

        </AppBar>

    );

}
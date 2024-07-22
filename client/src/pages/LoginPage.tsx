import { Avatar, Box, Button, Grid, Link, Paper, TextField, Typography } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { Link as ReactRouterDomLink } from 'react-router-dom';
import logo from '../../public/logo-bg-rm.png';

export default function LoginPage() {

    return (

        <Grid container component="main" sx={{ height: '100vh' }}>
        
            <Grid item xs={false} sm={4} md={7} 
                sx={{
                backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                backgroundPosition: 'left',

            }}
            >

                <Box component="img" src={logo} alt="Logo" sx={{ position: 'absolute', bottom: 16, left: 16, maxWidth: { sm: 150, md: 250 },  display: { xs: 'none', sm: 'block' } }} />

            </Grid>

            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>

                <Box sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                    {/* Form Icon */}
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}><LockOutlined /></Avatar>

                    {/* Form title */}
                    <Typography component="h1" variant="h5">Sign in</Typography>

                    {/* Login Form */}
                    <Box component="form" noValidate sx={{ mt: 1 }}>

                        {/* Username Input */}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                        />

                        {/* Password Input */}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />

                        {/* Submit Button */}
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Sign In
                        </Button>

                        {/* Buttons for register and forgot password */}
                        <Grid container>

                            <Grid item xs><Link variant='body2' component={ReactRouterDomLink} to='/forgot-password' sx={{ textDecoration: 'none' }}>Forgot Password</Link></Grid>

                            <Grid item><Link variant='body2' component={ReactRouterDomLink} to='/register' sx={{ textDecoration: 'none' }}>Dont't have an account? Sign Up</Link></Grid>

                        </Grid>

                    </Box>

                </Box>

            </Grid>

        </Grid>

    );

}
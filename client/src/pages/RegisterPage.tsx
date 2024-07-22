import { Avatar, Box, Button, Grid, Link, Paper, TextField, Typography } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { Link as ReactRouterDomLink } from 'react-router-dom';

export default function RegisterPage() {

    return (

        <Grid container component="main" sx={{ height: '100vh' }}>
        
            <Grid item xs={false} sm={4} md={7} 
                sx={{
                backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                backgroundPosition: 'left',

            }}
        />

            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>

                <Box sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                    {/* Form Icon */}
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}><LockOutlined /></Avatar>

                    {/* Form title */}
                    <Typography component="h1" variant="h5">Register</Typography>

                    {/* Register Form */}
                    <Box component="form" noValidate sx={{ mt: 2 }}>

                        <Grid container spacing={2}>

                            {/* First Name Input */}
                            <Grid item xs={12} sm={6}>

                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                />

                            </Grid>

                            {/* Last Name Input */}
                            <Grid item xs={12} sm={6}>

                                <TextField
                                    autoComplete="family-name"
                                    name="last_name"
                                    required
                                    fullWidth
                                    id="last_name"
                                    label="Last Name"
                                />

                            </Grid>

                            {/* Email Input */}
                            <Grid item xs={12}>

                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />

                            </Grid>

                            {/* Username Input */}
                            <Grid item xs={12}>

                                <TextField
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                />

                            </Grid>

                            {/* Password Input */}
                            <Grid item xs={12}>

                                <TextField
                                    required
                                    fullWidth
                                    id="password"
                                    label="Password"
                                    name="password"
                                    autoComplete="password"
                                    type='password'
                                />

                            </Grid>

                            {/* Confirm Password Input */}
                            <Grid item xs={12}>

                                <TextField
                                    required
                                    fullWidth
                                    id="confirm_password"
                                    label="Confirm Password"
                                    name="confirm_password"
                                    autoComplete="password"
                                    type='password'
                                />

                            </Grid>

                        </Grid>

                        {/* Sign Up Button */}
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Sign Up</Button>

                        {/* Link back to login */}
                        <Grid container justifyContent="flex-end">

                        <Grid item><Link variant='body2' component={ReactRouterDomLink} to='/' sx={{ textDecoration: 'none' }}>Already have an account? Sign in</Link></Grid>

                        </Grid>

                    </Box>

                </Box>

            </Grid>

        </Grid>

    );

}
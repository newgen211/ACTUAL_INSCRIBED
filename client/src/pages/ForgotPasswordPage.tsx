import { LockOutlined } from '@mui/icons-material';
import { Avatar, Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import { Link as ReactRouterDomLink } from 'react-router-dom';

export default function ForgotPasswordPage() {

    return (

        <Container component="main" maxWidth="xs">
            
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

               {/* Form Icon */}
               <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}><LockOutlined /></Avatar>

               {/* Form title */}
               <Typography component="h1" variant="h5">Forgot Password</Typography>

               {/* Forgot Password Reset Form */}
               <Box component="form" noValidate sx={{ mt: 2 }}>

                    {/* Email Input */}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                    />

                    {/* Submit Button */}
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Reset Password
                    </Button>

                    {/* Buttons for register and forgot password */}
                    <Grid container>

                        <Grid item><Link variant='body2' component={ReactRouterDomLink} to='/' sx={{ textDecoration: 'none' }}>Back to login</Link></Grid>

                    </Grid>

               </Box>

            </Box>

        </Container>

    );

}
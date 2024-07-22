import { Alert, Avatar, Box, Button, Grid, IconButton, InputAdornment, Link, Paper, TextField, Typography } from '@mui/material';
import { LockOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import { Navigate, Link as ReactRouterDomLink } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema } from '../validationSchemas/loginSchema';
import axios from 'axios';
import { IAPIResponse } from '../types/IApiResponse';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {

    /* Define state */
    const [code, setCode]                               = useState<number>(0);
    const [message, setMessage]                         = useState<string>('');
    const [showAlert, setShowAlert]                     = useState<boolean>(false);
    const [loading, setLoading]                         = useState<boolean>(false);
    const [showPassword, setShowPassword]               = useState<boolean>(false);

    const { auth, setAuth } = useAuth();

    /* Functions to toggle show passwors state */
    const toggleShowPassword        = () => setShowPassword(!showPassword);

    /* React Hook Form Configuration */
    const { handleSubmit, control, formState: { errors, isValid }, setError } = useForm({
        mode: 'all',
        defaultValues: {
            username: '', password: ''
        },
        resolver: zodResolver(LoginSchema),   
    });

    /* Handle a form submit */
    const handleFormSubmit = useCallback(async (values: LoginSchema) => {

        try {

            // Set the loading state to true while processing the request
            setLoading(true);

            // Attempt to login the user
            const response = await axios.post('/api/auth/login', values);

            // Store the json web token in localstorage
            localStorage.setItem('token', response.data.token);

            // Set the auth state
            setAuth({
                userId: response.data.data.userId,
                username: response.data.data.username,
                token: response.data.data.token,
            });

            // Set the response state
            setCode(response.data.code);
            setMessage(response.data.message);

            // Navigate to the home page
            <Navigate to='/homepage' />

        }
        
        catch(error) {

            if(axios.isAxiosError(error) && error.response) {

                // Get the error response
                const response: IAPIResponse = error.response.data;

                // Set the error response state
                setCode(error.response.data.code);
                setMessage(error.response.data.message);

            }

            else {

                // Set the error response state
                setCode(500);
                setMessage('An unexpected error occured');

            }

            console.error('Login Error:', error);

        }

        finally {

            // When done processing set the loading state to false
            setLoading(false);
            setShowAlert(true);

        }

    }, []);

    /* Auto dismiss the server alert after 5 seconds */
    useEffect(() => {
        
        if (showAlert) {
            
            const timer = setTimeout(() => {
                setShowAlert(false);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [showAlert]);

    /* Redirect to homepage if logged in */
    if (auth) {
        return <Navigate to="/homepage" />;
    }

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

                    {/* Show server response */}
                    {showAlert && <Alert sx={{mb: 3}} severity={code === 200 ? 'success' : 'error'}>{message}</Alert>}

                    {/* Form Icon */}
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}><LockOutlined /></Avatar>

                    {/* Form title */}
                    <Typography component="h1" variant="h5">Sign in</Typography>

                    {/* Login Form */}
                    <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} noValidate sx={{ mt: 1 }}>

                        {/* Username Input */}
                        <Controller 
                            control={control}
                            name='username'
                            render={({field}) => (

                                <TextField
                                    {...field}
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    error={!!errors.username}
                                    helperText={errors.username?.message}
                                />

                            )}
                        />

                        {/* Password Input */}
                        <Controller 
                                    control={control}
                                    name='password'
                                    render={({field}) => (

                                        <TextField
                                            {...field}
                                            required
                                            fullWidth
                                            id="password"
                                            label="Password"
                                            name="password"
                                            autoComplete="password"
                                            type={showPassword ? 'text' : 'password'}
                                            error={!!errors.password}
                                            helperText={errors.password?.message}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={toggleShowPassword}
                                                            edge="end"
                                                        >
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />

                                    )}
                                />

                        {/* Submit Button */}
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={!isValid || loading}>
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
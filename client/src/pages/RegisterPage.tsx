import { Alert, Avatar, Box, Button, Grid, IconButton, InputAdornment, Link, Paper, TextField, Typography } from '@mui/material';
import { LockOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import { Link as ReactRouterDomLink, useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegistrationSchema } from '../validationSchemas/registerSchema';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { IAPIResponse } from '../types/IApiResponse';
import api from '../util/api';

export default function RegisterPage() {

    /* Define state */
    const [code, setCode]                               = useState<number>(0);
    const [message, setMessage]                         = useState<string>('');
    const [showAlert, setShowAlert]                     = useState<boolean>(false);
    const [loading, setLoading]                         = useState<boolean>(false);
    const [showPassword, setShowPassword]               = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

    const navigate = useNavigate();

    /* Functions to toggle show passwors state */
    const toggleShowPassword        = () => setShowPassword(!showPassword);
    const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

    /* React Hook Form Configuration */
    const { handleSubmit, control, formState: { errors, isValid }, setError } = useForm({
        mode: 'all',
        defaultValues: {
            first_name: '', last_name: '', username: '', email: '', password: '', confirm_password: ''
        },
        resolver: zodResolver(RegistrationSchema),   
    });

    /* Handle a form submit */
    const handleFormSubmit = useCallback(async (values: RegistrationSchema) => {

        try {

            // Set the loading state to true while processing the request
            setLoading(true);

            // Attempt to register a user with the form data
            const response = await api.post('/api/auth/register', values);

            // Set the response state
            setCode(response.data.code);
            setMessage(response.data.message);

        }
        
        catch(error) {

            if(axios.isAxiosError(error) && error.response) {

                // Get the error response
                const response: IAPIResponse = error.response.data;

                // Set the error response state
                setCode(error.response.data.code);
                setMessage(error.response.data.message);

                // Set any server errors that their may be that cannot be checked on frontend
                response.errors?.forEach(err => {
                    setError(err.field as keyof RegistrationSchema  , { type: 'conflict', message: err.message });
                });

            }

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
                if (code === 201) navigate('/');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [showAlert, code, navigate]);

    /* Check if the user is authentiated */
    const isAuthenticated = async (): Promise<IAPIResponse> => {
        try {
            const response = await axios.get<IAPIResponse>('/api/auth/is-auth');
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return error.response.data;
            } else {
                throw new Error('An unexpected error occurred');
            }
        }
    };

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await isAuthenticated();
                if (response.code === 200) {
                    navigate('/homepage'); 
                }
            } catch (error) {
                console.error('Error checking authentication status', error);
            }
        };

        checkAuthStatus();
    }, [navigate]);


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
                    <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} noValidate sx={{ mt: 2 }}>

                        {/* Show server response */}
                        {showAlert && <Alert sx={{mb: 3, width: '100%'}} severity={code === 201 ? 'success' : 'error'}>{message}</Alert>}
 
                        <Grid container spacing={2}>

                            {/* First Name Input */}
                            <Grid item xs={12} sm={6}>
                                
                                <Controller
                                    control={control}
                                    name='first_name'
                                    render={({field}) => (

                                        <TextField
                                            {...field}
                                            autoComplete='given-name'
                                            name='first_name'
                                            required
                                            fullWidth
                                            id='first_name'
                                            label='First Name'
                                            error={!!errors.first_name}
                                            helperText={errors.first_name?.message}
                                        />

                                    )}
                                />

                            </Grid>

                            {/* Last Name Input */}
                            <Grid item xs={12} sm={6}>

                                <Controller 
                                    control={control}
                                    name='last_name'
                                    render={({field}) => (

                                        <TextField
                                            {...field}
                                            autoComplete='family-name'
                                            name='last_name'
                                            required
                                            fullWidth
                                            id='last_name'
                                            label='Last Name'
                                            error={!!errors.last_name}
                                            helperText={errors.last_name?.message}
                                        />

                                    )}
                                />

                            </Grid>

                            {/* Email Input */}
                            <Grid item xs={12}>
                                
                                <Controller 
                                    control={control}
                                    name='email'
                                    render={({field}) => (

                                        <TextField
                                            {...field}
                                            required
                                            fullWidth
                                            id='email'
                                            label='Email Address'
                                            name='email'
                                            autoComplete='email'
                                            error={!!errors.email}
                                            helperText={errors.email?.message}
                                        />

                                    )}
                                />

                            </Grid>

                            {/* Username Input */}
                            <Grid item xs={12}>

                                <Controller 
                                    control={control}
                                    name='username'
                                    render={({field}) => (

                                        <TextField
                                            {...field}
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

                            </Grid>

                            {/* Password Input */}
                            <Grid item xs={12}>

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

                            </Grid>

                            {/* Confirm Password Input */}
                            <Grid item xs={12}>

                                <Controller 
                                    control={control}
                                    name='confirm_password'
                                    render={({field}) => (

                                        <TextField
                                            {...field}
                                            required
                                            fullWidth
                                            id="confirm_password"
                                            label="Confirm Password"
                                            name="confirm_password"
                                            autoComplete="password"
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            error={!!errors.confirm_password}
                                            helperText={errors.confirm_password?.message}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle confirm password visibility"
                                                            onClick={toggleShowConfirmPassword}
                                                            edge="end"
                                                        >
                                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />

                                    )}
                                />

                            </Grid>

                        </Grid>

                        {/* Sign Up Button */}
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}  disabled={!isValid || loading}>Sign Up</Button>

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
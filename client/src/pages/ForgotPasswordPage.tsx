import { zodResolver } from '@hookform/resolvers/zod';
import { LockOutlined } from '@mui/icons-material';
import { Alert, Avatar, Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link as ReactRouterDomLink, useNavigate } from 'react-router-dom';
import { ForgotPasswordSchema } from '../validationSchemas/forgotPasswordSchema';
import api from '../util/api';
import axios from 'axios';
import { IAPIResponse } from '../types/IApiResponse';

export default function ForgotPasswordPage() {

    /* Define state */
    const [code, setCode]                               = useState<number>(0);
    const [message, setMessage]                         = useState<string>('');
    const [showAlert, setShowAlert]                     = useState<boolean>(false);
    const [loading, setLoading]                         = useState<boolean>(false);
    const [showPassword, setShowPassword]               = useState<boolean>(false);

    const navigate = useNavigate();

    /* React Hook Form Configuration */
    const { handleSubmit, control, formState: { errors, isValid }, setError } = useForm({
        mode: 'all',
        defaultValues: {
            email: ''
        },
        resolver: zodResolver(ForgotPasswordSchema),   
    });

    /* Handle a form submit */
    const handleFormSubmit = useCallback( async (values: ForgotPasswordSchema) => {

        try {

            // Set the loading state to true while processing the request
            setLoading(true);

            // Attempt to send a password reset email
            const response = await api.post('/api/auth/send-password-reset', values);

            console.log("CODE: ", response.data.code);
            console.log("MESSAGE: ", response.data.message);

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

    },[]);

    return (

        <Container component="main" maxWidth="xs">
            
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

               {/* Form Icon */}
               <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}><LockOutlined /></Avatar>

               {/* Form title */}
               <Typography component="h1" variant="h5">Forgot Password</Typography>

               {/* Forgot Password Reset Form */}
               <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} noValidate sx={{ mt: 2 }}>
                    
                    {/* Show the server response */}
                    { showAlert ?? <Alert severity={code === 200 ? 'success' : 'error'}>{message}</Alert> }

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
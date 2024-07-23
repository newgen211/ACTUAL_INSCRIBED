import { zodResolver } from '@hookform/resolvers/zod';
import { LockOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Alert, Avatar, Box, Button, Container, Grid, IconButton,
  InputAdornment, TextField, Typography, Link
} from '@mui/material';
import { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link as ReactRouterDomLink, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import api from '../util/api';
import { IAPIResponse } from '../types/IApiResponse';
import { ResetPasswordSchema } from '../validationSchemas/resetPasswordSchema';

export default function ResetPasswordPage() {
  /* Define state */
  const [code, setCode] = useState<number>(0);
  const [message, setMessage] = useState<string>('');
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();

  /* Functions to toggle show password state */
  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  /* React Hook Form Configuration */
  const { handleSubmit, control, formState: { errors, isValid }, setError } = useForm({
    mode: 'all',
    defaultValues: {
      password: '', confirm_password: ''
    },
    resolver: zodResolver(ResetPasswordSchema),
  });

  /* Handle a form submit */
  const handleFormSubmit = useCallback(async (values: typeof ResetPasswordSchema._type) => {
    try {
      // Set the loading state to true while processing the request
      setLoading(true);

      // Get reset token from url
      const params = new URLSearchParams(location.search);
      const token = params.get('token');

      if (!token) {
        setCode(400);
        setMessage('Invalid or missing reset token');
        setShowAlert(true);
        setLoading(false);
        return;
      }

      // Attempt to reset the password
      const response = await api.post(`/api/auth/reset-password?token=${token}`, values);

      // Set the response state
      setCode(response.data.code);
      setMessage(response.data.message);

      // Navigate to the login page after successful password reset
      if (response.data.code === 200) {
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }

    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // Get the error response
        const response: IAPIResponse = error.response.data;

        // Set the error response state
        setCode(response.code);
        setMessage(response.message);
      } else {
        // Set the error response state
        setCode(500);
        setMessage('An unexpected error occurred');
      }

      console.error('Reset Password Error:', error);
    } finally {
      // When done processing set the loading state to false
      setLoading(false);
      setShowAlert(true);
    }
  }, [navigate, location]);

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Form Icon */}
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}><LockOutlined /></Avatar>

        {/* Form title */}
        <Typography component="h1" variant="h5">Reset Password</Typography>

        {/* Reset Password Form */}
        <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} noValidate sx={{ mt: 2 }}>
          {/* Show the server response */}
          {showAlert && <Alert severity={code === 200 ? 'success' : 'error'}>{message}</Alert>}

          {/* Password Input */}
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
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

          {/* Confirm Password Input */}
          <Controller
            control={control}
            name="confirm_password"
            render={({ field }) => (
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

          {/* Submit Button */}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading}>
            {loading ? 'Resetting...' : 'Reset Password'}
          </Button>

          {/* Link to go back to login */}
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link variant="body2" component={ReactRouterDomLink} to="/" sx={{ textDecoration: 'none' }}>
                Back to login
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

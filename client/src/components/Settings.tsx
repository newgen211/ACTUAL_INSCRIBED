import React, { useState, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
    Grid, IconButton, InputAdornment, TextField, Typography, Alert
} from '@mui/material';
import { LockOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { UpdateUserProfileSchema } from '../validationSchemas/updateUserProfileSchema';
import { IAPIResponse } from '../types/IApiResponse';
import { useNavigate } from 'react-router-dom';

interface SettingsDialogProps {
    open: boolean;
    onClose: () => void;
}

export default function SettingsDialog({ open, onClose }: SettingsDialogProps) {

    /* Define state */
    const [code, setCode] = useState<number>(0);
    const [message, setMessage] = useState<string>('');
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    /* React Hook Form Configuration */
    const { handleSubmit, control, formState: { errors, isValid }, reset } = useForm({
        mode: 'all',
        defaultValues: {
            first_name: '', last_name: '', username: '', email: '', bio: '', profile_image: ''
        },
        resolver: zodResolver(UpdateUserProfileSchema),
    });

    /* Handle a form submit */
    const handleFormSubmit = useCallback(async (values: typeof UpdateUserProfileSchema._type) => {

        try {

            // Set the loading state to true while processing the request
            setLoading(true);

            // Attempt to update the user profile
            const response = await axios.put(`/api/users/${localStorage.getItem('userId')}`, values,{ headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });

            // Set the response state
            setCode(response.data.code);
            setMessage(response.data.message);

        }
        catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const response: IAPIResponse = error.response.data;
                setCode(response.code);
                setMessage(response.message);
            } else {
                setCode(500);
                setMessage('An unexpected error occurred');
            }
            console.error('Update Profile Error:', error);
        } finally {
            setLoading(false);
            setShowAlert(true);
        }

    }, []);

    /* Handle logout */
    const handleLogout = () => {
        
        localStorage.removeItem('token');
        localStorage.removeItem('userId');

        navigate('/');

    };

    /* Handle delete account */
    const handleDeleteAccount = () => {
        // Implement delete account functionality here
        console.log('Delete Account');
    };

    /* Handle verify account */
    const handleVerifyAccount = () => {
        // Implement verify account functionality here
        console.log('Verify Account');
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Settings</DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}><LockOutlined /></Avatar>
                    <Typography component="h1" variant="h5">Update Profile</Typography>

                    {/* Show server response */}
                    {showAlert && <Alert sx={{ mb: 3 }} severity={code === 200 ? 'success' : 'error'}>{message}</Alert>}

                    {/* Update Profile Form */}
                    <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} noValidate sx={{ mt: 1 }}>

                        {/* First Name Input */}
                        <Controller 
                            control={control}
                            name='first_name'
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    margin="normal"
                                    fullWidth
                                    id="first_name"
                                    label="First Name"
                                    name="first_name"
                                    error={!!errors.first_name}
                                    helperText={errors.first_name?.message}
                                />
                            )}
                        />

                        {/* Last Name Input */}
                        <Controller 
                            control={control}
                            name='last_name'
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    margin="normal"
                                    fullWidth
                                    id="last_name"
                                    label="Last Name"
                                    name="last_name"
                                    error={!!errors.last_name}
                                    helperText={errors.last_name?.message}
                                />
                            )}
                        />

                        {/* Username Input */}
                        <Controller 
                            control={control}
                            name='username'
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    margin="normal"
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    error={!!errors.username}
                                    helperText={errors.username?.message}
                                />
                            )}
                        />

                        {/* Email Input */}
                        <Controller 
                            control={control}
                            name='email'
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    margin="normal"
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                />
                            )}
                        />

                        {/* Bio Input */}
                        <Controller 
                            control={control}
                            name='bio'
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    margin="normal"
                                    fullWidth
                                    id="bio"
                                    label="Bio"
                                    name="bio"
                                    error={!!errors.bio}
                                    helperText={errors.bio?.message}
                                />
                            )}
                        />

                        {/* Profile Image Input */}
                        <Controller 
                            control={control}
                            name='profile_image'
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    margin="normal"
                                    fullWidth
                                    id="profile_image"
                                    label="Profile Image URL"
                                    name="profile_image"
                                    error={!!errors.profile_image}
                                    helperText={errors.profile_image?.message}
                                />
                            )}
                        />

                        {/* Submit Button */}
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={!isValid || loading}>
                            Update Profile
                        </Button>
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleLogout} color="primary">Log Out</Button>
                <Button onClick={handleDeleteAccount} color="secondary">Delete Account</Button>
                <Button onClick={handleVerifyAccount} color="primary">Verify Account</Button>
                <Button onClick={onClose} color="primary">Close</Button>
            </DialogActions>
        </Dialog>
    );
}

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
import api from '../util/api';

interface SettingsDialogProps {
    open: boolean;
    onClose: () => void;
}

export default function SettingsDialog({ open, onClose }: SettingsDialogProps) {

    // Define state
    const [code, setCode] = useState<number>(0);
    const [message, setMessage] = useState<string>('');
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState<boolean>(false);

    const navigate = useNavigate();

    // React Hook Form Configuration
    const { handleSubmit, control, formState: { errors, isValid }, reset } = useForm({
        mode: 'all',
        defaultValues: {
            first_name: '', last_name: '', username: '', email: '', bio: '', profile_image: ''
        },
        resolver: zodResolver(UpdateUserProfileSchema),
    });

    // Handle a form submit
    const handleFormSubmit = useCallback(async (values: typeof UpdateUserProfileSchema._type) => {
        try {
            setLoading(true);
            const response = await axios.put(`/api/users/${localStorage.getItem('userId')}`, values, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setCode(response.data.code);
            setMessage(response.data.message);
        } catch (error) {
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

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/');
    };

    // Handle delete account
    const handleDeleteAccount = async () => {
        try {
            const userId = localStorage.getItem('userId');
            const token = localStorage.getItem('token');
            const response = await api.delete(`/api/users/${userId}/delete`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            localStorage.removeItem('userId');
            localStorage.removeItem('token');
            navigate('/');
        } catch (error) {
            setCode(500);
            setMessage('Could not delete account');
            setShowAlert(true);
        }
    };

    // Handle verify account
    const handleVerifyAccount = () => {
        console.log('Verify Account');
    };

    // Open confirm delete dialog
    const openConfirmDeleteDialog = () => {
        setConfirmDeleteOpen(true);
    };

    // Close confirm delete dialog
    const closeConfirmDeleteDialog = () => {
        setConfirmDeleteOpen(false);
    };

    return (
        <>
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
                <DialogTitle>Settings</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}><LockOutlined /></Avatar>
                        <Typography component="h1" variant="h5">Update Profile</Typography>

                        {showAlert && <Alert sx={{ mb: 3 }} severity={code === 200 ? 'success' : 'error'}>{message}</Alert>}

                        <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} noValidate sx={{ mt: 1 }}>
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

                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={!isValid || loading}>
                                Update Profile
                            </Button>
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleLogout} color="primary">Log Out</Button>
                    <Button onClick={openConfirmDeleteDialog} color="secondary">Delete Account</Button>
                    <Button onClick={handleVerifyAccount} color="primary">Verify Account</Button>
                    <Button onClick={onClose} color="primary">Close</Button>
                </DialogActions>
            </Dialog>

            {/* Confirm Delete Dialog */}
            <Dialog open={confirmDeleteOpen} onClose={closeConfirmDeleteDialog}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete your account? This action cannot be undone.</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeConfirmDeleteDialog} color="primary">Cancel</Button>
                    <Button onClick={() => {
                        closeConfirmDeleteDialog();
                        handleDeleteAccount();
                    }} color="secondary">Delete</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
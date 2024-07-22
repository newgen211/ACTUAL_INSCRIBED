import { Alert, Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, FormHelperText, Snackbar, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';


export default function NewPostForm() {

    /* Define State */
    const [content, setContent] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError]     = useState<string>('');
    const [success, setSuccess] = useState<string>('');


    /* Handle content change */
    const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setContent(event.target.value);
    };

    /* Handle Submit */
    const handleSubmit = async () => {

        setLoading(true);

        if(!content.trim()) {

            setError('Post cannot be empty');
            setLoading(false);
            return;

        }

        if(content.length > 255) {

            setError('Post cannot be longer than 255 characters');
            setLoading(false);
            return;

        }

        try {

            // Get the token from localstorage
            const token = localStorage.getItem('token');

            if (!token) {
                setError('User is not authenticated');
                setLoading(false);
                // logout();
                return;
            }

            // Attempt to create a new post
            const response = await axios.post('/api/post', 
                { 
                    content, 
                    // userId: auth?.userId
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setContent('');
            setSuccess('Post created successfully');

        }

        catch(error) {

            console.error('Error creating post:', error);

            if (axios.isAxiosError(error) && error.response) {
                
                // if(error.response.data.code === 401) logout();

            } 
            
            else {
                setError('An error occurred while creating the post');
            }

        }

        finally {

            setLoading(false);

        }

    };

    /* Auto dismiss the errors */
    useEffect(() => {

        if (error) {
            
            const timer = setTimeout(() => {
                setError('');
            }, 5000);

            return () => clearTimeout(timer);
        }

    }, [error, setError]);

    return (

        <Card sx={{ my: 2, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'}}>

            <CardHeader avatar={<Avatar>E</Avatar>} title={<Typography>Username</Typography>} />

            <CardContent>

            <TextField
                    id="outlined-multiline-flexible"
                    label="What's on your mind..."
                    multiline
                    fullWidth
                    rows={5}
                    value={content}
                    onChange={handleContentChange}
                    error={!!error}
                    helperText={error}
                    InputProps={{
                        endAdornment: (
                            <FormHelperText sx={{ position: 'absolute', bottom: -20, right: 0 }}>
                                {content.length}/255
                            </FormHelperText>
                        )
                    }}
                />  

            </CardContent>

            <CardActions disableSpacing>
                

                <Box sx={{ flexGrow: 1 }} />
                <Button onClick={handleSubmit} disabled={loading} variant='contained'>{loading ? 'Posting...' : 'Post'}</Button>

            </CardActions>

            <Snackbar open={!!success} autoHideDuration={6000} onClose={() => setSuccess('')}>
                <Alert onClose={() => setSuccess('')} severity="success" sx={{ width: '100%' }}>
                    {success}
                </Alert>
            </Snackbar>

        </Card>

    );

}
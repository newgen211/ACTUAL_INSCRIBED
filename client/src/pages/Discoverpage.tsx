import Sidebar from '../components/Sidebar';
import FollowingSidebar from '../components/FollowingPagecoComponent';
import Rightbar from '../components/Rightbar';
import { Alert, Box, Snackbar, Stack,Grid } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import DiscoverComponent from '../components/DiscoverPageComponent';

export interface IUser {
    id: string;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    profile_image: string;
    bio: string;
    created_at: Date;
};

export default function Discover() {

    const [userInfo, setUserInfo] = useState<IUser | null>(null);
    const [code, setCode]         = useState<number>(0);
    const [error, setError]       = useState<string>('');


    useEffect(() => {
        const fetchUserInfo = async () => {
            try {

                const userId = localStorage.getItem('userId');

                const response = await axios.get(`/api/users/${userId}`);
                setUserInfo(response.data.data);

            } 

            catch (error) {

                if(axios.isAxiosError(error) && error.response) {

                    // Log the user out if the token is not valid
                    if(error.response.data.code === 401) {
                        //logout();
                        return;
                    }
                    
                    // Set response state
                    setCode(error.response.data.code);
                    setError(error.response.data.message);

                }
                
            }

        };

        fetchUserInfo();
    }, []);

    return (

        <Box sx={{ px: {sm: 1, md: 10} }}>

            <Stack direction='row' spacing={2} justifyContent='space-between'>
                <Sidebar userInfo={userInfo} />
                <DiscoverComponent />
                
          <Rightbar />
          
            </Stack>
           
            {/* Display server response */}
            <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
                <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>

        </Box>

    );

}
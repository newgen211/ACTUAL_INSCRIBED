import { Box } from '@mui/material';
import Post from './Post';
import NewPostForm from './NewPostForm';
import HomePageComponent from './homeComponents/HomePageComponet';


export default function Feed() {

    return (

        <Box flex={4} p={2}>

            <NewPostForm />
            <HomePageComponent/>

        </Box>

    );

}
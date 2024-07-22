import { Box } from '@mui/material';
import Post from './Post';
import NewPostForm from './NewPostForm';


export default function Feed() {

    return (

        <Box flex={4} p={2}>

            <NewPostForm />

            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />

        </Box>

    );

}
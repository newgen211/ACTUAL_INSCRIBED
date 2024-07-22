import { Box } from '@mui/material';
import SearchBar from './Searchbar';
import UserCard from './UserCard';


export default function Rightbar() {

    return (

        <Box flex={2} p={2} borderLeft={1}
            sx={{
                display: { xs: 'none', sm: 'block' }
            }}
        >

            <Box position='fixed'>
                
                <SearchBar />
                <UserCard />

            </Box>

        </Box>

    );

}
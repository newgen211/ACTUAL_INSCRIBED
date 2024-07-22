import { Box } from '@mui/material';
import SearchBar from './Searchbar';
import UserCard from './UserCard';
import { IUser } from '../pages/Homepage';

interface RightbarProps {
    userInfo: IUser | null;
}

export default function Rightbar({ userInfo }: RightbarProps) {

    return (

        <Box flex={2} p={2} borderLeft={1}
            sx={{
                display: { xs: 'none', sm: 'block' }
            }}
        >

            <Box position='fixed'>
                
                <SearchBar />
                <UserCard userInfo={userInfo} />

            </Box>

        </Box>

    );

}
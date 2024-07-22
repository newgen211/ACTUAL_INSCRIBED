import { Card, Tab, Tabs } from '@mui/material';


export default function FeedTabs() {

    return (

        <Card sx={{ my: 2, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)' }}>
            <Tabs centered>
                <Tab label="For You" sx={{ color: 'black' }} />
                <Tab label="Discover" sx={{ color: 'black' }} />
            </Tabs>
        </Card>

    );

}
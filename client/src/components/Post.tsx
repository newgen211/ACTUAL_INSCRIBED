import { Favorite, MoreVert, Share } from '@mui/icons-material';
import { Avatar, Card, CardActions, CardContent, CardHeader, IconButton, Typography } from '@mui/material';


export default function Post() {

    return (

        <Card sx={{ m: 2 }}>
        
            <CardHeader avatar={ <Avatar sx={{ bgcolor: 'red' }}>R</Avatar>}
                action={
                    <IconButton aria-label="settings">
                        <MoreVert />
                    </IconButton>
                }

                title="ekasky"
                subheader="September 14, 2016"

            />

            <CardContent>

                <Typography variant="body2" color="text.primary">
                🌟 Working on a new feature for my Flutter app. Excited to see how it enhances the user experience! #Flutter #AppDevelopment
                </Typography>

            </CardContent>

            <CardActions disableSpacing>

                <IconButton>
                    <Favorite />
                </IconButton>

                <IconButton >
                    <Share />
                </IconButton>

            </CardActions>

        </Card>

    );

}
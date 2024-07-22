import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, TextField, Typography } from '@mui/material';


export default function NewPostForm() {

    return (

        <Card sx={{ my: 2, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'}}>

            <CardHeader avatar={<Avatar>E</Avatar>} title={<Typography>Username</Typography>} />

            <CardContent>

                <TextField
                    id="outlined-multiline-flexible"
                    label="Whats on your mind..."
                    multiline
                    fullWidth
                    rows={5}
                    />  

            </CardContent>

            <CardActions disableSpacing>
                

                <Box sx={{ flexGrow: 1 }} />
                <Button variant='contained'>Post</Button>

            </CardActions>

        </Card>

    );

}
import { Grid } from '@mui/material';
import { Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import '../styles/login.scss';


export const LoginPage: React.FC = () => {
    return (<Grid>
                <Box 
                height="100vh" width="100vh"
                display="flex" flexDirection="column"
                
                alignItems="center"
                justifyContent="center">

                    <h1>Athletic Form</h1>

                    <Link to='/events'>
                        <Button
                            variant='contained'
                            size='large'
                            className="button"
                        >Login</Button>
                    </Link>
                </Box>
            </Grid>
    )
}

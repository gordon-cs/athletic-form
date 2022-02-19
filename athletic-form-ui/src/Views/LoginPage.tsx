import { Grid } from '@mui/material';
import { Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import '../styles/login.scss';


export const LoginPage: React.FC = () => {

    const [username, setUsername] = useState<any | null>(null);
    const [password, setPassword] = useState<any | null>(null);

    const parseResponse = (res: any) => {
        // Parse body of response if not empty
        //    Make sure text of response is not empty before trying to convert it
        //    to a JSON object
        const json = res
          .text()
          .then((text: string) => (text.length ? JSON.parse(text) : {}));
          // Handle error if response body is not valid JSON
          //.catch((err) => Promise.reject(createError(err, res)));
      
        // Handle error when response body is valid but status code is not
        // if (!res.ok) {
        //   return json.then((data) => Promise.reject(createError(data, res)));
        // }
        return json;
      };

    const handleLogin = async () => {
		console.log("User attempted to log into the application.");

        const loginInfo = new URLSearchParams({
            username: username,
            password: password,
            grant_type: 'password',
        });
        
        const request = new Request(`https://360Api.gordon.edu/token`, {
            method: 'post',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            //mode: 'no-cors',
            credentials: 'include',
            body: loginInfo,
        });
        
        let token = await fetch(request).then(response => response.json()).then(data => data.access_token);

        try {
            console.log("Token: ", token.toString());
            if( token.toString().startsWith('ey') ){
                console.log("condition");
                window.location.href = "/events";
            }
        } catch {
            alert("Invalid credentials!");
        }
	};

    return (<Grid>
                <Box 
                height="100vh" width="100vh"
                display="flex" flexDirection="column"
                alignItems="center"
                justifyContent="center">

                    <h1>Athletic Form</h1>

                    <TextField
					value={username}
                    label='Username'
					onChange={(e: any) => {
						setUsername(e.target.value);
					}}
                    />
                    <TextField
                    type={'password'}
					value={password}
                    label='Password'
					onChange={(e: any) => {
						setPassword(e.target.value);
					}}
                    />
                    <h4> </h4>
                    <Button
                        onClick={handleLogin}
                        variant='contained'
                        size='large'
                        className="button"
                    >Login</Button>
                </Box>
            </Grid>
    )
}

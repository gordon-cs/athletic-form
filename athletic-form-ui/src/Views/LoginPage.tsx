import { Button, Box, Grid, Alert } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import '../styles/login.scss';
import { apiClient } from '../Services/AxiosService';
import { Loader } from './Loader';
import React from 'react';

export const LoginPage: React.FC = () => {
	const [email, setEmail] = useState<any | null>(null);
	const [password, setPassword] = useState<any | null>(null);
	const [token, setToken] = useState<any | null>(null);
	const [showAlert, setShowAlert] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [loading, setLoading] = useState(false);


	const fetchToken = (username: string, password: string) => {
        var data = {
                username: username,
                password: password,
            }
		apiClient({
			method: 'post',
			url: `/authorization/token`,
			data: data
		})
			.then((res) => {
				let val = res.data;
				setToken(val);
                checkAuthorization(val);
			}).catch((error) => console.log(error));

		console.log(token);
	};

	const checkAuthorization = (token: any) => {
		if (token !== 'Unauthorized!' && token !== null) {
			// Store the token to use as header
			localStorage.setItem('token', 'Bearer ' + token.toString());
			// Store email to lookup user roles
			localStorage.setItem('email', email);

			let role = JSON.parse(atob(token.split('.')[1]))[
				'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
			];
			// Redirect to home screen
			if (role === 'Staff') {
				window.location.href = 'coach/events';
			} else {
				window.location.href = '/events';
			}
		} else {
			// Show username/password error messages
			setUsernameError(false);
            setShowAlert(true);
            setLoading(false);
			setTimeout(() => {
				setShowAlert(false);
			}, 12000);
		}
	};

    const handleLogin = async () => {
        setLoading(true);
		console.log('User attempted to log into the application.');

		// Username set in try block
		let username = email;
		try {
			const usernameArray = email.split('@');
			username = usernameArray[0];
			// If not a valid email, fail the try-catch
			if (usernameArray[1] !== 'gordon.edu') {
				throw new Error('Invalid email address.');
			}
		} catch {
			// Show invalid email error messages
			setShowAlert(false);
			setUsernameError(true);
			setTimeout(() => {
				setUsernameError(false);
            }, 12000);
            setLoading(false);
            return;     
		}

        fetchToken(username, password);
	};

    if (loading) {
        return (<Loader />)
    } else {
        return (
            <Grid>
                <Box
                    height='100vh'
                    width='100vh'
                    display='flex'
                    flexDirection='column'
                    alignItems='center'
                    justifyContent='center'
                >
                    <h1>Athletic Form</h1>

                    <TextField
                        value={email}
                        label='Email'
                        onChange={(e: any) => {
                            setEmail(e.target.value);
                        }}
                    />
                    <TextField
                        type={'password'}
                        value={password}
                        label='Password'
                        onChange={(e: any) => {
                            setPassword(e.target.value);
                        }}
                        onKeyPress={(event) => {
                            if (event.key === 'Enter') {
                                handleLogin();
                            }
                        }}
                    />
                    <h4> </h4>
                    <Button onClick={handleLogin} variant='contained' size='large' className='button'>
                        Login
                    </Button>
                    <h1> </h1>
                    {showAlert && (
                        <Alert severity='error'>Your username or password was incorrect.</Alert>
                    )}
                    {usernameError && (
                        <Alert severity='error'>Please enter a valid Gordon email address.</Alert>
                    )}
                </Box>
            </Grid>
        );
    }
};

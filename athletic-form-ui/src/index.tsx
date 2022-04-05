import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme  } from '@mui/material/styles'
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

const theme = createTheme({
    palette: {  
        background: {
            default: "#E0C9A6",  /* Default background */
        },
        secondary: {
            main: "#FCE3BD"/* Card header (default) */ }
    }
})


ReactDOM.render(
	<React.StrictMode>
    <ThemeProvider theme={theme}>
		<CssBaseline />   
		<App />
    </ThemeProvider>
	</React.StrictMode>,
	document.getElementById('root'),
);

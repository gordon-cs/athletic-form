import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme  } from '@mui/material/styles'
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

const theme = createTheme({
    palette: {  
        background: {
            default: "#333333"        
        }
    }

})


ReactDOM.render(
	<React.StrictMode>
    <ThemeProvider theme={theme}>
		<CssBaseline />    {/*Possibly remove to allow us to be funky with the css. Can't change bg-color currently*/} 
		<App />
    </ThemeProvider>
	</React.StrictMode>,
	document.getElementById('root'),
);

import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme  } from '@mui/material/styles'
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

const theme = createTheme({
    palette: {  
        background: {
            default: "#D4C9A6",
            
        }
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

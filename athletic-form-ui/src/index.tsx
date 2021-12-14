import { CssBaseline } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

ReactDOM.render(
	<React.StrictMode>
		<CssBaseline />    {/*Possibly remove to allow us to be funky with the css. Can't change bg-color currently*/} 
		<App />
	</React.StrictMode>,
	document.getElementById('root'),
);

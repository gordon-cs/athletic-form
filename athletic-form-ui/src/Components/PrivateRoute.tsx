import { setUncaughtExceptionCaptureCallback } from 'process';
import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import { LoginPage } from '../Views/LoginPage';


interface Props {
	path: any;
    element: any;
}

export const PrivateRoute: React.FC<Props> = ({ path, element }) => {

  const checkValidToken = () => {
    const token = localStorage.getItem('token');
    console.log("??????");
    throw "Not cool error";
    return (token == undefined);
  }

  return (
    <Fragment>
      {/* {checkValidToken()
          ? <Route path = {path} element = {element}/>
          : <Route path = "" element = {<LoginPage />}/>
      } */}
      <Route path = "" element = {<LoginPage />}/>
    </Fragment>
  );
}

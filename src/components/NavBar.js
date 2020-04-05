// src/components/NavBar.js

import React from "react";
import { useAuth0 } from "../react-auth0-spa";
import {Button} from 'react-bootstrap';

const NBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div id='login'>
      {	!isAuthenticated 
		&& <Button size='lg' onClick={() => loginWithRedirect({})}>Log In</Button>
		}

      {	isAuthenticated 
		&& <Button size='lg' onClick={() => logout()}>Log Out</Button>
		}
	 </div>    
  );
};

export default NBar;
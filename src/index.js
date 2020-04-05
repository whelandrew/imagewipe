import React from 'react';
import ReactDOM from 'react-dom';
import Login from './login';
import "./styles.css";
//import ImageSwiper from './imagesorter.jsx';

import { Auth0Provider } from "./react-auth0-spa";
import config from "./auth_config.json";
import history from "./utils/history";

const onRedirectCallback = appState => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

ReactDOM.render(
	<Auth0Provider
		domain={config.domain}
		client_id={config.clientId}
		redirect_uri={window.location.origin}
		onRedirectCallback={onRedirectCallback}
	>
		<div>
			<Login />			
		</div>
	</Auth0Provider>,
	document.getElementById('app')
);

module.hot.accept();
import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-pwgws0wqro5atj3i.us.auth0.com"
      clientId="qvvIEkm6eAPYdXjFm8ZYQT8qQ6pgb76o"
      redirectUri={window.location.origin + '/react-auth0/profile'}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "https://localhost:3001/api/profile",
        scope: "read:current_user update:current_user_metadata"
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();

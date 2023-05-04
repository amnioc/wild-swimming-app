import { Outlet } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

function RootLayout() {
  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <Outlet />
    </Auth0Provider>
  );
}

export default RootLayout;

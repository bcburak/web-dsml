import { useEffect, useState } from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import useFetchApi from "../../hooks/useFetchApi";
import { callApi } from "../../utils/callApi";

interface ApiResponse {
  user: User;
}

interface User {
  _id: string;
  name: string;
  email: string;
  avatar: string;
}
interface GoogleProps {
  isTermsConfirmed: boolean;
}

function GoogleAuth({ isTermsConfirmed }: GoogleProps) {
  const [user, setUser] = useState<User | null>(null);
  // useEffect(() => {
  //   if (responseData?.user) {
  //     localStorage.setItem("user", JSON.stringify(responseData?.user));
  //     setUser(responseData.user);
  //     window.location.reload();
  //   }
  // }, [responseData]);

  const onGoogleSuccess = (credentialResponse: any) => {
    console.log("isconfirmed", isTermsConfirmed);
    if (isTermsConfirmed) {
      callApi("/api/sessions/login", "POST", {
        credential: credentialResponse.credential,
      }).then((data) => {
        localStorage.setItem("user", JSON.stringify(data?.user));
        setUser(data.user);
        window.location.reload();
      });
    } else {
      alert(
        "Please read the terms and conditions and click 'agree' before signing in."
      );
    }
  };

  return (
    <GoogleOAuthProvider clientId={`${process.env.REACT_APP_CLIENT_ID}`}>
      <GoogleLogin
        onSuccess={
          (credentialResponse: any) => {
            onGoogleSuccess(credentialResponse);
          }
          // fetchData("/api/sessions/login", "POST", {
          //   credential: credentialResponse.credential,
          // })
        }
        onError={() => {
          console.log("Login Failed");
        }}
        theme="outline"
        size="large"
        useOneTap
        logo_alignment="center"
      />
    </GoogleOAuthProvider>
  );
}

export default GoogleAuth;

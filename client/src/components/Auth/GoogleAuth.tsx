import { useState } from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

interface AuthResponse {
  token: string;
  user: User;
}

interface User {
  _id: string;
  name: string;
  email: string;
  avatar: string;
}

const GoogleAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");
  const url = "http://localhost:8000/api/sessions/login";
  const onSuccess = async (res: any) => {
    console.log("onsuccess");
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ credential: res.credential }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("data", data);
        if (data?.user) {
          localStorage.setItem("user", JSON.stringify(data?.user));
          setUser(data.user);
          window.location.reload();
        }

        throw new Error(data?.message || data);
      })
      .catch((error) => {
        setError(error?.message);
      });
  };

  const responseGoogle = (response: any) => {
    console.log("response", response);
  };

  return (
    <GoogleOAuthProvider clientId={`${process.env.REACT_APP_CLIENT_ID}`}>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          onSuccess(credentialResponse);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
        theme="outline"
        size="large"
        useOneTap
        logo_alignment="center"
      />
    </GoogleOAuthProvider>
    // <div className="h-screen w-screen flex items-center justify-center flex-col">
    //   {!user && (
    //     <GoogleLogin
    //       clientId="126611791804-882ill00ssfff57mq6m0df3sujj7knnf.apps.googleusercontent.com"
    //       onSuccess={responseGoogle}
    //       onFailure={responseGoogle}
    //     />
    //   )}

    //   {user && (
    //     <>
    //       <img src={user.avatar} className="rounded-full" />
    //       <h1 className="text-xl font-semibold text-center my-5">
    //         {user.name}
    //       </h1>
    //     </>
    //   )}
    // </div>
  );
};

export default GoogleAuth;

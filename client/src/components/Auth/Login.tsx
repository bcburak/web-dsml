import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import SendIcon from "@mui/icons-material/Send";
import Anchor from "@mui/icons-material/Anchor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GoogleLogin } from "react-google-login";
import { faInfo } from "@fortawesome/free-solid-svg-icons/faInfo";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Link as MuiLink } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getGoogleUrl } from "../../utils/getGoogleUrl";
import { useLocation } from "react-router-dom";
import { ReactComponent as GoogleLogo } from "../../assets/google.svg";
import useFetch from "../../hooks/useFetch";

const theme = createTheme();

function Login() {
  const location = useLocation();

  const { handleGoogle, loading, error } = useFetch(
    "http://localhost:8000/api/sessions/login"
  );

  React.useEffect(() => {
    /* global google */
    if ((window as any).google) {
      (window as any).google.accounts.id.initialize({
        client_id:
          "126611791804-882ill00ssfff57mq6m0df3sujj7knnf.apps.googleusercontent.com",
        callback: handleGoogle,
      });

      (window as any).google.accounts.id.renderButton(
        document.getElementById("loginDiv"),
        {
          scope: "profile email",
          width: 240,
          height: 50,
          longtitle: true,
          theme: "dark",
        }
      );

      // google.accounts.id.prompt()
    }
  }, [handleGoogle]);

  const handleLogin = async (googleData: any) => {
    console.log("googleData", googleData);
    // store returned user somehow
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>

          <Typography
            variant="h6"
            component="p"
            sx={{
              my: "1.5rem",
              textAlign: "center",
              color: "white",
            }}
          >
            Log in with another provider:
          </Typography>
          <Box
            maxWidth="27rem"
            width="100%"
            sx={{
              backgroundColor: "#e5e7eb",
              p: { xs: "1rem", sm: "2rem" },
              borderRadius: 2,
            }}
          >
            <main
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {error && <p style={{ color: "red" }}>{error}</p>}
              {loading ? <div>Loading....</div> : <div id="loginDiv"></div>}
            </main>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Login;

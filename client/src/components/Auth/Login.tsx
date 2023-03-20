import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import SendIcon from "@mui/icons-material/Send";
import Anchor from "@mui/icons-material/Anchor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

const theme = createTheme();

function Login() {
  const location = useLocation();
  const from = ((location.state as any)?.from.pathname as string) || "/home";

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
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
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
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
            <MuiLink
              href={getGoogleUrl(from)}
              sx={{
                borderRadius: 1,
                py: "0.6rem",
                columnGap: "1rem",
                textDecoration: "none",
                cursor: "pointer",
                fontWeight: 500,
                "&:hover": {
                  backgroundColor: "#968df1",
                  boxShadow: "0 1px 13px 0 rgb(0 0 0 / 15%)",
                },
              }}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <GoogleLogo style={{ height: "2rem" }} />
              Auth with Google
            </MuiLink>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Login;

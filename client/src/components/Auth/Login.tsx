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
import { useLocation } from "react-router-dom";
import { ReactComponent as GoogleLogo } from "../../assets/google.svg";
import GoogleAuth from "./GoogleAuth";
import TermsAndConditions from "./TermsAndConditions";

const theme = createTheme();

function Login() {
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isChecked, setIsChecked] = React.useState(false);
  const [isTermsConfirmed, setIsTermsConfirmed] = React.useState(false);

  const toggleTerms = () => {
    console.log("terms" + isOpen);
    setIsOpen(!isOpen);
  };
  const handleCheckboxChange = () => {
    console.log("isChecked", isChecked);
    let newState = !isChecked;
    console.log("isChecked12", !isChecked);
    setIsChecked(newState);
    console.log("isChecked13", isChecked);
    if (isChecked) {
      setIsTermsConfirmed(true);
    }
  };
  const handleAgree = () => {
    setIsTermsConfirmed(true);
    setIsChecked(true);
    // console.log("confirm" + isTermsConfirmed);
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
            <Grid container>
              <Grid item>
                <TermsAndConditions
                  isOpen={isOpen}
                  handleClose={toggleTerms}
                  onAgree={handleAgree}
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      value="accept"
                      checked={isChecked}
                      color="primary"
                      onChange={handleCheckboxChange}
                    />
                  }
                  label=""
                />
                <Link href="#" variant="body2" onClick={toggleTerms}>
                  {"I accept the terms and conditions."}
                </Link>
              </Grid>
            </Grid>
          </Box>

          <Box
            maxWidth="27rem"
            width="100%"
            sx={{
              p: { xs: "2rem", sm: "2rem" },
              borderRadius: 25,
            }}
          >
            <main
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <GoogleAuth isTermsConfirmed={isTermsConfirmed} />
            </main>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Login;

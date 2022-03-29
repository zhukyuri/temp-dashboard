import { useState } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { AuthStatus } from "../../../services/store/Store";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(5, "Password should be of minimum 5 characters length")
    .max(10, "Password should be of maximum 10 characters length")
    .required("Password is required")
});

const initialValues = {
  email: process.env.REACT_APP_DEFAULT_EMAIL,
  password: process.env.REACT_APP_DEFAULT_PASSWORD
};

function SignIn(props) {
  const { store } = props;
  const { setAuthStatus, login } = store;
  const [rememberMe, setRememberMe] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleSetRegistration = () => {
    setAuthStatus(AuthStatus.RegistrationForm);
  };

  const handleLogin = async (values) => {
    console.log(">>>>>", values);
    await login(values.email, values.password);
  };


  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>


          <Formik
            initialValues={initialValues}
            onSubmit={handleLogin}
            validationSchema={validationSchema}
          >
            {({
                touched,
                isValid,
                handleChange,
                handleBlur,
                values,
                errors
              }) => {
              return (
                <MDBox component="form" role="form">
                  <MDBox mb={2}>
                    <MDInput
                      variant="outlined"
                      size="small"
                      fullWidth
                      id="email"
                      name="email"
                      label="Email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && (errors.email || " ")}
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      variant="outlined"
                      size="small"
                      fullWidth
                      id="password"
                      name="password"
                      label="Password"
                      // type="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && (errors.password || " ")}
                    />
                  </MDBox>
                  <MDBox display="flex" alignItems="center" ml={-1}>
                    <Switch
                      checked={rememberMe}
                      onChange={handleSetRememberMe}
                    />
                    <MDTypography
                      variant="button"
                      fontWeight="regular"
                      color="text"
                      onClick={handleSetRememberMe}
                      sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                    >
                      &nbsp;&nbsp;Remember me
                    </MDTypography>
                  </MDBox>
                  <MDBox mt={4} mb={1}>
                    <MDButton
                      variant="gradient"
                      color="info"
                      fullWidth
                      disabled={!isValid}
                      onClick={() => handleLogin(values)}
                    >
                      sign in
                    </MDButton>
                  </MDBox>
                  <MDBox mt={3} mb={1} textAlign="center">
                    <MDTypography
                      variant="button"
                      color="text">
                      Don&apos;t have an account?{" "}
                      <MDTypography
                        variant="link"
                        color="info"
                        fontWeight="medium"
                        textGradient
                        onClick={handleSetRegistration}
                        sx={{ cursor: "pointer" }}
                      >
                        Sign up
                      </MDTypography>
                    </MDTypography>
                  </MDBox>
                </MDBox>
              );
            }}
          </Formik>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default SignIn;

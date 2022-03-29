import * as yup from "yup";
import { Formik } from "formik";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import { AuthStatus } from "../../../services/store/Store";

const validationSchema = yup.object({
  username: yup
    .string()
    .min(5, "Username should be of minimum 5 characters length")
    .max(10, "Username should be of maximum 10 characters length")
    .required("Email is required"),
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
  password: process.env.REACT_APP_DEFAULT_PASSWORD,
  username: process.env.REACT_APP_DEFAULT_USERNAME
};

function SignUp(props) {
  const { store } = props;
  const { setAuthStatus, registration } = store;

  const handleSetLoginForm = () => {
    setAuthStatus(AuthStatus.LoginForm);
  };

  const handleRegistration = async (values) => {
    await registration(values.email, values.password, values.username);
  };


  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Join us today
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to register
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <Formik
            initialValues={initialValues}
            onSubmit={handleRegistration}
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
                      type="text"
                      variant="outlined"
                      size="small"
                      fullWidth
                      id="username"
                      name="username"
                      label="Username"
                      value={values.username}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={touched.username && Boolean(errors.username)}
                      helperText={touched.username && (errors.username || " ")}
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      variant="outlined"
                      size="small"
                      fullWidth
                      id="email"
                      name="email"
                      label="Email"
                      value={values.email}
                      onBlur={handleBlur}
                      onChange={handleChange}
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
                    <Checkbox />
                    <MDTypography
                      variant="button"
                      fontWeight="regular"
                      color="text"
                      sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                    >
                      &nbsp;&nbsp;I agree the&nbsp;
                    </MDTypography>
                    <MDTypography
                      component="a"
                      href="#"
                      variant="button"
                      fontWeight="bold"
                      color="info"
                      textGradient
                    >
                      Terms and Conditions
                    </MDTypography>
                  </MDBox>
                  <MDBox mt={4} mb={1}>
                    <MDButton
                      variant="gradient"
                      color="info"
                      fullWidth
                      disabled={!isValid}
                      onClick={() => handleRegistration(values)}
                    >
                      sign up
                    </MDButton>
                  </MDBox>
                  <MDBox mt={3} mb={1} textAlign="center">
                    <MDTypography variant="button" color="text">
                      Already have an account?{" "}
                      <MDTypography
                        variant="link"
                        color="info"
                        fontWeight="medium"
                        textGradient
                        onClick={handleSetLoginForm}
                        sx={{ cursor: "pointer" }}
                      >
                        Sign in
                      </MDTypography>
                    </MDTypography>
                  </MDBox>
                </MDBox>
              );
            }}
          </Formik>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default SignUp;

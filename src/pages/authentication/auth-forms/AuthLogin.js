import React from 'react';
//import { Link as RouterLink } from 'react-router-dom';

// material-ui
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

import {
  Button,
  //Checkbox,
  //Divider,
  //FormControlLabel,
  FormHelperText,
  Grid,
  //Link,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Alert
  //Typography
} from '@mui/material';

// third party
import * as yup from 'yup';
import { useFormik } from 'formik';
// project import
//import FirebaseSocial from './FirebaseSocial';
import AnimateButton from 'components/@extended/AnimateButton';
import { useNavigate } from 'react-router-dom';
// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import jQuery from 'jquery';

const validationSchema = yup.object({
  //email: yup.string().email().required('Email is required').min(5),
  email: yup.string().required('Email is required').min(5),
  password: yup.string().required('Password is required')
  // .matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
  //   'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
  // )
});

const AuthLogin = () => {
  //const [checked, setChecked] = React.useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: false,

    onSubmit: (values) => {
      // const email = values.email;
      // const password = values.password;
      const username = values.email;
      const password = values.password;
      // fetch(ApiUrl + '/api/user/login-with-username-and-password', {
      fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          // email: email,
          // password: password
          username: username,
          password: password
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
          //  "X-Tenant": "scmns-techversant-db"
        }
      })
        .then((response) => response.json())
        .then((data) => {

          //Authentication.registerSuccessfulLogin(data);

          if (data.errorCode === 0 && data.user !== null) {
            if (data.user.role.role === 'SuperAdmin') navigate('/dash');
            console.log(data);
          }
          if (data.user.role.role === 'Admin') {
            if (data.user.school.dbName !== dbName) {
              console.log(data.user.role.role);
              Authentication.setSchool(data.user.school);
              navigate('/schooldashboard');
            }
          } else {
            console.log('error');
            jQuery('#wrongUserAlert').show();
          }
        })
        .catch((err) => {
          jQuery('#wrongUserAlert').show();
          jQuery('#wrongUserAlert').css('display', 'flex');
          console.log(err.message);
        });
    }
  });
  const Close = () => {
    // jQuery('#usernameAlert').css('display', 'none');
    // jQuery('#passwordAlert').css('display', 'none');
    jQuery('#wrongUserAlert').css('display', 'none');
  };

  return (
    <>
      <Collapse in={open}>
        {' '}
        <Alert
          severity="error"
          id="wrongUserAlert"
          style={{ display: 'none', marginTop: '10px' }}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                //setOpen(false);
                Close();
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Please check the Username / Password
        </Alert>{' '}
      </Collapse>

      <form noValidate onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="email-login">Email Address</InputLabel>
              <OutlinedInput
                id="email-login"
                type="email"
                value={formik.values.email}
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder="Enter email address"
                fullWidth
                error={Boolean(formik.touched.email && formik.errors.email)}
              />
              {formik.touched.email && formik.errors.email && (
                <FormHelperText error id="standard-weight-helper-text-email-login">
                  {formik.errors.email}
                </FormHelperText>
              )}
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="password-login">Password</InputLabel>
              <OutlinedInput
                fullWidth
                error={Boolean(formik.touched.password && formik.errors.password)}
                id="-password-login"
                type={showPassword ? 'text' : 'password'}
                value={formik.values.password}
                name="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                    </IconButton>
                  </InputAdornment>
                }
                placeholder="Enter password"
              />
              {formik.touched.password && formik.errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-login">
                  {formik.errors.password}
                </FormHelperText>
              )}
            </Stack>
          </Grid>

          {/* <Grid item xs={12} sx={{ mt: -1 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={(event) => setChecked(event.target.checked)}
                        name="checked"
                        color="primary"
                        size="small"
                      />
                    }
                    label={<Typography variant="h6">Keep me sign in</Typography>}
                  />
                  <Link variant="h6" component={RouterLink} to="" color="text.primary">
                    Forgot Password?
                  </Link>
                </Stack>
              </Grid> */}
          {formik.errors.submit && (
            <Grid item xs={12}>
              <FormHelperText error>{formik.errors.submit}</FormHelperText>
            </Grid>
          )}
          <Grid item xs={12}>
            <AnimateButton>
              <Button fullWidth size="large" type="submit" variant="contained" color="primary">
                Login
              </Button>
            </AnimateButton>
          </Grid>
          {/* <Grid item xs={12}>
                <Divider>
                  <Typography variant="caption"> Login with</Typography>
                </Divider>
              </Grid>
              <Grid item xs={12}>
                <FirebaseSocial />
              </Grid> */}
        </Grid>
      </form>
      {/* </Formik> */}
    </>
  );
};

export default AuthLogin;

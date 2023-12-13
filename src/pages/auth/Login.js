import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import PageTitle from "../common/PageTitle";
import { useFormik } from "formik";
import axios from "axios";
import httpClient from "../../util/HttpClient";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [apiSuccess, setApiSuccess] = useState("");
  const [apiError, setApiError] = useState("");
  const [closeSnakeBar, setCloseSnakeBar] = useState(false);


  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const loginForm = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      login(values);
    },
  });

  const login = async (userInfo) => {
    axios
      .post("http://localhost:4000/api/login", userInfo)
      .then((res) => {
        if (res.data.success) {
          //store token in local storage
          window.localStorage.setItem("token", JSON.stringify(res.data.token));
          setApiSuccess("Logged In Successfully");
          setAlertMessage("Logged In Successfully");
          setCloseSnakeBar(true);
          navigate("/web/dashboard");
        }
      })
      .catch((error) => {
        setApiError(error.response.data.message);
        setAlertMessage(error.response.data.message);
        setCloseSnakeBar(true);
      });
  };

  return (
    <>
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
        <PageTitle title={"Login"} />
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={6}>
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <Snackbar
                      open={closeSnakeBar}
                      autoHideDuration={1000}
                      message={alertMessage}
                      color="red"
                      ContentProps={{
                        sx: apiSuccess
                          ? { color: "white", backgroundColor: "blue" }
                          : { color: "white", backgroundColor: "red" },
                      }}

                      anchorOrigin={{
                        horizontal: "right",
                        vertical: "bottom",
                      }}
                      action={
                        <React.Fragment>
                          <IconButton
                            aria-label="close"
                            color="inherit"
                            sx={{ p: 0.5 }}
                            onClick={() => setCloseSnakeBar(false)}
                          >
                            <CloseIcon />
                          </IconButton>
                        </React.Fragment>
                      }
                    />

                    <CForm onSubmit={loginForm.handleSubmit}>
                      <h1>Login</h1>
                      <p className="text-medium-emphasis">
                        Sign In to your account
                      </p>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <span>
                            <i className="bi bi-envelope"></i>
                          </span>
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Email"
                          name="email"
                          id="email"
                          onChange={loginForm.handleChange}
                          value={loginForm.values.email}
                          onClick={() => setCloseSnakeBar(false)}
                        />
                        {loginForm.errors.email && loginForm.touched.email && (
                          <div className="invalid-feedback">
                            {loginForm.errors.email}
                          </div>
                        )}
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <span role="button" onClick={handleShowPassword}>
                            <i
                              className={
                                showPassword ? "bi bi-eye" : "bi bi-eye-slash"
                              }
                            ></i>
                          </span>
                        </CInputGroupText>
                        <CFormInput
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          autoComplete="current-password"
                          name="password"
                          id="password"
                          onChange={loginForm.handleChange}
                          value={loginForm.values.password}
                          onClick={() => setCloseSnakeBar(false)}
                        />
                        {loginForm.errors.password &&
                          loginForm.touched.password && (
                            <div className="invalid-feedback">
                              {loginForm.errors.password}
                            </div>
                          )}
                      </CInputGroup>
                      <CRow>
                        <CCol xs={6}>
                          <CButton
                            type="submit"
                            color="primary"
                            className="px-4"
                          >
                            Login
                          </CButton>
                        </CCol>
                        <CCol xs={6} className="text-right">
                          <Link className="px-0" to={"/auth/forgot"}>
                            Forgot Password?
                          </Link>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </>
  );
};

export default Login;

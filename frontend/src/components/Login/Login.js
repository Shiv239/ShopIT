/* AUTHOR: Tanvi Pruthi*/

import React from "react";
import {NavLink, useNavigate} from "react-router-dom";
import useInput from "../../hooks/use-input";
import "./Login.css";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Row
} from "reactstrap";

import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import axios from "axios";
import constants from "../../constants/constants"
const api = axios.create({
    baseURL: `${constants.API_BASE_URL}`,
  });
let invalidLogin = false;
// Email Validation Regex
const regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

// Handle input changes
const simpleChangeHandler = (event) => {
  return event.target.value;
};



const Login = (props) => {
  const history = useNavigate();

  // Email
  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler
  } = useInput((value) => regex.test(value) === true, simpleChangeHandler);

  // Password
  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler
  } = useInput((value) => value.length >= 8, simpleChangeHandler); // Not using trim here as passwords may contain spaces in the beginning or end

  let formIsValid = false;

  if (enteredEmailIsValid && enteredPasswordIsValid) {
    formIsValid = true;
  }

  const formRegisterClickHandler = async () => {
    api.post("/user/verifyUser", {
      email_id: enteredEmail,
      user_password: enteredPassword.toString()
    }).then(
        res => {
          if (res.status === 200 && res.data['message'] === "User logged in successfully!") {
            alert(res.data['message'])
            localStorage.setItem("email", enteredEmail);
            history("/dashboard")
            window.location.reload();
          } else if (res.status === 200 && res.data['message'] === "User doesn't exist. Create an account.") {
            alert(res.data['message'])
            history("/register")
            window.location.reload();
          } else if (res.status === 200 && res.data['message'] === "User found, but email and password combination doesn't match.") {
            alert(res.data['message'] + " Please login again!")
            history("/login")
            window.location.reload();
          } else {
            alert("something went wrong")
            history("/login")
            window.location.reload();
          }

        });
  };

  return (
      <div className="bg-image-login">
        <NavBar/>
        <Col className="card-border-login">
          <Card>
            <CardHeader>
              <div className="text-center">
                <Button
                    className="btn-neutral btn-icon mr-4"
                    color="default"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                >
                <span className="btn-inner--icon">
                  <img
                      alt="..."
                      src={process.env.PUBLIC_URL + '/static/usericon.png'}
                      width={100} height={100}
                  />
                </span>
                </Button>
              </div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center">
                <b>LOGIN</b>
              </div>
              <Form role="form">
                <label className="display-label"><b>Email</b></label>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupText>
                      📧
                    </InputGroupText>
                    <Input
                        placeholder="Your valid email address"
                        id="email"
                        type="email"
                        autoComplete="new-email"
                        onChange={emailChangeHandler}
                        onBlur={emailBlurHandler}
                        value={enteredEmail}
                        className="form-control"
                    />
                  </InputGroup>
                </FormGroup>
                <label className="display-label"><b>Password</b></label>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupText>
                      🔒
                    </InputGroupText>
                    <Input
                        placeholder="Your password"
                        id="password"
                        type="password"
                        autoComplete="new-password"
                        onChange={passwordChangeHandler}
                        onBlur={passwordBlurHandler}
                        value={enteredPassword}
                        className="form-control"
                    />
                  </InputGroup>
                </FormGroup>
                <div className="text-center">
                  <Button onClick={formRegisterClickHandler} color="primary"
                          type="button" disabled={!formIsValid}>
                    LOGIN
                  </Button>
                </div>
                <Row className="my-4">
                  <Col xs="12">
                    <label
                        className="custom-control-label"
                        htmlFor="customCheckRegister"
                    >
                      <span className="text-muted">
                        New Customer?{" "}
                        <NavLink to="/register">
                          Create you account!
                        </NavLink>
                      </span>
                    </label>
                  </Col>
                </Row>
                <Row className="my-4">
                  <Col xs="12">
                    <label
                        className="custom-control-label"
                        htmlFor="customCheckRegister"
                    >
                      <span className="text-muted">
                        New Customer?{" "}
                        <NavLink to="/forgotpassword">
                          Forgot Password?
                        </NavLink>
                      </span>
                    </label>
                  </Col>
                </Row>
                {passwordInputHasError && (
                    <p className="text-danger">* Must contain alpha-numeric, special and minimum 8 characters.</p>
                )}
                {emailInputHasError && (
                    <p className="text-danger">* Invalid Email ID.</p>
                )}
                {invalidLogin && (
                    <p className="text-danger">* Incorrect email and password combination.</p>
                )}

              </Form>
            </CardBody>
          </Card>
        </Col>
        <Footer/>
      </div>
  );
};

export default Login;
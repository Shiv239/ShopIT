/* AUTHOR: Tanvi Pruthi*/

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
    Row,
} from "reactstrap";


import "./register.css";
import React from "react";
import {NavLink, useNavigate} from "react-router-dom";
import useInput from "../../hooks/use-input";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import axios from "axios";
import constants from "../../constants/constants"
const api = axios.create({
    baseURL: `${constants.API_BASE_URL}`,
  });
// Email Validation Regex
const regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

// Password Validation Regex
const regexPassword =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

// Handle input changes
const simpleChangeHandler = (event) => {
    return event.target.value;
};
const Register = (props) => {
    const history = useNavigate();

    // Enter and Validate Email Id
    const {
        value: enteredEmail,
        isValid: enteredEmailIsValid,
        hasError: emailInputHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler
    } = useInput((value) => regex.test(value) === true, simpleChangeHandler);

    // Enter and Validate Password
    const {
        value: enteredPassword,
        isValid: enteredPasswordIsValid,
        hasError: passwordInputHasError,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler
    } = useInput((value) => regexPassword.test(value) === true, simpleChangeHandler); // Not using trim here as passwords may contain spaces in the beginning or end

    // Enter and Confirm Password
    const {
        value: enteredConfirmPassword,
        isValid: enteredConfirmPasswordIsValid,
        hasError: confirmPasswordInputHasError,
        valueChangeHandler: confirmPasswordChangeHandler,
        inputBlurHandler: confirmPasswordBlurHandler
    } = useInput((value) => value.trim() === enteredPassword, simpleChangeHandler); // Not using trim here as passwords may contain spaces in the beginning or end

    let formIsValid = false;

    if (enteredEmailIsValid && enteredPasswordIsValid && enteredConfirmPasswordIsValid) {
        formIsValid = true;
    }

    // On Clicking Sign-Up button, MongoDB database and backend is called and verified.
    const formRegisterClickHandler = async () => {
        api.post("/user/addUser", {
            email_id: enteredEmail,
            user_password: enteredPassword.toString()
        }).then(
            res => {
                if (res.status === 200 && res.data['message'] === "User registered successfully!") {
                    alert(res.data['message'])
                    localStorage.setItem("email", enteredEmail);
                    history("/login")
                    window.location.reload();
                } else if (res.status === 200 && res.data['message'] === "User already exists.") {
                    history("/register")
                    alert(res.data['message'] + " Please register again!")
                    window.location.reload();
                } else {
                    history("/register")
                    console.log(res.data['message'] + "Failed to register user" + enteredEmail + ".");
                    alert(res.data['message'])
                    window.location.reload();
                }

            });
    };

    // Front-end html code for register page
    return (
        <div className="bg-image">
            <NavBar/>
            <Col className="card-border-register">
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
                        <div className="text-center text-muted mb-4">
                            <b>CREATE ACCOUNT</b>
                        </div>
                        <Form role="form">
                            <label className="display-label"><b>Enter your email ID</b></label>
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
                            <label className="display-label"><b>Confirm Password</b></label>
                            <FormGroup>
                                <InputGroup className="input-group-alternative mb-3">
                                    <InputGroupText>
                                        🔒
                                    </InputGroupText>
                                    <Input
                                        placeholder="Your password confirmation"
                                        id="confirmPassword"
                                        type="password"
                                        className="form-control"
                                        onChange={confirmPasswordChangeHandler}
                                        onBlur={confirmPasswordBlurHandler}
                                        value={enteredConfirmPassword}
                                    />
                                </InputGroup>
                            </FormGroup>
                            <Row className="my-4">
                                <Col xs="12">
                                    <label
                                        className="custom-control-label"
                                        htmlFor="customCheckRegister"
                                    >
                      <span className="text-muted">
                        Already have an account?{" "}
                          <NavLink to="/login">
                          Login
                        </NavLink>
                      </span>
                                    </label>
                                </Col>
                            </Row>
                            <div className="text-center">
                                <Button onClick={formRegisterClickHandler} className="mt-10" color="primary"
                                        type="button"
                                        disabled={!formIsValid}>
                                    SIGN UP
                                </Button>
                            </div>
                            {passwordInputHasError && (
                                <p className="text-danger">* Must contain alpha-numeric, special and minimum 8
                                    characters.</p>
                            )}
                            {emailInputHasError && (
                                <p className="text-danger">* Invalid Email ID.</p>
                            )}
                            {confirmPasswordInputHasError && (
                                <p className="text-danger">* Password doesn't match.</p>
                            )}
                        </Form>
                    </CardBody>
                </Card>
            </Col>
            <Footer/>
        </div>
    );
};

export default Register;

import React, { Component } from "react";
import Background from "../../../hoc/Background/Background";
import axios from "axios";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/
);
const phoneRegex = RegExp(
  /^(\+91)?(-)?\s*?(91)?\s*?(\d{3})-?\s*?(\d{3})-?\s*?(\d{4})*$/
);
const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach((val) => {
    val === null && (valid = false);
  });

  return valid;
};
export class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      regNo: null,
      email: null,
      password: null,
      conPass: null,
      phone: null,
      github: null,
      formErrors: {
        name: "",
        regNo: "",
        email: "",
        password: "",
        conPass: "",
        phone: "",
        github: "",
      },
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (formValid(this.state)) {
      console.log(`
          --SUBMITTING--
          Name: ${this.state.name}
          Registration Number: ${this.state.regNo}
          Email: ${this.state.email}
          Password: ${this.state.password}
          Confirm Password: ${this.state.conPass}
          Phone: ${this.state.phone}
          Github: ${this.state.github}
        `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "name":
        formErrors.firstName =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "regNo":
        formErrors.userName =
          value.length < 9 ? "minimum 9 characaters required" : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "password":
        formErrors.password =
          value.length < 8 ? "minimum 8 characaters required" : "";
        break;
      case "conPass":
        /*
        if (typeof input["password"] !== "undefined" && typeof input["confirm_password"] !== "undefined") {
          
        if (input["password"] != input["confirm_password"]) {
          isValid = false;
          errors["password"] = "Passwords don't match.";
        */
        break;
      case "phone":
        formErrors.phone = phoneRegex.test(value) ? "" : "invalid phone number";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };
  createAccountClickHandler = () => {
    this.setState({ firstPage: false });
  };
  inputChangeHandler = (e, s) => {
    this.setState({ [s]: e.target.value });
  };
  formSubmitHandler = (e, a) => {
    const data = JSON.stringify({
      name: this.state.name,
      regNo: this.state.regNo,
      email: this.state.email,
      phone: this.state.phone,
      yearofstudy: "1",
      password: this.state.password,
      // github: this.state.github,
    });
    var config = {
      method: "post",
      url: "https://adgrecruitments.herokuapp.com/user/signup",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        a.history.push("/login");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    return (
      <Background>
        <form>
          {this.state.firstPage ? (
            <div>
              <div className="heading">Sign Up</div>
              <div className="input-grp">
                <label>Name</label>

                <input
                  className={formErrors.name.length > 0 ? "error" : null}
                  type="text"
                  placeholder="Enter your name"
                  onChange={(event) => {
                    this.inputChangeHandler(event, "name");
                  }}
                />
                {formErrors.firstName.length > 0 && (
                  <span className="errorMessage">{formErrors.name}</span>
                )}
              </div>
              <div className="input-grp">
                <label>Registration Number</label>
                <input
                  className={formErrors.regNo.length > 0 ? "error" : null}
                  type="text"
                  placeholder="Enter Registration number"
                  onChange={(event) => {
                    this.inputChangeHandler(event, "regNo");
                  }}
                />
                {formErrors.regNo.length > 0 && (
                  <span className="errorMessage">{formErrors.regNo}</span>
                )}
              </div>
              <div className="input-grp">
                <label>Password</label>
                <input
                  className={formErrors.password.length > 0 ? "error" : null}
                  type="password"
                  placeholder="Enter your password"
                  onChange={(event) => {
                    this.inputChangeHandler(event, "password");
                  }}
                />
                {formErrors.password.length > 0 && (
                  <span className="errorMessage">{formErrors.password}</span>
                )}
              </div>
              <div className="input-grp">
                <label>Confirm password</label>
                <input
                  className={formErrors.conPass.length > 0 ? "error" : null}
                  type="password"
                  placeholder="Confirm password"
                  onChange={(event) => {
                    this.inputChangeHandler(event, "conPass");
                  }}
                />
                {formErrors.conPass.length > 0 && (
                  <span className="errorMessage">{formErrors.conPass}</span>
                )}
              </div>
              <div className="sub-btn" onClick={this.createAccountClickHandler}>
                Create account
              </div>
            </div>
          ) : (
            <div>
              <div className="heading">Sign Up</div>
              <div className="input-grp">
                <label>Phone</label>
                <input
                  className={formErrors.phone.length > 0 ? "error" : null}
                  type="text"
                  placeholder="Enter your phone no."
                  onChange={(event) => {
                    this.inputChangeHandler(event, "phone");
                  }}
                />
                {formErrors.phone.length > 0 && (
                  <span className="errorMessage">{formErrors.phone}</span>
                )}
              </div>
              <div className="input-grp">
                <label>VIT-Email</label>
                <input
                  className={formErrors.email.length > 0 ? "error" : null}
                  type="text"
                  placeholder="Enter your VIT Email"
                  onChange={(event) => {
                    this.inputChangeHandler(event, "email");
                  }}
                />
                {formErrors.email.length > 0 && (
                  <span className="errorMessage">{formErrors.email}</span>
                )}
              </div>
              <div className="input-grp">
                <label>Github</label>
                <input
                  className={formErrors.github.length > 0 ? "error" : null}
                  type="text"
                  placeholder="Enter your github handle"
                  onChange={(event) => {
                    this.inputChangeHandler(event, "github");
                  }}
                />
                {formErrors.github.length > 0 && (
                  <span className="errorMessage">{formErrors.github}</span>
                )}
              </div>
              <div
                className="sub-btn"
                onClick={(event) => {
                  this.formSubmitHandler(event, this.props);
                }}
              >
                Sign Up
              </div>
            </div>
          )}
        </form>
      </Background>
    );
  }
}
export default SignUp;

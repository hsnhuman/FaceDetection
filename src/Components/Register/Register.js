import React from "react";
import Cookies from "js-cookie";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: "",
      Password: "",
      Name: "",
      Errors: {},
    };
  }

  onNamechange = (event) => {
    this.setState({ Name: event.target.value });
  };

  onEmailchange = (event) => {
    this.setState({ Email: event.target.value });
  };

  onPasswordchange = (event) => {
    this.setState({ Password: event.target.value });
  };

  validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!this.state.Name) {
      errors.Name = "Name is required.";
    }
    if (!this.state.Email || !emailRegex.test(this.state.Email)) {
      errors.Email = "Invalid email address.";
    }
    if (!this.state.Password || this.state.Password.length < 6) {
      errors.Password = "Password must be at least 6 characters long.";
    }

    this.setState({ Errors: errors });
    return Object.keys(errors).length === 0;
  };

  onsubmitRegister = () => {
    if (this.validateForm()) {
      fetch("http://localhost:5000/Register", {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          Email: this.state.Email,
          Password: this.state.Password,
          Name: this.state.Name,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.token) {
            Cookies.set("token", data.token, { expires: 7 }); // ✅ Store token
          } else {
            console.error("Token not found in response.");
          }

          if (data.success && data.user && data.user.id) {
            this.props.loaduser(data.user);
            this.props.onroutechange("home");
          } else {
            console.error("Registration failed:", data);
            alert("Registration failed. Please check your details.");
          }
        })
        .catch((error) => {
          console.error("Error during registration:", error);
          alert("An error occurred while registering. Please try again.");
        });
    }
  };

  render() {
    const { onroutechange } = this.props;
    return (
      <article className="br3 ba --black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="Name">
                  Name
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="Name"
                  id="Name"
                  onChange={this.onNamechange}
                />
                {this.state.Errors.Name && (
                  <div style={{ color: "red", fontSize: "0.8em" }}>
                    {this.state.Errors.Name}
                  </div>
                )}
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailchange}
                />
                {this.state.Errors.Email && (
                  <div style={{ color: "red", fontSize: "0.8em" }}>
                    {this.state.Errors.Email}
                  </div>
                )}
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordchange}
                />
                {this.state.Errors.Password && (
                  <div style={{ color: "red", fontSize: "0.8em" }}>
                    {this.state.Errors.Password}
                  </div>
                )}
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={this.onsubmitRegister}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Register"
              />
            </div>
            <div className="lh-copy mt3"></div>
          </div>
          <div className="lh-copy mt3">
            <p
              onClick={() => onroutechange("Signin")}
              className="f6 link dim black db pointer"
            >
              Sign in
            </p>
          </div>
        </main>
      </article>
    );
  }
}
export default Register;

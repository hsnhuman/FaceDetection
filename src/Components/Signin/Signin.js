import React from "react";
import Cookies from "js-cookie";
class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signinEmail: "",
      signinPassword: "",
    };
  }

  onEmailchange = (event) => {
    this.setState({ signinEmail: event.target.value });
  };

  onPasswordchange = (event) => {
    this.setState({ signinPassword: event.target.value });
  };

  onsubmitSignin = () => {
    fetch("https://faceds.liara.run/Signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Email: this.state.signinEmail,
        Password: this.state.signinPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Received from backend:", data); // ✅ Debugging step
        if (data.token) {
          Cookies.set("token", data.token, { expires: 7 }); // Store token
        } else {
          console.error("Token not found in response.");
        }

        if (data.success && data.user && data.user.id) {
          // ✅ Check user inside response
          this.props.loaduser(data.user);
          this.props.onroutechange("home");
        } else {
          console.error("Invalid login:", data);
          alert("Sign in failed. Please check your credentials.");
        }
      })
      .catch((error) => {
        console.error("Error during sign in:", error);
        alert("An error occurred while signing in. Please try again.");
      });
  };

  render() {
    const { onroutechange } = this.props;
    return (
      <div className="br3 ba --black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="Email-address">
                  Email
                </label>
                <input
                  onChange={this.onEmailchange}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="Email-address"
                  id="Email-address"
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="Password">
                  Password
                </label>
                <input
                  onChange={this.onPasswordchange}
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="Password"
                  id="Password"
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={this.onsubmitSignin}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
              />
            </div>
            <div className="lh-copy mt3">
              <p
                onClick={() => onroutechange("Register")}
                className="f6 link dim black db pointer"
              >
                Register
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default Signin;

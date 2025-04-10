import "./App.css";
import React, { Component } from "react";
import Navigation from "./Components/navigation/Navigation";
import Logo from "./Components/Logo/Logo";
import Imagelinkform from "./Components/Imagelinkform/Imagelinkform";
import Rank from "./Components/Rank/Rank";
import Signin from "./Components/Signin/Signin";
import Register from "./Components/Register/Register";
import ParticlesApp from "./Components/Particles";
import Cookies from "js-cookie";
import FaceRecognition from "./Components/FaceRecognition/FaceRecognition";
const initialstate = {
  input: "",
  imageUrl: "",
  box: [],
  route: "Signin",
  isSignedIn: false,
  user: {
    id: "",
    Name: "",
    Email: "",
    entries: 0,
    join: "",
  },
};
class App extends Component {
  constructor() {
    super();
    this.state = initialstate;
  }
  componentDidMount() {
    const token = Cookies.get("token");
    if (token) {
      fetch("https://faceds.liara.run/home", {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success && data.user) {
            this.loaduser(data.user); // Load user data
            this.setState({ isSignedIn: true, route: "home" });
          } else {
            console.error("Session expired or invalid token.");
            this.setState({ isSignedIn: false, route: "Signin" });
          }
        })
        .catch((error) => {
          console.error("Error validating token:", error);
        });
    }
  }
  loaduser = (user) => {
    this.setState({
      user: {
        id: user.id,
        Name: user.Name,
        Email: user.Email,
        entries: user.entries,
        join: user.joined,
      },
      isSignedIn: true, // Ensure user is marked as signed-in
    });
  };
  finddata = () => {
    fetch("https://faceds.liara.run/home", {
      method: "GET",
      credentials: "include", // ✅ Send cookies with the request
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response from backend:", data); // ✅ Debugging
        if (data.message) {
          alert(data.message); // ✅ Example usage: Show welcome message
        } else {
          alert("Authentication failed. Please log in again.");
        }
      })
      .catch((error) => {
        console.error("Error fetching home route:", error);
        alert("An error occurred while fetching data.");
      });
  };

  calculateFaceLocation = (data) => {
    const image = document.getElementById("inputimage");
    const clarifaiFace = data.region_info.bounding_box;
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  displayfacebox = (box) => {
    this.setState({ box: box });
  };

  oninputchange = (event) => {
    this.setState({ input: event.target.value });
  };

  onbuttonsubmit = () => {
    this.setState({ imageUrl: this.state.input });

    // Update image count in backend
    fetch("hhttps://faceds.liara.run/image", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: String(this.state.user.id) }),
    })
      .then((res) => res.json())
      .then((count) => {
        this.setState({
          user: { ...this.state.user, entries: count },
        });
      })
      .catch((err) => console.error("Error updating image count:", err));

    // Make Clarifai API request through backend proxy
    fetch("https://faceds.liara.run/clarifai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageUrl: this.state.input }),
    })
      .then((response) => response.json())
      .then((result) => {
        try {
          // Ensure `outputs` and `data` exist in the response
          if (result.outputs && result.outputs[0].data.regions) {
            const regions = result.outputs[0].data.regions;
            const faceBox = this.calculateFaceLocation(regions[0]);
            this.displayfacebox(faceBox);
          } else {
            throw new Error("Face data not found in API response.");
          }
        } catch (error) {
          console.error("Error processing face data:", error);
        }
      })
      .catch((error) =>
        console.error("Error fetching data from Clarifai API:", error)
      );
  };

  onroutechange = (route) => {
    if (route === "Signout") {
      Cookies.remove("token");
      this.setState(initialstate);
    } else if (route === "home") {
      const token = Cookies.get("token");
      if (token) {
        this.setState({ isSignedIn: true, route: "home" });
      } else {
        alert("Session expired. Please sign in again.");
        this.setState({ isSignedIn: false, route: "Signin" });
      }
    } else {
      this.setState({ route });
    }
  };

  render() {
    return (
      <div className="App">
        <ParticlesApp className="ppa" />
        <Navigation
          isSignedIn={this.state.isSignedIn}
          onroutechange={this.onroutechange}
        />
        {this.state.route === "home" ? (
          <div>
            <Logo />
            <Rank
              Name={this.state.user.Name}
              entries={this.state.user.entries}
            />
            <Imagelinkform
              oninputchange={this.oninputchange}
              onbuttonsubmit={this.onbuttonsubmit}
            />
            <FaceRecognition
              box={this.state.box}
              imageUrl={this.state.imageUrl}
            />
          </div>
        ) : this.state.route === "Register" ? (
          <Register
            loaduser={this.loaduser}
            onroutechange={this.onroutechange}
          />
        ) : (
          <Signin loaduser={this.loaduser} onroutechange={this.onroutechange} />
        )}
      </div>
    );
  }
}

export default App;

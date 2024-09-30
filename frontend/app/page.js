"use client";

import initialState from "@/actions/initialState";
import Dashboard from "@/components/Dashboard";
import Header from "@/components/Header";
import LandingPage from "@/components/LandingPage";
import LockScreen from "@/components/LockScreen";
import VidyaSaathiLandingPage from "@/components/VidyaSaarthiLandingPage";
import DispatchContext from "@/context/DispatchContext";
import StateContext from "@/context/StateContext";
import ourReducer from "@/reducers/ourReducer";
import Axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useImmerReducer } from "use-immer";

Axios.defaults.baseURL = "http://localhost:4000";

export default function Home() {
  const [state, dispatch] = useImmerReducer(ourReducer, initialState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (state.loggedIn) {
      localStorage.setItem("talentSyncToken", state.user.token);
      localStorage.setItem("talentSyncRole", state.user.role);
      localStorage.setItem("talentSyncId", state.user.id);
      console.log("logged in");
    } else {
      localStorage.removeItem("talentSyncToken");
      localStorage.removeItem("talentSyncEmail");
      localStorage.removeItem("talentSyncId");
      console.log("logged out");
    }
  }, [state.loggedIn]);

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post("/login-student", { email, password });
      console.log(response);
      // const response = await Axios.post("/login-student", { email, password });
      if (response.data) {
        dispatch({ type: "login", data: response.data });
      } else {
        console.log("Incorrect email / Password");
      }
    } catch (e) {
      console.log("There was a problem" + e);
    }
  };

  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post("/register-student", {
        email,
        password,
      });
      console.log(response);
      if (response.data) {
        dispatch({ type: "login", data: response.data }); // Use `dispatch` here
      } else {
        console.log("Registration failed");
        console.log(response.data);
        dispatch({ type: "register", data: response.data }); // Use `dispatch` here
      }
    } catch (e) {
      console.log("There was a problem" + e);
    }
  };

  const logoutHandler = () => {
    dispatch({ type: "logout" });
  };

  return (
    <>
      <StateContext.Provider value={state}>
        <DispatchContext.Provider value={dispatch}>
          {/* <VidyaSaathiLandingPage /> */}
          <LockScreen />

          {/* <>
            {state.loggedIn ? (
              <>
                <h1>Logged in</h1>
                <button onClick={logoutHandler}>Logout</button>
              </>
            ) : (
              <>
                <RegistrationForm />
              </>
            )}
          </>
          </> */}
        </DispatchContext.Provider>
      </StateContext.Provider>
    </>
  );
}

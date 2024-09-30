import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import LockScreen from "./LockScreen";
import RegistrationPage from "./RegistrationPage";
import RegistrationPageMentor from "./RegistrationPageMentor";
import LoginPage from "./LoginPage";
import Hero from "./Hero";
import Dashboard from "./Dashboard";
import ScholarshipPortal from "./ScholarshipPortal";
import LandingPage from "./forum/LandingPage";
import AddForum from "./forum/AddForum";
import SingleForum from "./forum/SingleForum";

// import DispatchContext from "";
// import StateContext from "./StateContext.js";
import { useImmerReducer } from "use-immer";
import LoginPageMentor from "./LoginPageMentor";
import RegistrationPageTutor from "./RegistrationPageTutor";
import LoginPageTutor from "./LoginPageTutor";

const RoutesPage = () => {
  //<> </> this is called as a react fragment.
  const initialState = {
    loggedIn: Boolean(localStorage.getItem("talentSyncToken")),
    flashMessages: [],
    user: {
      token: localStorage.getItem("talentSyncToken"),
      username: localStorage.getItem("talentSyncEmail"),
    },
    //Now we wil have this user object that will be available in our globval or app wide state.
    //Any other component that needs to acces this data, it no longer needs to access it from the broswer, but will be avaialble from within the state.
  };

  function ourReducer(draft, action) {
    switch (action.type) {
      case "login":
        draft.loggedIn = true;
        draft.user = action.data.data;
        return; //Use either return or break
      case "logout":
        draft.loggedIn = false;
        return;
      case "flashMessage":
        draft.flashMessages.push(action.value);
        return;
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState);

  useEffect(() => {
    if (state.loggedIn) {
      //if true
      //localStorage, has nothing to do with react, but with web browser
      localStorage.setItem("talentSyncToken", state.user.token);
      localStorage.setItem("talentSyncRole", state.user.role);
      localStorage.setItem("talentSyncId", state.user.id);
      console.log("LOGGED IN");

      //2 arguments. a= name for the piece of data we want to store. (We can name it anything). b == the data we want to store
    } else {
      localStorage.removeItem("talentSyncToken");
      localStorage.removeItem("talentSyncEmail");
      localStorage.removeItem("talentSyncId");
      console.log("LOGGED OUT");
    }
  }, [state.loggedIn]);
  const navigate = useNavigate();
  return (
    <Routes>
      <Route
        path="/"
        element={state.loggedIn ? <div>Loged in</div> : <LockScreen />}
      />

      <Route
        path="/register"
        element={state.loggedIn ? <div>Logged In</div> : <RegistrationPage />}
      />

      <Route
        path="/register-mentor"
        element={
          state.loggedIn ? navigate("/dashboard") : <RegistrationPageMentor />
        }
      />

      <Route
        path="/register-tutor"
        element={
          state.loggedIn ? navigate("/dashboard") : <RegistrationPageTutor />
        }
      />

      <Route
        path="/login"
        element={state.loggedIn ? <Dashboard /> : <LoginPage />}
      />

      <Route
        path="/login-mentor"
        element={state.loggedIn ? navigate("/dashboard") : <LoginPageMentor />}
      />

      <Route
        path="/login-tutor"
        element={state.loggedIn ? navigate("/dashboard") : <LoginPageTutor />}
      />

      <Route
        path="/hero"
        element={state.loggedIn ? redirect("/dashboard") : <Hero />}
      />

      <Route
        path="/dashboard"
        element={state.loggedIn ? redirect("/dashboard") : <Dashboard />}
      />

      <Route
        path="/scholarship"
        element={state.loggedIn ? <Dashboard /> : <ScholarshipPortal />}
      />

      <Route path="/community-forum" element={<LandingPage />} />

      <Route path="/community-forum/add" element={<AddForum />} />

      <Route path="/community-forum/:id" element={<SingleForum />} />
      {/* <Route path="/internships" element={state.loggedIn ? <InternshipCard /> : <HomeGuest />} />
            <Route path="/applied-internships" element={state.loggedIn ? <AppliedInternships /> : <HomeGuest />} /> */}

      {/* PAssing addFlashMessage() funcytion to createPost using pprops */}
    </Routes>
  );
};

export default RoutesPage;

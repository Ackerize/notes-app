import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { HomeScreen } from "../screens/HomeScreen";
import { NoteScreen } from "../screens/NoteScreen";

export const DashboardRoutes = () => {
    return (
      <>
        <Navbar />
        <div className="container mt-2">
          <Switch>
            <Route exact path="/home" component={HomeScreen} />
            <Route exact path="/note" component={NoteScreen} />
            <Route exact path="/note/:idNote" component={NoteScreen} />
            <Redirect to="/home" />
          </Switch>
        </div>
      </>
    );
  };
  
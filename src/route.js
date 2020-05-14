import React from "react";
import { BrowserRouter as Router, Route,Switch} from "react-router-dom";
import Login from "./views/Login";
import Register from "./views/Register";

const AllRoute = () =>(

    <Switch>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/register" component={Register}/>
    </Switch>
);

export default AllRoute;
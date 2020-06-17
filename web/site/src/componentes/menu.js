// import bootstrap from 'bootstrap/*';
import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

class Menu extends Component{
    render(){
        return(
            <div className="dropdown">
                <Router>
                    <Link to="https://pt-br.reactjs.org/docs/getting-started.html" className="btn btn-secondary dropdown-toggle" role="button" id="dropdownMenuLink" dataToggle="dropdown" ariaHaspopup="true" ariaExpanded="false">
                        Dropdown link
                    </Link>
                </Router>
                <div className="dropdown-menu" ariaLabelledby="dropdownMenuLink">
                    {/* <a className="dropdown-item" href="#">Action</a>
                    <a className="dropdown-item" href="#">Another action</a>
                    <a className="dropdown-item" href="#">Something else here</a> */}
                </div>
            </div>  
        );
    }
}

export default Menu
import { BrowserRouter, Switch, Route } from "react-router-dom";
import React, { Component } from 'react';
import { Login } from "./componentes/login.js";
import CadastroLogin from "./componentes/cadastro-login.js";

export class RotaPaginas extends Component {

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" render={({ match: { url } }) => (
                        <>
                            <Route path={`${url}Login`} component={Login}/>
                            <Route path={`${url}CadastroLogin`} component={CadastroLogin} />
                        </>
                    )}
                    />
                </Switch>

            </BrowserRouter>
        )
    }
}

export default RotaPaginas;
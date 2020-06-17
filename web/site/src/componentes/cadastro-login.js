import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";

class CadastroLogin extends Component {
    render() {
        return (
            <div className="shadow-lg rounded align-items-center p-3 d-flex justify-content-center">
                <form name="frm-cadastro-login" id="frm-cadastro-login" method="post" action="login.html">
                    <div className="form-group ">
                        <h3 className="text-center">Cadastre-se</h3>
                    </div>

                    <div className="form-group row">
                        <label for="email" className="col-sm-3 ">Email </label>
                        <div className="col-sm-9">
                            <input type="email" id="txtemail" placeholder="E-mail" name="email" minlength="6" required />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label for="txtsenha1" className="col-sm-3">Senha</label>
                        <div className="col-sm-9">
                            <input type="password" placeholder="Senha" id="txtsenha1" name="txtsenha1" minlength="6" required />
                        </div>

                    </div>
                    <div className="form-group row">
                        <label for="txtsenha2" className="col-sm-3">Confirmar</label>
                        <div className="col-sm-8">
                            <input type="password" placeholder="Confirmar Senha" id="txtsenha2" name="txtsenha2" minlength="6" required />
                        </div>

                    </div>
                    <div className="from-group row">
                        <div className="col-sm-6">
                            <input className="btn btn-dark" name="btnsalvar" id="btnsalvar" type="submit" />
                        </div>
                        <label className="col-sm-5 ">
                            <Router>
                                <Link to="Login">Fazer login</Link>
                            </Router>
                        </label>
                    </div>
                </form>
            </div>
        );
    }
}

export default CadastroLogin;

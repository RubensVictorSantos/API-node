import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import PropTypes from "prop-types";
import $ from 'jquery';

const initialState = {
    usuario: {
        email: '',
        senha: '',
    },
}

export const TOKEN_KEY = "token";

export const TOKEN = localStorage.getItem('token');

export class Login extends Component {

    state = { ...initialState }

    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

    async enviaFormulario() {
        // const usuario = { ...this.state.usuario }

        const url = `localhost:3000/Login`;

        const email = this.state.usuario.email;

        const senha = this.state.usuario.senha;

        $.ajax({
            url: url,
            type: 'post',
            data: JSON.stringify({ "email": email, "senha": senha }),
            dataType: 'json',
            contentType: "application/json",
            success: function (resposta) {

                if (resposta.error) {

                    alert("Erro, usuario invalido");
                    console.log("Erro, usuario invalido");
                    // Notificacao(ERRO, USUARIO_INVALIDO);
                } else {

                    localStorage.setItem(TOKEN_KEY, resposta.token);

                    this.props.history.push("/cadastroLogin");

                }


            }.bind(this),
            error: function (data) {

                alert("Erro, Requisição");
                console.log("Erro, Requisição");
                // Notificacao(ERRO, ERRO_REQUISICAO);

            }
        });

    }



    render() {
        return (
            <div className="shadow-lg rounded align-items-center p-3 d-flex justify-content-center">
                <form name="frm-cadastro-login" id="frm-cadastro-login" method="post" action="login.html">
                    <div className="form-group ">
                        <h3 className="text-center">Login</h3>
                    </div>

                    <div className="form-group row">
                        <label for="email" className="col-sm-3 ">Email </label>
                        <div className="col-sm-9">
                            <input type="email" id="txtemail" placeholder="E-mail" name="email" minlength="6"  required />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label for="txtsenha1" className="col-sm-3">Senha</label>
                        <div className="col-sm-9">
                            <input type="password" placeholder="Senha" id="txtsenha1" name="txtsenha1" minlength="6" required />
                        </div>

                    </div>
                    <div className="form-group row pl-3">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="gridCheck1" />
                            <label className="form-check-label" for="gridCheck1">
                                Lembrar Senha
                        </label>
                        </div>
                    </div>
                    <div className="from-group row">
                        <div className="col-sm-5">
                            <button type="submit" className="btn btn-dark" name="btnsalvar" id="btnsalvar" onClick={e => this.enviaFormulario(e)} to="/Login">Entrar</button>
                        </div>
                        <label className="col-sm-6 ">
                            <Route>
                                <Link to="CadastroLogin">Fazer Cadastro</Link>
                            </Route>
                        </label>
                    </div>
                </form>
            </div>
        )
    }
}

export default Login;
import React from 'react';


import LoginForm from "../../forms/LoginForm"

class LoginPage extends React.Component {

    //aqui eu estou printando o submit que esta vindo do formulario do LoginForm com o email e senha informados pelo usuario
    submit = (data) => {
        console.log(data);
    }
    render(){
        return (
            <div>
                <h1>Login Page</h1>

                <LoginForm submit={this.submit}/>
            </div>
        );
    }
}

export default LoginPage;
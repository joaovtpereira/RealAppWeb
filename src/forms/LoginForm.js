import React from 'react';
import { Form, Button, FormField } from 'semantic-ui-react';
import Validator from 'validator';
import PropTypes from 'prop-types';

import InlineError from "../messages/InlineError"

class LoginForm extends React.Component {
    //aqui eu criei uma variavel de estado para guardar os dados, o loading e os erros do login
    state = {
        data : {
            email: '',
            password: ''
        },
        loading: false,
        erros:{}
    };

    //aqui eu estou pegando e setando os valores de estado a cada mudança deles
    onChange = e =>
        this.setState({
            data:{ ...this.state.data, [e.target.name]: e.target.value}
        });

    //aqui eu enviado para o LoginPage os dados do login do usuario, caso esses nao possuirem erros
    onSubmit = () => {
        const erros = this.validate(this.state.data);
        this.setState({erros});

        //aqui eu verifico se o vetor de erros está vazio, se este estiver vazio é porque não foi encontrado erros na validação
        if(Object.keys(erros).length === 0){
            this.props.submit(this.state.data);
        }
    }

    //aqui é onde estou validando os erros
    validate = (data) => {
        const erros = {};

        //caso a validação do email apresente erro, eu vou setar uma mensagem no vetor de erros email
        if(!Validator.isEmail(data.email)) erros.email = "Email inválido"
        //caso a validação da senha apresente erro, eu vou setar uma mensagem no vetor de erros de senha
        if(!data.password) erros.password = "Não pode ficar em branco"
        return erros;
    }

    render() {
        //aqui estou pegando os atributos data e erros do state para utilizao no render
        const {data, erros} = this.state
       
        
        return (
            //aqui estou chamando o onSubmit
            <Form onSubmit={this.onSubmit}>
                {/* Aqui estou deixando o componente de form todo vermellho caso tenha algum erro*/}
                <Form.Field error={!!erros.email}>  
                    <label htmlFor="email">Email</label>
                    <input
                     type="email" 
                     id="email" 
                     name="email" 
                     placeholder="exemplo@exemplo.com" 
                     value={data.email}
                     onChange={this.onChange}
                     />
                     {/* Aqui estou verificando se a erro, caso tenha ele vai chamar a mensagem inline error*/}
                     {erros.email && <InlineError text={erros.email} />}
                </Form.Field>

                <Form.Field error={!!erros.password}>
                    <label htmlFor="password">Password</label>
                    <input
                     type="password" 
                     id="password" 
                     name="password" 
                     placeholder="Para segurança" 
                     value={data.password}
                     onChange={this.onChange}
                     />
                     {erros.password && <InlineError text={erros.password} />}
                </Form.Field>

                <Button primary>Login</Button>
            </Form>
        );
    }
};

{/* Aqui estou configurando o submit que vou enviar para o LoginPages*/}
LoginForm.propTypes = {
    submit: PropTypes.func.isRequired
};

export default LoginForm;
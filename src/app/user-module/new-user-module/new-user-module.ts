import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-new-user-module',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-user-module.html',
  styleUrls: ['./new-user-module.css']
})
export class NewUserModule {
  loginForm: FormGroup;
  nomeErrorMessage: string;
  emailErrorMessage: string;
  passwordErrorMessage: string;
  loginSucessMessage: string = 'Login realizado com sucesso!';
  errorLogin: string;
  Login: string;
   

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      nome: ["", [Validators.required, Validators.minLength(3)]],
      email: ["", [Validators.required, Validators.minLength(9)]],
      password: ["", [Validators.required, Validators.minLength(4)]],
      password2: ["", [Validators.required, Validators.minLength(4)]]
      

    });

    this.nomeErrorMessage = "";
    this.emailErrorMessage = "";
    this.passwordErrorMessage = "";
    this.loginSucessMessage = "";
    this.errorLogin = "";
    this.Login = ""
  }

  async onEnterClick() {
    // Limpa mensagens anteriores
    this.nomeErrorMessage = "";
    this.emailErrorMessage = "";
    this.passwordErrorMessage = "";
    this.loginSucessMessage = "";
    this.errorLogin = "";

    // Pega os dados do formulário
    const nome = this.loginForm.value.nome;
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    const password2 = this.loginForm.value.password2;

    // Validações simples
    if (nome === "") {
      this.nomeErrorMessage = "O campo de nome é obrigatório";
      return;
    }

    if (email === "") {
      this.emailErrorMessage = "O campo de e-mail é obrigatório";
      return;
    }

    if (password === "") {
      this.passwordErrorMessage = "O campo de senha é obrigatório";
      return;
    }

    if (password2 === "") {
      this.passwordErrorMessage = "Confirme a senha";
      return;
    }

    if (password !== password2) {
      this.passwordErrorMessage = "As senhas não coincidem";
      return;
    }

    if (nome.lenght <3 ) {
      this.nomeErrorMessage = "o nome deve conter no minimo 3 caracteres!";
    }

    
    if (password.lenght <4 ) {
      this.passwordErrorMessage = "A senha deve conter no minimo 4 caracteres!";
    }

    if (email.lenght <9 ) {
      this.emailErrorMessage = "o email deve conter no minimo 9 caracteres!";

    }

    if(!email.includes("@") || !email.includes(".")) {
      this.emailErrorMessage = "o email deve conter . e @ !";
    }



    // Envia os dados para a API
    let response = await fetch("https://senai-gpt-api.azurewebsites.net/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nome: nome,
        email: email,
        password: password
      })
    });

    console.log("Status code: " + response.status);

    if (response.status >= 200 && response.status <= 299) {
      this.Login = "Usuário criado com sucesso!";
      this.errorLogin = "";
      let json = await response.json();
      console.log("Resposta da API:", json);
      window.location.href = "login";
    } else {
      this.errorLogin = "Erro ao criar usuário. Tente novamente.";
      this.loginSucessMessage = 'Login realizado com sucesso!';
    }
  }
}

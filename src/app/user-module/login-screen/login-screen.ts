import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-screen',
  imports: [ReactiveFormsModule],
  templateUrl: './login-screen.html',
  styleUrl: './login-screen.css'
})
export class LoginScreen {

  LoginForm: FormGroup;

  emailErrorMessage: string;
  passwordErrorMessage: string;
  loginErrorMessage: string;
  loginSucessMessage: string;

  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef) {
    //quando a tela iniciar 

    //inicia o formulario
    //cria o campo obrigatorio de e-mail
    //cria o campo obrigatorio de senha
    this.LoginForm = this.fb.group({
      email: ["", [ Validators.required]],
      password: ["", [ Validators.required]],

    });

    this.emailErrorMessage = "";
    this.passwordErrorMessage = "";
    this.loginErrorMessage = "";
    this.loginSucessMessage = "";
  }

   async onLoginclick() {

    console.log("Email", this.LoginForm.value.email);
    console.log("Password", this.LoginForm.value.password);
    
    if (this.LoginForm.value.email == "") {
      this.emailErrorMessage = "O campo de e-mail e obrigatorio.";
      this.passwordErrorMessage = "";
      return;

  }

  if (this.LoginForm.value.password == "") {
    this.passwordErrorMessage = "O campo de senha e obrigatorio.";
    this.emailErrorMessage = "";
    
    return;
  }
  
  let response = await fetch("https://senai-gpt-api.azurewebsites.net/login", {
    method: "POST", // Enviar
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      email: this.LoginForm.value.email,
      password: this.LoginForm.value.password
    })
  });
  console.log("STATUS CODE", response.status);
  
  if (response.status >= 200 && response.status <= 299) {
    this.loginSucessMessage = "Login realizado com sucesso!";
    this.loginErrorMessage = "";
    this.emailErrorMessage = "";
    this.passwordErrorMessage = "";

    let json = await response.json();

    console.log("Json", json)

    let meuToken = json.accessToken;
    let userid = json.user.id;

    localStorage.setItem ("meuToken", meuToken)
    localStorage.setItem ("meuId", userid)
    window.location.href= "chat";

  }else {
    this.loginErrorMessage = "Seu Login deu errado!";
    this.loginSucessMessage= "";
    this.emailErrorMessage = "";
    this.passwordErrorMessage = "";
  }

  let email2 = this.LoginForm.value.email;
  let password2 = this.LoginForm.value.password;
  this.cd.detectChanges();
}
  }

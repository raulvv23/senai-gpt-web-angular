import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-screen',
  imports: [ReactiveFormsModule],
  templateUrl: './login-screen.html',
  styleUrl: './login-screen.css'
})
export class LoginScreen {

  LoginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    //quando a tela iniciar 

    //inicia o formulario
    //cria o campo obrigatorio de e-mail
    //cria o campo obrigatorio de senha
    this.LoginForm = this.fb.group({
      email: ["", [ Validators.required]],
      password: ["", [ Validators.required]],

    });

  }

  onLoginclick() {
    alert("Botao de login clicado");

    console.log("Email", this.LoginForm.value.email);
    console.log("Password", this.LoginForm.value.password);


  }

}


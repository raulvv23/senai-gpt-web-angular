import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

interface Ichat {
  
  chatTitle: string;
  id: number;
  userId: string;
}

interface IMessage {

  chatId: Number;
  id: Number;
  text: string;
  userId: string;

}

@Component({
  selector: 'app-chat-screen',
  imports: [ CommonModule, ReactiveFormsModule],
  templateUrl:'./chat-screen.html',
  styleUrl: './chat-screen.css'
})
export class ChatScreen {

  chats : Ichat [];
  chatSelecionado: Ichat;
  mensagens: IMessage[];
  mensagemUsuario = new FormControl("");

  constructor (private http: HttpClient, private cd: ChangeDetectorRef) {

    this.chats = [];
    this.chatSelecionado = null!;
    this.mensagens = [];

  }
    
  ngOnInit() {

    this.getChats();

  }  

  async getChats () {
  

    let response = await firstValueFrom(this.http.get("https://senai-gpt-api.azurewebsites.net/chats"
      , {
      headers: {
        "Authorization" : "Bearer " + localStorage.getItem("meuToken")
      }
    }));

    if(response) {
      this.chats = response as [];
      console.log ("Chats", response);

    } else {

      console.log ("Chats", response);

      
    }

    this.cd.detectChanges();

    }

     async onChatClick (chatClicado: Ichat) {

      console.log("chat Clicado", chatClicado);

      this.chatSelecionado = chatClicado;

      //logica para buscar as mensagens
      let response = await firstValueFrom(this.http.get("https://senai-gpt-api.azurewebsites.net/messages?chatId="+ chatClicado.id,
        {
        headers: {
          "Authorization" : "Bearer " + localStorage.getItem("meuToken")
        }
      }));

      console.log("Mensagens", response); 

      this.mensagens = response as IMessage[];

      this.cd.detectChanges();

    }

    async enviarMensagem () {

      let novaMensagemusuario = {

        chatId: this.chatSelecionado.id,
        userId: localStorage.getItem("meuId"),
        text: this.mensagemUsuario.value

      };

    }

    
  }

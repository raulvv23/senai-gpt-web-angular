import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';

interface Ichat {
  
  chatTitle: string;
  id: number;
  userId: string;
}

@Component({
  selector: 'app-chat-screen',
  imports: [HttpClientModule, CommonModule],
  templateUrl: './chat-screen.html',
  styleUrl: './chat-screen.css'
})
export class ChatScreen {

  chats : Ichat [];

  constructor (private http: HttpClient) {

    this.chats = [];

  }
    
  ngOnInit() {

    this.getChats();

  }  

  async getChats () {

    let response = await this.http.get("https://senai-gpt-api.azurewebsites.net/chats"
      , {
      headers: {
        "Authorization" : "Bearer " + localStorage.getItem("meuToken")
      }
    }).toPromise();

    if(response) {
      this.chats = response as [];

    } else {

      console.log ("Chats", response);

      
    }

    }

    
  }

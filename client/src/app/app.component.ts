import { Component, OnInit } from '@angular/core';
import io from 'socket.io-client';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,  
  imports: [CommonModule]  
})
export class AppComponent implements OnInit {
  messages: string[] = [];
  message: string = '';
  username: string = 'User1'; 
  private socket: any;  

  constructor() { }

  ngOnInit(): void {
    this.connectToSocket();
  }

  connectToSocket(): void {
    this.socket = io('http://localhost:3000');

    this.socket.on('message', (msg: string) => {
      this.messages.push(msg);
      console.log('Received message:', msg);
    });

    this.socket.emit('joinChannel', { username: this.username, channel: 'General' });
  }

  updateMessage(event: Event): void {
    this.message = (event.target as HTMLInputElement).value;
  }

  sendMessage(): void {
    if (this.message.trim()) {
      
      this.socket.emit('message', { channel: 'General', message: `${this.username}: ${this.message}` });
      this.message = ''; 
    }
  }
}

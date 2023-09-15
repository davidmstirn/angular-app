import { Component } from '@angular/core';

@Component({
  selector: 'app-server-list',
  templateUrl: './server-list.component.html',
  styleUrls: ['./server-list.component.css'],
})
export class ServerListComponent {
  allowNewServer = false;
  serverCreationStatus = 'No server was created!';
  serverCreated = false;
  serverName = '';
  username = '';
  servers = ['Test Server 1', 'Test Server 2'];
  displayDetails = false;
  buttonLog = [];

  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);
  }

  onCreateServer() {
    this.serverCreated = true;
    this.servers.push(this.serverName);
    this.serverCreationStatus = 'Server ' + this.serverName + ' was created!';
  }

  // Not needed with 2-way data binding
  onUpdateServerName(event: Event) {
    this.serverName = (<HTMLInputElement>event.target).value;
  }

  onResetUsername() {
    this.username = '';
  }

  onDisplayDetails() {
    const now = new Date();
    this.buttonLog.push("Clicked on " + now.toISOString());
    this.displayDetails = !this.displayDetails;
  }
}

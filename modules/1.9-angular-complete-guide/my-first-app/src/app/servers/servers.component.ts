import { Component } from '@angular/core';

@Component({
  // selector: '.app-servers',
  // selector: '[app-servers]',
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent {
  allowedNewServer = true;
  serverCreationStatus = 'No server was created';
  serverName = 'Testing server';
  serverCreated = false;
  servers = ['Test1', 'Test2'];
  constructor() {
    setTimeout(() => {
      this.allowedNewServer = false
    }, 2000);
  }

  onCreateServer() {
    this.serverCreated=true;
    this.serverCreationStatus = 'Server was created';
    this.servers.push(this.serverName);
  }

  onUpdateServerName (event: Event){
    this.serverName = (<HTMLInputElement>event.target).value;
  }
}

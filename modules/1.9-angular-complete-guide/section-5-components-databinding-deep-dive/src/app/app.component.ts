import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
// App Main Component
export class AppComponent {
  serverElements = [{ type: 'server', name: 'TestServer', content: 'Just a test!' }];

  addServerHandler(server: { serverName: string, serverContent: string }) {
    this.serverElements.push({
      type: 'server',
      name: server.serverName,
      content: server.serverContent
    });
  }

  addBluePrintHandler(bluePrint: { serverName: string, serverContent: string }) {
    this.serverElements.push({
      type: 'blueprint',
      name: bluePrint.serverName,
      content: bluePrint.serverContent
    });
  }
  onChangeFirst(){
    this.serverElements[0].name = 'Changed';
  }
  onDestroyFirst(){
    this.serverElements.splice(0,1);
  }
}

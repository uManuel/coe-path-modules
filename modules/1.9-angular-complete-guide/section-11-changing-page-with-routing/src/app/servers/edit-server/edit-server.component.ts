import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CanComponentDeactivate } from './can-deactivate-guard.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: { id: number, name: string, status: string };
  serverName = '';
  serverStatus = '';
  allowedEdit = false;
  changesSaved = false;

  constructor(private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router) { }
  canDeactivate(): boolean | Promise<boolean> | Observable<boolean> {
    if(!this.allowedEdit){
      return true;
    }
    if((this.server.name!==this.serverName||this.serverStatus!==this.serverStatus) && !this.changesSaved){
      return confirm('Do you want to confirm the changes?!')
    }else{
      return true;
    }
  };

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];

    this.route.queryParams.subscribe((queryParams) => {
      this.allowedEdit = queryParams['allowEdit'] === '1' ? true : false;
    })
    this.server = this.serversService.getServer(id);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, { name: this.serverName, status: this.serverStatus });
    this.changesSaved = true;
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}

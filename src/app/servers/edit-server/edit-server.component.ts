import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
  server: {id: number, name: string, status: string} = {
    id: 0,
    name: '',
    status: ''
  };
  serverName = '';
  serverStatus = '';
  editable: boolean = false;

  constructor(private serversService: ServersService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // console.log(this.activatedRoute.snapshot.queryParamMap);
    // console.log(this.activatedRoute.snapshot.fragment);
    
    this.activatedRoute.queryParamMap.subscribe((params: ParamMap) => {
      const editable = Boolean(params.get('allowEdit'));
      this.editable = editable;
    });
    this.activatedRoute.fragment.subscribe();

    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      const serverId = Number(params.get('serverId'));
      this.server = this.serversService.getServer(serverId);
      this.serverName = this.server.name;
      this.serverStatus = this.server.status;
    })
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
  }

}

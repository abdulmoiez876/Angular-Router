import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: {id: number, name: string} = {
    id: 0,
    name: ''
  };

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // this.user = {
    //   id: this.activatedRoute.snapshot.paramMap['userId'],
    //   name: this.activatedRoute.snapshot.paramMap['username'],
    // }

    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.user.id = Number(params.get('userId'));
      this.user.name = String(params.get('username'));
    })
  }

}

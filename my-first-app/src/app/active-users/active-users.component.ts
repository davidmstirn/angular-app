import {Component, OnInit} from '@angular/core';
import {UsersService} from "../services/users.service";
import {CounterService} from "../services/counter.service";

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.css']
})
export class ActiveUsersComponent implements OnInit {
  users: string[];
  updateCount: number;

  constructor(private usersService: UsersService,
              private counterService: CounterService) {
  }

  ngOnInit() {
    this.users = this.usersService.activeUsers;
    this.updateCount = this.counterService.activationCount;
    this.counterService.activationChange.subscribe((value)=>this.updateCount = value);
  }

  onSetToInactive(id: number) {
    this.usersService.setToInactive(id);
  }
}

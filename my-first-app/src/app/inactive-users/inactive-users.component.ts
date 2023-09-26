import {Component, OnInit} from '@angular/core';
import {UsersService} from "../services/users.service";
import {CounterService} from "../services/counter.service";

@Component({
  selector: 'app-inactive-users',
  templateUrl: './inactive-users.component.html',
  styleUrls: ['./inactive-users.component.css']
})
export class InactiveUsersComponent implements OnInit {
  users: string[];
  updateCount: number;

  constructor(private usersService: UsersService,
              private counterService: CounterService) {
  }

  ngOnInit() {
    this.users = this.usersService.inactiveUsers;
    this.updateCount = this.counterService.deactivationCount;
    this.counterService.deactivationChange.subscribe((value)=>this.updateCount = value);
  }

  onSetToActive(id: number) {
    this.usersService.setToActive(id);
  }
}

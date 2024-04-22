import {Component, OnDestroy, OnInit} from "@angular/core";
import {DataStorageService} from "../../services/data-storage.service";
import {AuthService} from "../../services/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthenticated = false;
  private user$: Subscription;

  constructor(private dataStorageService: DataStorageService, private authService: AuthService) {
  }

  ngOnInit() {
    this.user$ = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy() {
    this.user$.unsubscribe();
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserAuthSerivce } from '../user-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  private userSub: Subscription;

  constructor(private userAuthService: UserAuthSerivce) { }

  ngOnInit(): void {
    this.userSub = this.userAuthService.user.subscribe(
      user => {
        this.isLoggedIn = !user ? false : true;
      }
    );
  }

  onLogOut() {
    this.userAuthService.logout();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}

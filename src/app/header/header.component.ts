import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserAuthSerivce } from '../user-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
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

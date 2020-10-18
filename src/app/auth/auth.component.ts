import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAuthSerivce } from '../user-auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  success: string = null;
  error: string = null;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private userAuthService: UserAuthSerivce) { }

  ngOnInit(): void {

  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    this.userAuthService.login(email, password).subscribe(
      resData => { 
        console.log(resData);
        // this.success = "You've logged in successfully!"
        this.router.navigate(['/articles']);
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        
      }
    );
    
    form.reset();
  }

  onCancel() {
    this.router.navigate(['/login']);
  }

}

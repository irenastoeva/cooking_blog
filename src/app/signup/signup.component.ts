import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAuthSerivce } from '../user-auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
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

    this.userAuthService.singup(email, password).subscribe(
      resData => {
        console.log(resData);
        this.success = 'You\'ve signed up successfully!';
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
      }
    );
    form.reset();
  }

  onCancel() {
    this.router.navigate(['/signup'], { relativeTo: this.route });
  }
}

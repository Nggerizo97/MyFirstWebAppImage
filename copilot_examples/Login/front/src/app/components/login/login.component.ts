import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    username: string = "";
    password: string = "";
    loading: boolean = false;

  constructor(private toastr: ToastrService,
    private route:ActivatedRoute,
    private router:Router,
    private _userService: UserService,
    private _errorService: ErrorService
  ) { 
    // Constructor logic here

  }
  
  login() {
    // Perform login logic here
    if(this.username == "" || this.password == ""){
      this.toastr.error("All empty fields. All fields are obligatory", "Error")
      return;

    }

    const user: User ={
      username: this.username,
      password: this.password
    }

    this._userService.login(user).subscribe({
      next: (token) => {
        console.log(token);
        localStorage.setItem('token', token);
        this.loading = false;
        console.log("User login successfully");
        this.toastr.success("User login successfully", "Success")
        this.router.navigate(['/dashboard'])},
      error: (events:HttpErrorResponse) => {
        this.loading = false
        this._errorService.msjError(events)
    }
    })

  }

  msjError(events:HttpErrorResponse){
    if(events.error.msg){
      this.toastr.error(events.error.msg, "Error")
    } else {
      this.toastr.error("Error has occurred", "Error")
    }
  }

  ngOnInit(): void {
    // Perform initialization logic here

  }

}

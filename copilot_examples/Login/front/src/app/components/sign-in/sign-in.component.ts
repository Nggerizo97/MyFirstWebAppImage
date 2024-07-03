import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit{

  username: string = "";
  password: string = "";
  confirmPassword: string = "";
  loading: boolean = false;

  constructor(private toastr: ToastrService, 
    private _userService: UserService,
    private route:ActivatedRoute,
    private router:Router) {
    
  }
  
  ngOnInit(): void {
    
  }

addUser() {
  // validamos que el usuario ingrese valores 
  if(this.username == "" || this.password == "" || this.confirmPassword == ""){
    this.toastr.error("All empty fields. All fields are obligatory", "Error")
    return;
  }

  // validate passowrd are equal
  if  (this.password != this.confirmPassword){
    this.toastr.error("Passoerd is not the same", "Error")
    return;
  }

  // creamos el objeto
  const user: User = {
    username: this.username,
    password: this.password
  }

  this.loading = true;
  this._userService.singIn(user).subscribe({
    next: (v) => {
      this.loading = false;
      console.log("User create successfully");
      this.toastr.success("User added successfully", "Success")
      this.router.navigate(['/login'])},
    error: (events:HttpErrorResponse) => {
      this.loading = false
    if(events.error.msg){
      this.toastr.error(events.error.msg, "Error")
    } else {
      this.toastr.error("Oops an error has occurred", "Error")
    }
    console.log(events)
    },
    complete: () => console.info('complete')
  })
}


}

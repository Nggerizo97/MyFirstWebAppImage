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

  this._userService.singIn(user).subscribe(data =>{
    console.log("User create successfully");
    this.toastr.success("User added successfully", "Success")
    this.router.navigate(['/login'])
  })

}


}

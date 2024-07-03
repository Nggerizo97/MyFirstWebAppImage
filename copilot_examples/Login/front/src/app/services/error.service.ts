import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private toastr: ToastrService) { }

  msjError(events:HttpErrorResponse){
    if(events.error.msg){
      this.toastr.error(events.error.msg, "Error")
    } else {
      this.toastr.error("Error has occurred", "Error")
    }
  }
}


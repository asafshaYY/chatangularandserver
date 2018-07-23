import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder,public router: Router, private data:DataService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      nickname : ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9.]{3,}?$/)])],
      choosecolor: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z.]{6}?$/)])]
      }
    );
  }

  Save(){
    if (this.form.valid) {
      //send data to service so i can know who connected
      this.data.ChangeMessage(
        {
          "nickname":this.form.controls.nickname.value,
          "color":this.form.controls.choosecolor.value,
          "userId" : this.GenerateNewId().toString()
        });
      this.router.navigate(['lobby']);
    } else {
      this.ValidateAllFormFields(this.form); 
    }
  }

  GenerateNewId(){
    return new Date().valueOf();
  }

  ValidateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.ValidateAllFormFields(control);
      }
    });
  }

  IsFieldValid(field: string) {
    return !this.form.get(field).valid && this.form.get(field).touched;
  }
}

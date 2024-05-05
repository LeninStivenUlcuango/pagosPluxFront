import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginI } from 'src/app/Models/Users';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit{
  
  private _formAuth=this.formBuilder.group({
    email:['',Validators.required],
    password:['',Validators.required],
  })

  get formAuth(){return this._formAuth};
  get formContr(){return this.formAuth.controls};

  constructor(private formBuilder:FormBuilder,private authService:AuthService,private router: Router){
  }

  ngOnInit(): void {
    const isAutenticate=this.authService.isAutenticate();
    if(isAutenticate){
      this.router.navigate(['pagoPlux/button'])
    }
  }

  login(){
    if(this.formAuth.valid){
      this.authService.login(this.formAuth.value as LoginI).subscribe({
        next:(data)=>{
          this.authService.SetToken(data.data!);
        },
        error:(error)=>{
          console.log(error)
        },
        complete:()=>{
          this.router.navigate(['pagoPlux/button'])
        }
      })
    }
  }
}

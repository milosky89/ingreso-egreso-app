import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router:Router) { }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      correo:['',[Validators.required, Validators.email]],
      password:['',Validators.required],
    })
  }

  login(){
    if(this.loginForm.invalid){return;}

    Swal.fire({
      title: 'Espere por favor',
      timer: 2000,
      onBeforeOpen: () => {
        Swal.showLoading()
      },

    });

    const {correo, password}= this.loginForm.value;
    this.authService.loginUsuario(correo,password)
       .then(credenciales =>{
         console.log(credenciales);
        Swal.close();
         this.router.navigate(['/']);
       })
       .catch(err =>
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Usuario y/o contraseña incorrectos',
          showConfirmButton: false,
          timer: 1900
        })
        );

  }

}

import Swal from 'sweetalert2';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registroForm: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router:Router) { }

  ngOnInit(): void {

    this.registroForm = this.fb.group({
        nombre:['',Validators.required],
        correo:['',[Validators.required, Validators.email]],
        password:['',Validators.required],
    });

  }

  crearUsuario(){

    if(this.registroForm.invalid){return;}

    Swal.fire({
      title: 'Espere por favor',
      timer: 2000,
      onBeforeOpen: () => {
        Swal.showLoading()
      },
    });

   const {nombre, correo, password}= this.registroForm.value;
   this.authService.crearUsuario(nombre,correo,password)
       .then(credenciales =>{
         console.log(credenciales);
         Swal.close();
         this.router.navigate(['/']);
       })
       .catch(err =>
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Oops...',
          text: err.message,
          showConfirmButton: false,
          timer: 1900
          })
        );



  }

}

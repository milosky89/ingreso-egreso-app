import { Usuario } from './../models/usuario.model';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {map} from 'rxjs/operators'
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth,
              private firestore: AngularFirestore) { }

  initAuthListener(){
    this.auth.authState.subscribe(fuser =>{
      console.log(fuser);
      console.log(fuser?.uid);
      console.log(fuser?.email);
    })
  }

  crearUsuario(nombre:string,email:string,password:string){

    return this.auth.createUserWithEmailAndPassword(email,password)
      .then(({user}) =>{

        const newUser = new Usuario(user.uid,user.email,nombre);
        return this.firestore.doc(`${user.uid}/usuario`)
            .set( {...newUser});

      });

  }

  loginUsuario(email:string,password:string){
    return this.auth.signInWithEmailAndPassword(email,password);
  }

  logout(){
    return this.auth.signOut();
  }

  isAuth(){
    return this.auth.authState
          .pipe(map(fbUser => fbUser != null )
          );
  }
}
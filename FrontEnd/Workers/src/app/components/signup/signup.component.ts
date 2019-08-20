import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, EmailValidator} from '@angular/forms';
import { UserValidators } from 'src/app/common/validators/user.validators';
import { AngularFirestore } from '@angular/fire/firestore';
import { SignupService } from 'src/app/services/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      UserValidators.cannotContainSpace,
      UserValidators.dotCom
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      UserValidators.cannotContainSpace
    ])
  });
  users: any;

  constructor(private db: AngularFirestore, private service: SignupService) {
  }

ngOnInit() {
  this.db.collection('users').snapshotChanges()
    .subscribe(data => {
      this.users = data.map(e => {
        return {
          id: e.payload.doc.id,
          email: e.payload.doc.data()['email'],
          password: e.payload.doc.data()['password'],
        };
      });
    });
}

login() {
    const user = {};
    user['email'] = this.email.value;
    user['password'] = this.password.value;
    this.service.create(user)
    .subscribe(res => // correct response from the server.
      this.users.push(user));
  }


  // Getters & Setters
  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

}

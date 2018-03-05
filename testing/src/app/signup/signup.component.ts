import { Component, OnInit } from '@angular/core';
import {AuthService} from '../shared/auth/auth.service';
import {ReactiveFormsModule,FormGroup,FormBuilder,Validators} from '@angular/forms'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm:FormGroup;
  formErrors =
  {
    'email':'',
    'password':'',
    'username':''
  };
  validationMessages =
  {
    'email':{
      'required': 'Email is required',
      'email':'Email must be valid email'
    },
    'password':{
      'required': 'Password is required',
      'minlength': 'Password must at least 5 characters long'
    },
    'username':{
      'required': 'Username is required',
      'minlength': 'Username must at least 4 characters long'
    }
  }
  constructor(private formBuilder:FormBuilder,private authService:AuthService){
   }
   ngOnInit() {
     this.buildForm();
   }



  signup()
  {
  this.authService.emailSignUp(this.signupForm.value['email'],this.signupForm.value['password'],this.signupForm.value['userName']);
  //console.log("this is signup");
  }

  buildForm()
  {
    this.signupForm = this.formBuilder.group({
     'userName':['',[
       Validators.required,
       Validators.minLength(4)
     ]
   ],
   'email':['',[
      Validators.required,
      Validators.email
   ]
 ],
 'password':['',[
      Validators.minLength(5)
  ]
 ]
    });
    this.signupForm.valueChanges.subscribe(data => this.onValueChanged(data));
      this.onValueChanged(); // reset validation messages
  }


  onValueChanged(data?: any) {
  if (!this.signupForm) { return; }
  const form = this.signupForm;
  for (const field in this.formErrors) {
    if (Object.prototype.hasOwnProperty.call(this.formErrors, field)) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          if (Object.prototype.hasOwnProperty.call(control.errors, key)) {
            this.formErrors[field] += messages[key] + ' ';
          }
        }
      }
    }
  }
}




}

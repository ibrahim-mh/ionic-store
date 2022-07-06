import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { UserService } from 'src/services/user.service';
import { UtilService } from 'src/services/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginform:FormGroup;
  loginObj={username:'',password:''};
  loading:boolean;
  constructor(
    private fb: FormBuilder,
    private util: UtilService,
    private navCtrl: NavController, 
    private userService:UserService,
  ) { }

  ngOnInit() {
    this.loginform = this.fb.group({
      username: new FormControl(this.loginObj.username, [
        Validators.required,
        Validators.minLength(4)
      ]),
      password: new FormControl(this.loginObj.password,Validators.required),
    });
  }

  login(data) {
    this.loading=true;
    this.userService.login(this.loginObj.username,this.loginObj.password).toPromise().then(sucessed=>{
      this.loading=false;
      if(sucessed){  
        this.util.setMenuState(true);
        this.navCtrl.navigateRoot('/home', { animationDirection: 'forward' });
      }
    }).catch((e)=>{
      console.log(e);
      this.loading=false;
    });
  }

}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from '@angular/fire';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { LearningModule } from './learning/learning.module';
import { SharedModule } from './shared/shared.module';
import {AuthInterceptor} from './interceptors/auth-interceptor.service';
import { SpinnerComponent } from './spinner/spinner.component';
import { SigninComponent } from './signin/signin.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import { AvataarComponent } from './avatar/avatar.component';
import { HomeComponent } from './home/home.component';
import { AngularTypewriterEffectModule } from 'angular-typewriter-effect';
import { NgParticlesModule } from 'ng-particles';
import { MaterialComponentsModule } from './material-components.module';
import {MatExpansionModule} from '@angular/material/expansion';
import { ProfileComponent } from './profile/profile.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { AbotComponent } from './abot/abot.component';


@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    SigninComponent,
    AvataarComponent,
    HomeComponent,
    ProfileComponent,
    NavbarComponent,
    FooterComponent,
    AbotComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    AngularFireAuthModule,
    MatInputModule,
    MatButtonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    MatSnackBarModule,
    MatExpansionModule,
    HttpClientModule,
    LearningModule,
    SharedModule,
    FlexLayoutModule,
    MaterialComponentsModule,
    AngularTypewriterEffectModule,
    NgParticlesModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

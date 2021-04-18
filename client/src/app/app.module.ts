import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from '@angular/fire';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { LearningModule } from './learning/learning.module';
import { SharedModule } from './shared/shared.module';
import { SpinnerComponent } from './spinner/spinner.component';
import { SigninComponent } from './signin/signin.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AvataarComponent } from './avatar/avatar.component';
import { HomeComponent } from './home/home.component';
import { AngularTypewriterEffectModule } from 'angular-typewriter-effect';
import { NgParticlesModule } from 'ng-particles';
import { MaterialComponentsModule } from './material-components.module';


@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    SigninComponent,
    AvataarComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    MatSnackBarModule,
    HttpClientModule,
    LearningModule,
    SharedModule,
    FlexLayoutModule,
    MaterialComponentsModule,
    AngularTypewriterEffectModule,
    NgParticlesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

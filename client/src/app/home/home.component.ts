import { Component, ElementRef, HostListener } from '@angular/core';
import { IParticlesProps } from 'ng-particles';
import { Observable } from 'rxjs';
import type { Container, Main } from 'tsparticles';
import { AvatarType } from '../avatar/avatartype';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  container!: Container;
  currentavatar$: Observable<AvatarType>;
  list = ['Your Way', 'Without Comparisons', 'Personalized'];
  id = "tsparticles";
  particlesOptions: IParticlesProps = {
    background: {
      color: {
        value: "#333333"
      }
    },
    fpsLimit: 60,
    interactivity: {
      detectsOn: "canvas",
      events: {
        onClick: {
          enable: false,
          mode: "push"
        },
        onHover: {
          enable: false,
          mode: "repulse"
        },
        resize: true
      },
      modes: {
        bubble: {
          distance: 400,
          duration: 2,
          opacity: 0.8,
          size: 40
        },
        push: {
          quantity: 4
        },
        repulse: {
          distance: 200,
          duration: 0.4
        }
      }
    },
    particles: {
      color: {
        value: "#ffffff"
      },
      links: {
        color: "#ffffff",
        distance: 150,
        enable: true,
        opacity: 0.5,
        width: 1
      },
      collisions: {
        enable: true
      },
      move: {
        direction: "none",
        enable: true,
        outMode: "bounce",
        random: true,
        speed: 1,
        straight: false
      },
      number: {
        density: {
          enable: true,
          value_area: 800
        },
        value: 80
      },
      opacity: {
        value: 0.5
      },
      shape: {
        type: "circle"
      },
      size: {
        random: true,
        value: 5
      }
    },
    detectRetina: true
  };

  avatars$!: Observable<Array<AvatarType>>;

  particlesLoaded(container: Container): void {
    console.log(container);
    this.container = container;

  }

  particlesInit(main: Main): void {
    console.log(main);

    // Starting from 1.19.0 you can add custom presets or shape here, using the current tsParticles instance (main)
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    console.log(event.target.innerWidth, event.target.innerHeight);
    (this.container.canvas.element as HTMLCanvasElement).style.width = "99%";
    (this.container.canvas.element as HTMLCanvasElement).height = event.target.innerHeight;
    (this.container.canvas.element as HTMLCanvasElement).width = event.target.innerWidth;
  }

  resize() {
    console.log(this.container.canvas.size);
  }

  constructor(private dataService: DataService) { 
    this.avatars$ = this.dataService.getAvatars();
    this.currentavatar$ = this.dataService.avatar.asObservable();
  }

  selectAvatar(avatar: AvatarType) {
    this.dataService.setAvatar(avatar);
  }


}

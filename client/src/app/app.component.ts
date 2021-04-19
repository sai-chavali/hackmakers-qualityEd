import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AvatarType } from './avatar/avatartype';
import { DataService } from './services/data.service';
import { loadbot, clickcatcher } from '../assets/js/botloader';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnDestroy {
  boticon: HTMLDivElement;
  botux: HTMLDivElement;
  currentavatar: AvatarType;
  avatarsub: Subscription;
  opened = false;
  @ViewChild("avatar", { static: false }) avatarRef !: ElementRef;

  constructor(private dataService: DataService, private readonly router: Router) {
    this.avatarsub = this.dataService.avatar.asObservable().subscribe(r => {
      this.currentavatar = r;
      if (!!r)
        this.loadScript(
          "smatbot-chatbot",
          "https://smatbot.s3.amazonaws.com/files/smatbot_plugin.js.gz", () => {
            this.loadScript(
              "fprint", "https://cdnjs.cloudflare.com/ajax/libs/fingerprintjs2/1.5.1/fingerprint2.min.js", () => {
                loadbot();
                setTimeout(() => {
                  this.process();
                }, 3000);
              }, true)
          }, true)
    })
  }
  ngOnDestroy(): void {
    if (this.avatarsub) this.avatarsub.unsubscribe();
  }

  private loadScript(id: string, src: string, onload: any, async = true): void {
    // get document if platform is only browser
    if (document && !document.getElementById(id)) {
      let s = document.createElement('script');
      s.async = async;
      s.type = 'text/javascript';
      s.id = id;
      s.src = src;
      s.onload = onload;
      document.head.appendChild(s);
    }
  }

  // @HostListener('click', ["$event"])
  // onClick(event: MouseEvent) {
  //   console.log(event.target)
  //   if(event.target instanceof HTMLAnchorElement) {
  //     event.preventDefault();
  //     //if(event.target.hostname == environment.domain) this.router.navigateByUrl(event.target.pathname);
  //     //else this.router.navigateByUrl(event.target.href);
  //     console.log(event.target)
  //     return false;
  //   }

  // }

  process() {
    this.boticon = document.getElementById("pulse") as HTMLDivElement;
    this.botux = document.getElementById("opened") as HTMLDivElement;
    let closed = document.getElementById("closed") as HTMLDivElement;
    //(this.boticon.querySelector("#main_icon_smatest") as HTMLImageElement).style.opacity = "0";
    (this.boticon.querySelector("#main_icon_smatest") as HTMLImageElement).click();
    //document.getElementById("opened")
    //closed.style.background = "transparent";
    //closed.style.border = "none";
    //console.log("display", this.botux.style.display);
    //this.opened = this.botux?.style.display != 'none';
    //let e = this.avatarRef.nativeElement as HTMLDivElement;
    //console.log(e);
  }


  ngAfterViewInit(): void {
    clickcatcher((event) => {
      if (event.target instanceof HTMLAnchorElement) {
        event.preventDefault();
        if(event.target.hostname == environment.domain) this.router.navigateByUrl(event.target.pathname);
        else this.router.navigateByUrl(event.target.href);
        return false;
      }
    })
  }
}

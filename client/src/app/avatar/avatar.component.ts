import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild } from '@angular/core';
import * as React from 'react';

import * as ReactDOM from 'react-dom';
import AvatarComponent, { Props } from "avataaars";
import { AvatarType } from './avatartype';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvataarComponent implements OnChanges, AfterViewInit, OnDestroy {
  @ViewChild("container", { static: false }) containerRef !: ElementRef;
  @Input() avatarType!: AvatarType

  readonly mouth = ["Concerned", "Default", "Disbelief", "Eating", "Grimace", "Sad", "ScreamOpen", "Serious", "Smile", "Tongue", "Twinkle", "Vomit"];
  readonly eyes = ["Close", "Cry", "Default", "Dizzy", "EyeRoll", "Happy", "Hearts", "Side", "Squint", "Surprised", "Wink", "WinkWacky"];
  readonly eyebrows = ["Angry", "AngryNatural", "Default", "DefaultNatural", "FlatNatural", "RaisedExcited", "RaisedExcitedNatural", "SadConcerned", "SadConcernedNatural", "UnibrowNatural", "UpDown", "UpDownNatural"]

  private talktimer: any;
  private mouthstate: string = "Smile";

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    if(!!this.containerRef) this.render();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.render();
    }, 100);
  }

  ngOnDestroy() {
    //this.containerRef.nativeElement
  }

  private render() {
    const p: Props = {
      avatarStyle: this.avatarType.avatarStyle,
      topType: this.avatarType.topType,
      accessoriesType: this.avatarType.accessoriesType,
      hairColor: this.avatarType.hairColor,
      facialHairType: this.avatarType.facialHairType,
      clotheType: this.avatarType.clotheType,
      clotheColor: this.avatarType.clotheColor,
      eyeType: this.avatarType.eyeType,
      eyebrowType: this.avatarType.eyebrowType,
      mouthType: this.avatarType.mouthType,
      skinColor: this.avatarType.skinColor,
      facialHairColor: this.avatarType.facialHairColor
    }

    ReactDOM.render(React.createElement(AvatarComponent, p), this.containerRef.nativeElement)
  }

  public toggle_talk() {
    this.mouthstate = this.avatarType.mouthType;
    if (this.talktimer != null) {
      clearInterval(this.talktimer);
      this.avatarType.mouthType = this.mouthstate;
      this.talktimer = null;
    } else {
      this.talktimer = setInterval(() => {
        if (this.avatarType.mouthType == "Default") {
          this.avatarType.mouthType = this.mouthstate;
        } else {
          this.avatarType.mouthType = "Default";
        }
        this.render();
      }, 300)
    }
  }

}
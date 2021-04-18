import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild } from '@angular/core';
import * as React from 'react';

import * as ReactDOM from 'react-dom';
import AvatarComponent, { Props } from "avataaars";

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})

export class AvataarComponent implements OnChanges, AfterViewInit, OnDestroy {
  @ViewChild("container") containerRef !: ElementRef;
  @Input() avatarStyle: string = 'Circle';
  @Input() topType: string = 'LongHairMiaWallace';
  @Input() accessoriesType: string = 'Prescription02';
  @Input() hairColor: string = 'BrownDark';
  @Input() facialHairType: string = 'Blank';
  @Input() clotheType: string = 'Hoodie';
  @Input() clotheColor: string = 'PastelBlue';
  @Input() eyeType: string = 'Happy';
  @Input() eyebrowType: string = 'Default';
  @Input() mouthType: string = 'Smile';
  @Input() skinColor: string = 'Light';

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
    ReactDOM.umountComponentAtNode(this.containerRef.nativeElement);
  }

  private render() {
    const p: Props = {
      avatarStyle: this.avatarStyle,
      topType: this.topType,
      accessoriesType: this.accessoriesType,
      hairColor: this.hairColor,
      facialHairType: this.facialHairType,
      clotheType: this.clotheType,
      clotheColor: this.clotheColor,
      eyeType: this.eyeType,
      eyebrowType: this.eyebrowType,
      mouthType: this.mouthType,
      skinColor: this.skinColor
    }

    ReactDOM.render(React.createElement(AvatarComponent, p), this.containerRef.nativeElement)
  }

  public toggle_talk() {
    this.mouthstate = this.mouthType;
    if (this.talktimer != null) {
      clearInterval(this.talktimer);
      this.mouthType = this.mouthstate;
      this.talktimer = null;
    } else {
      this.talktimer = setInterval(() => {
        if (this.mouthType == "Default") {
          this.mouthType = this.mouthstate;
        } else {
          this.mouthType = "Default";
        }
        this.render();
      }, 300)
    }
  }

}

/*
Option 1
<Avatar
  avatarStyle='Circle'
  topType='NoHair'
  accessoriesType='Prescription02'
  facialHairType='Blank'
  clotheType='ShirtCrewNeck'
  clotheColor='PastelRed'
  eyeType='Default'
  eyebrowType='Default'
  mouthType='Default'
  skinColor='Brown'
/>

Option 2
<Avatar
  avatarStyle='Circle'
  topType='Hijab'
  accessoriesType='Round'
  hatColor='Black'
  clotheType='BlazerShirt'
  eyeType='Default'
  eyebrowType='Default'
  mouthType='Smile'
  skinColor='Light'
/>

Option 3
<Avatar
  avatarStyle='Circle'
  topType='Turban'
  accessoriesType='Blank'
  hatColor='Black'
  facialHairType='BeardMedium'
  facialHairColor='Black'
  clotheType='BlazerSweater'
  clotheColor='PastelRed'
  eyeType='Default'
  eyebrowType='DefaultNatural'
  mouthType='Twinkle'
  skinColor='Light'
/>

Option 4
<Avatar
  avatarStyle='Circle'
  topType='WinterHat3'
  accessoriesType='Blank'
  hatColor='Black'
  facialHairType='BeardMajestic'
  facialHairColor='Black'
  clotheType='Hoodie'
  clotheColor='Blue03'
  eyeType='Default'
  eyebrowType='FlatNatural'
  mouthType='Smile'
  skinColor='Light'
/>

Option 5
<Avatar
  avatarStyle='Circle'
  topType='LongHairBigHair'
  accessoriesType='Blank'
  hairColor='BrownDark'
  facialHairType='Blank'
  clotheType='ShirtScoopNeck'
  clotheColor='Pink'
  eyeType='Default'
  eyebrowType='FlatNatural'
  mouthType='Default'
  skinColor='Pale'
/>

*/

import { Component, Output, EventEmitter, Input, AfterViewInit, ViewChild, ElementRef, HostListener, NgZone } from '@angular/core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-markdown-input',
  templateUrl: './markdown-input.component.html',
  styleUrls: ['./markdown-input.component.scss']
})
export class MarkdownInputComponent implements AfterViewInit {

  @ViewChild('textarea') textarea !: ElementRef;
  @ViewChild('toolbar') toolbar !: ElementRef;
  @Input() value: string;
  @Input() large: boolean = false;
  @Input() enablefullscreen: boolean = true;
  @Input() viewas: string = '';
  @Output() onchange: EventEmitter<string> = new EventEmitter<string>()
  @Input() imageupload: boolean = false;
  @Input() placeholder: string = "Response";
  // @Output() markdown:EventEmitter<string> = new EventEmitter<string>()
  fullscreen: boolean = false;
  private scroll: number = 0;
  private txheight: number = 100;
  toploc: number = 0;
  history: Array<string> = []
  viewmd = false;
  hmark = -1;
  lastchange: number = Date.now();
  readonly maxSize = 500 * 2 ** 10; //500KB max
  uploading = false;
  recording: boolean = false;
  playing: boolean = false;
  recdata: any = null;
  completedDuration: number = 0;
  currentTime: number = 0;
  timer: any = null;
  audiocontrol: HTMLAudioElement;
  extension: string = null;
  duration = 120;

  constructor(private zone: NgZone) { }

  toggleFullscreen() {
    let tx = this.textarea.nativeElement;
    let x: any = tx;
    while ((x = x.parentElement) && (x.nodeName as string).toLowerCase() != 'app-markdown-input') { }

    if (this.fullscreen) {
      tx.style.height = `${this.txheight}px`;
      document.scrollingElement.scrollTop = this.scroll;
      if (!!x) {
        x.style['max-width'] = '600px';
      }
    } else {
      this.txheight = !!tx.style.height ? parseInt(tx.style.height) : (this.large ? 150 : 100);
      tx.style.height = `${Math.max(this.txheight, tx.scrollHeight)}px`;
      if (!!x) {
        x.style['max-width'] = 'unset';
      }
      this.scroll = document.scrollingElement.scrollTop;
      this.toploc = x.offsetTop + 70
      document.scrollingElement.scrollTop = this.toploc;
    }
    this.fullscreen = !this.fullscreen
  }

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll($event) {
    if (!this.fullscreen) return;
    if (window.pageYOffset > this.toploc && window.pageYOffset < (this.textarea.nativeElement.scrollHeight + this.toploc)) {
      (this.toolbar.nativeElement as HTMLDivElement).classList.add("toolbarfixed")
    } else {
      (this.toolbar.nativeElement as HTMLDivElement).classList.remove("toolbarfixed")
    }
  }

  // toggleFullscreen() {
  //   if (this.fullscreen) {
  //     document.scrollingElement.scrollTop = this.scroll;
  //   } else {
  //     this.scroll = document.scrollingElement.scrollTop;
  //     document.scrollingElement.scrollTop = 0;
  //   }
  //   this.fullscreen = !this.fullscreen
  // }
  // async displayCapture(displayMediaOptions) {
  //   let captureStream = null;

  //   try {
  //     captureStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
  //   } catch(err) {
  //     console.error("Error: " + err);
  //   }
  //   return captureStream;
  // }

  // async startRecording() {
  //   this.videoElement.srcObject = await this.displayCapture({ video: true })
  // }


  // @ViewChild('video') videoElementRef: ElementRef
  // get videoElement(): HTMLVideoElement {
  //   return this.videoElementRef.nativeElement
  // }

  //TODO: add ctrl z ad r
  //@HostListener('window:keydown', ['$event'])
  keyup($event: KeyboardEvent) {
    //console.log($event)
    if (($event.ctrlKey || $event.metaKey) && $event.key.toUpperCase() == 'Z') { this.undo(); }
    else if (($event.ctrlKey || $event.metaKey) && $event.key.toUpperCase() == 'Y') { this.redo(); }
    else if (($event.ctrlKey || $event.metaKey) && $event.key.toUpperCase() == 'B') { this.encloseby('**'); }
    else if (($event.ctrlKey || $event.metaKey) && $event.key.toUpperCase() == 'I') { this.encloseby('*'); }
    //else if ($event.key == "F11") { this.fullscreen = !this.fullscreen; $event.stopImmediatePropagation() }
    //else this.change();
    //else if ($event.key == )
    //  this.encloseby('*')
  }

  private backup() {
    if (this.hmark == -1 || this.history[this.hmark] != this.value) {
      this.history = this.history.splice(0, this.hmark + 1);
      this.history.push(this.value);
      this.hmark++;
    }
  }

  change() {
    
    if (this.fullscreen) {
      let tx = this.textarea.nativeElement;
      let h = Math.max(this.txheight, tx.scrollHeight)
      let currentheight = parseInt(tx.style.height)
      //console.log("change called: ", currentheight, this.txheight, tx.scrollHeight);
      if (currentheight < (h-4)) tx.style.height = `${h-4}px`;
    }
    let t: number = Date.now();
    if ((t - this.lastchange) / 1000 > 2) {
      this.backup();
    }
    this.lastchange = t;
    this.onchange.emit(this.value);
  }

  undo() {
    if (this.hmark > 0) {
      this.hmark--;
      this.value = this.history[this.hmark];
      this.onchange.emit(this.value);
    }
  }

  redo() {
    if (this.hmark < this.history.length - 1) {
      this.hmark++;
      this.value = this.history[this.hmark];
      this.onchange.emit(this.value);
    }
  }
  
  encloseby(md: string) {
    let e: HTMLTextAreaElement = this.textarea.nativeElement;
    e.focus()
    this.value = this.value.slice(0, e.selectionStart) + md + this.value.slice(e.selectionStart, e.selectionEnd) + md + this.value.slice(e.selectionEnd, this.value.length);
    let s = e.selectionStart
    e.value = this.value;
    e.selectionStart = s + md.length
    e.selectionEnd = e.selectionStart;
    this.onchange.emit(this.value);
    this.backup()
  }

  insert(md: string) {
    let e: HTMLTextAreaElement = this.textarea.nativeElement;
    e.focus()
    this.value = this.value.slice(0, e.selectionStart) + md + this.value.slice(e.selectionEnd, this.value.length);
    let s = e.selectionStart
    e.value = this.value;
    e.selectionStart = s + md.length
    e.selectionEnd = e.selectionStart;
    this.onchange.emit(this.value);
    this.backup()
  }

  startlinesby(md: string) {
    let e: HTMLTextAreaElement = this.textarea.nativeElement;
    e.focus()
    if (e.selectionStart == e.selectionEnd) {
      this.value = this.value.slice(0, e.selectionStart) + '\n' + md + '\n' + this.value.slice(e.selectionStart, this.value.length);
    } else {
      let t: string = this.value.slice(e.selectionStart, e.selectionEnd);
      t = (t.split('\n').map(x => { return md + ' ' + x + '\n' })).join('')
      this.value = this.value.slice(0, e.selectionStart) + '\n' + t + '\n' + this.value.slice(e.selectionEnd, this.value.length);
    }
    this.onchange.emit(this.value);
    this.backup()
    e.selectionEnd = e.selectionStart;
  }

  startcurrentlineby(md: string) {
    let e: HTMLTextAreaElement = this.textarea.nativeElement;
    e.focus()
    let x = e.selectionStart;
    while (x > 0 && this.value[x - 1] != '\n') x--;
    if (this.value[x] == md[0]) md = md.trim();
    this.value = this.value.slice(0, x) + md + this.value.slice(x, this.value.length);
    this.onchange.emit(this.value);
    this.backup()
    e.selectionEnd = e.selectionStart;
  }


  numberlines() {
    let e: HTMLTextAreaElement = this.textarea.nativeElement;
    e.focus()
    if (e.selectionStart == e.selectionEnd) {
      this.value = this.value.slice(0, e.selectionStart) + '\n1. \n' + this.value.slice(e.selectionStart, this.value.length);
    } else {
      let t: string = this.value.slice(e.selectionStart, e.selectionEnd);
      let n = 0;
      t = (t.split('\n').map(x => { n++; return n.toString() + '. ' + x + '\n' })).join('')
      this.value = this.value.slice(0, e.selectionStart) + '\n' + t + '\n' + this.value.slice(e.selectionEnd, this.value.length);
    }
    this.onchange.emit(this.value);
    e.selectionEnd = e.selectionStart;
  }


  ngAfterViewInit(): void {
    setTimeout(() => {
      //this.startRecording();
      this.backup();
    }, 10);
  }

}

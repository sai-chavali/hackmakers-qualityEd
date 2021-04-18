import { Pipe, PipeTransform, Renderer2, SecurityContext } from '@angular/core';
//import * as marked from "marked";
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { renderToString } from 'katex';
import { rendermarked } from 'src/app/utils';

@Pipe({
  name: 'marked'
})
export class MarkedPipe implements PipeTransform {

  

  constructor(private renderer: Renderer2, private sanitizer: DomSanitizer) { }

  private removespeechhint(text: string): string {
    let re = /{(.*?)}\(.*?\)/gm;
    return text.replace(re, function (a, b) {
      return b;
    })
  }

  private processmath(text: string): string {
    //console.log(text);
    let re = /(^|\s)\$(.*?)\$(\s|$)/gm;
    return text.replace(re, (a, b, c, d) => {
      //console.log(a, b, c, d);
      return `${b}${renderToString(c)}${d}`;
    })
  }


  transform(value: any, astype?: string): SafeHtml {

    //let renderer = new marked.Renderer();
    //renderer.link = (href, title, text) => { return `<a rel="noopener" title="${title}" href="${href}" target="_blank">${text}</a>` }
    if (value && value.length > 0) {
      let m = this.processmath(value)
      m = this.removespeechhint(rendermarked(m));
      return this.transform_astype(m, astype);
    }
    return value;
  }

  private transform_astype(html: string, astype: any): string {
    try {
      if (!!astype && astype.includes("mcq")) {
        console.log("MCQ")
        html = this.processMultiChoiceQuestions(html);
        console.log(html)
      } 
      // else if (!!astype && astype.includes('resource')) {
      //   html = this.processVideo(html);
      // }
      html = this.processMedia(html);
    } catch(e) {
      return html;
    }

    return html;
  }

  private processMedia(html: string): string {
    let d = this.renderer.createElement("div");
    d.innerHTML = html;
    
    let vid: boolean = false;
    let aud: boolean = false;
    /*
    <iframe class="detail__media__vid" 
    src="https://www.youtube-nocookie.com/embed/Wv5jlmJs2sU?wmode=transparent&amp;iv_load_policy=3&amp;autoplay=1&amp;html5=1&amp;
    showinfo=0&amp;rel=0&amp;modestbranding=1&amp;playsinline=1&amp;theme=light" frameborder="0" scrolling="no" allowfullscreen="" webkitallowfullscreen="" mozallowfullscreen=""></iframe>
     */
    d.querySelectorAll("a").forEach((aref: HTMLAnchorElement) => {
      //https://www.youtube.com/watch?v=n4NVPg2kHv4
      let m = aref.href.match(/(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?/);
      if (m) {
        let l = `https://www.youtube.com/embed/${m[1]}`;//aref.href.replace("watch?v=", "embed/");

        let el: HTMLIFrameElement = this.renderer.createElement('iframe');
        // TODO: replace watch with embed here
        el.src = l + '?rel=0&modestbranding=1';
        el.setAttribute('frameborder', '0');
        el.setAttribute('title', 'Video');
        el.setAttribute('wmode', 'transparent');
        el.setAttribute('iv_load_policy', '3');
        el.setAttribute('html5', '1');
        el.setAttribute('showinfo', '0');
        el.setAttribute('playsinline', '1');
        el.setAttribute('theme', 'light');
        el.setAttribute('scrolling', 'no');
        //el.setAttribute('autoplay', '1');
        el.setAttribute('allowfullscreen', 'true');
        let d: HTMLDivElement = this.renderer.createElement('div');
        d.className = 'responsiveRapper';
        d.appendChild(el);
        aref.replaceWith(d);
        vid = true;
      }
    });

    d.querySelectorAll("a").forEach((aref: HTMLAnchorElement) => {
      if(aref.innerHTML=='AUDIO') {
        let el:HTMLAudioElement = this.renderer.createElement('audio');
        el.src = aref.href;
        el.controls = true;
        el.className="audio"
        aref.replaceWith(el);
        aud = true;
      }
     });
 
    return d.innerHTML;
  }

  private shuffle(a: Array<any>) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  private processMultiChoiceQuestions(html: string): string {
    let el: HTMLFormElement = this.renderer.createElement('form');
    el.className = "question";
    el.innerHTML = html;
    let oid: number = 1;
    let qid: number = 1;

    //console.log(el);
    el.querySelectorAll("form>ul").forEach(ul => {
      let option: string = 'A'; // every ul starts a new option set
      //console.log(ul);
      let options: Array<any> = [];
      ul.querySelectorAll("ul>li").forEach(li => {
        let input: HTMLInputElement = this.renderer.createElement('input');
        let label: HTMLLabelElement = this.renderer.createElement("label")
        label.innerHTML = li.innerHTML;
        input.value = `${oid}`;
        input.name = `q${oid}`;
        label.htmlFor = `option${oid}`;
        input.id = `option${oid}`;
        input.checked = false;
        input.type = "checkbox";
        li.className = "option";

        li.childNodes.forEach(element => {
          li.removeChild(element)
        });
        li.appendChild(input);
        li.appendChild(label);
        //console.log(li)
        options.push(li);
        oid++;
      })

      let ol: HTMLOListElement = this.renderer.createElement('ol');
      ol.type = "A";
      options = this.shuffle(options);
      options.forEach(element => {
        ol.appendChild(element);
      });
      ul.replaceWith(ol);
      qid++;
    });

    let t = el.outerHTML;

    // process blanks
    let re = /\{\{(.*?)\}\}/gm;
    return t.replace(re, (a, b) => {
      return `<input type="text" id="blank${b}" class="fillblank">`;
    })
  }

}

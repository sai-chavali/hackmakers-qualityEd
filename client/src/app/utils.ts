import * as marked from "marked";

export class Calc {

  static titleCase(str: string): string {
    let s = str.toLowerCase().split(' ');
    for (var i = 0; i < s.length; i++) {
      s[i] = s[i].charAt(0).toUpperCase() + s[i].slice(1);
    }
    return s.join(' ');
  }

  static preparespeech(text: string): string {
    // replace multiple blanks

    text = text.trim()

    // remove parenthesis
    let re = /{.*?}\((.*?)\)/gm;
    let t = text.replace(re, (a, b) => {
      return b;
    })

    // skil text in middle of parenthesis
    re = /(\(.*?\)|\[.*?\]|{.*?})/gm;
    t = t.replace(re, (a, b) => {
      return '';
    })

    t = t.replace(/\s\s+/g, ' ')
    t = t.replace(/\s([,:;\.\?!])/g, '$1')

    // ensure there is a last .
    return t.replace(/^(.*)$/gm, (a, b) => {
      return b ? this.endcheck(b) : b;
    });
  }

  static preparedisplay(text: string): string {
    let re = /{(.*?)}\(.*?\)/gm;
    let t = text.replace(re, (a, b) => {
      return b;
    })

    return t.replace(/^(.*)$/gm, (a, b) => {
      return b ? this.endcheck(b) : b;
    });
  }

  static preparesetntences(text: string): string {
    let re = /{(.*?)}\((.*?)\)/gm;
    let t = text.replace(re, (a, b) => {
      return b.replace('.', '#');
    })

    return t.replace(/^(.*)$/gm, (a, b) => {
      return b ? this.endcheck(b) : b;
    });
  }

  static endcheck(text: string): string {
    text = text ? text.trim() : text;
    if (!text || ".;?!:-,".includes(text[text.length - 1])) return text + " ";
    return text + ". ";
  }

  static getTextRenderer(): any {
    let renderer = new marked.Renderer();
    renderer.br = () => { return ' ' }
    renderer.del = (text) => { return text }
    renderer.em = (text) => { return text }
    renderer.image = (href, title, text) => { return text }
    renderer.link = (href, title, text) => { return '' }
    renderer.strong = (text) => { return text }
    renderer.text = (text) => { return text }
    renderer.list = (a, b, c) => { return a }
    renderer.listitem = (x) => { return Calc.endcheck(x) }
    renderer.paragraph = (x) => { return Calc.endcheck(x) }
    renderer.table = (h, b) => { return ' ' }
    renderer.blockquote = (q) => { return q }
    renderer.checkbox = (c) => { return ' ' }
    renderer.code = (c, l, i) => { return ' ' }
    renderer.codespan = (c) => { return ' ' }
    renderer.heading = (t, l, r, s) => { return Calc.endcheck(t) }
    renderer.hr = () => { return '' }

    return renderer;
  }

  static getHtmlTextRenderer(): any {
    let renderer = new marked.Renderer();
    renderer.br = () => { return ' ' }
    renderer.del = (text) => { return '' }
    renderer.em = (text) => { return `<em>${text}</em>` }
    renderer.image = (href, title, text) => { return text }
    renderer.link = (href, title, text) => { return '' }
    renderer.strong = (text) => { return `<strong>${text}</strong>` }
    renderer.text = (text) => { return text }
    renderer.list = (a, b, c) => { return a }
    renderer.listitem = (x) => { return Calc.endcheck(x) }
    renderer.paragraph = (x) => { return Calc.endcheck(x) }
    renderer.table = (h, b) => { return ' ' }
    renderer.blockquote = (q) => { return q }
    renderer.checkbox = (c) => { return ' ' }
    renderer.code = (c, l, i) => { return ' ' }
    renderer.codespan = (c) => { return ' ' }
    renderer.heading = (t, l, r, s) => { return Calc.endcheck(t) }
    renderer.hr = () => { return '' }

    return renderer;
  }
}



export const rendermarked = (m: string) => {
  let renderer = new marked.Renderer();
  renderer.link = (href, title, text) => { return `<a rel="noopener" title="${title}" href="${href}" target="_blank">${text}</a>` }
  return marked(m, { renderer: renderer })
}

export const rendertext = (t: string) => marked(t, { renderer: Calc.getTextRenderer() })

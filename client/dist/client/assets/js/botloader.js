export function loadbot(){
    mainBot();
}

export function clickcatcher(handler) {
    document.body.onclick = (ev) => {
        handler(ev);
    }
}
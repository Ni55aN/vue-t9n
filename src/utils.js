export function eachTextNode(node, callback) {
    if(!node.children) return;
    if(node.componentInstance) return;

    node.children.forEach(n => n.text ? callback(n) : eachTextNode(n, callback));
}

export function deepComponentChild(component, callback) {
    callback(component);
    component.$children.forEach(c => deepComponentChild(c, callback));
}

export function toObj(entries) {
    return entries.reduce((obj, item) => ({...obj, [item[0]]: item[1]}), {});
}

export function trim(text) {
    let [_, start, content, end] = text.match(/^(\s*)(.*?)(\s*)$/);

    return { content, start, end }
}
function eachSlot(node, callback) {
    const slotList = Object.values(node.componentInstance.$slots);
        
    return slotList.map(slots => slots.map(callback));
}

export function eachTextNode(node, deep, callback) {
    if(node.text) {
        if(!node.elm)
            throw new Error(`VNode element ${node.text} doesn't have an 'elm' property. Please replace the 'template' tag`);
        return callback(node);
    }
    if(deep && node.componentInstance) {
        return eachSlot(node, vnode => {
            eachTextNode(vnode, deep, callback);
        });
    }

    if(node.children)
        node.children.forEach(n => eachTextNode(n, deep, callback));
}

export function deepComponentChild(component, callback) {
    callback(component);
    component.$children.forEach(c => deepComponentChild(c, callback));
}

export function toObj(entries) {
    return entries.reduce((obj, item) => ({...obj, [item[0]]: item[1]}), {});
}

export function trim(text) {
    let [_, start, content, end] = text.match(/^(\s*)(.*?)(\s*)$/s);

    return { content, start, end }
}
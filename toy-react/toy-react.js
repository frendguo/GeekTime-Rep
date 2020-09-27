const RENDER_TO_DOM = Symbol("render to dom");

export class Component {
    constructor() {
        this.props = Object.create(null);
        this.children = [];
        this._range = null;
    }

    setAttribute(name, value) {
        this.props[name] = value;
    }

    appendChild(component) {
        this.children.push(component);
    }

    [RENDER_TO_DOM](range) {
        this._range = range;
        range.deleteContents();
        this.render()[RENDER_TO_DOM](range);
    }

    rerender() {
        this[RENDER_TO_DOM](this._range);
    }

    setState(newState) {
        if (this.state === null || typeof this.state !== "object") {
            this.state = newState;
            return;
        }

        let merge = (oldState, newState) => {
            for (let p in newState) {
                if (oldState[p] === null || typeof oldState[p] !== "object") {
                    oldState[p] = newState[p];
                } else {
                    merge(oldState[p], newState[p]);
                }
            }
        }

        merge(this.state, newState);
        this.rerender();
    }
}

class ElementWrapper {
    constructor(type) {
        this.root = document.createElement(type);
    }

    setAttribute(name, value) {
        if (name.match(/on([\s\S]+)/)) {
            this.root.addEventListener(RegExp.$1.replace(/^[\s\S]/, n => n.toLowerCase()), value);
        } else {
            this.root[name] = value;
        }
    }

    appendChild(component) {
        if (component === null){
            return;
        }
        let range = document.createRange();
        range.setStart(this.root, this.root.childNodes.length);
        range.setEnd(this.root, this.root.childNodes.length);
        component[RENDER_TO_DOM](range);
    }

    [RENDER_TO_DOM](range) {
        range.insertNode(this.root);
    }
}

class TextWrapper {
    constructor(content) {
        this.root = document.createTextNode(content);
    }

    [RENDER_TO_DOM](range) {
        range.insertNode(this.root);
    }
}

export function createElement(tagName, attributes, ...children) {
    let e;
    if (typeof tagName === "string") {
        e = new ElementWrapper(tagName);
    } else {
        e = new tagName();
    }

    for (let attr in attributes) {
        e.setAttribute(attr, attributes[attr]);
    }

    let insertChildren = (children) => {
        for (let child of children) {
            if (typeof child === "string") {
                // 文本元素只能作为子元素 所以前面不需要判断是不是文本元素
                child = new TextWrapper(child);
            }

            if (typeof child === "object" && child instanceof Array) {
                insertChildren(child);
            } else {
                e.appendChild(child);
            }
        }
    }
    insertChildren(children);

    return e;
}

export function domRender(component, parentNode) {
    let range = document.createRange();
    range.setStart(parentNode, 0);
    range.setEnd(parentNode, parentNode.childNodes.length);
    range.deleteContents();

    component[RENDER_TO_DOM](range);
}


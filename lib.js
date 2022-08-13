export function createElement(type, attributes, ...children) {
    const ele = typeof type === 'string' ? document.createElement(type) : new type;

    for (let name in attributes) {
        ele.setAttribute(name, attributes[name])
    }

    const renderChildren = (children) => {
        for (let child of children) {
            if (typeof child === 'undefined' || child === null) {
                continue;
            }
            if (typeof child === 'string' || typeof child === 'number') {
                child = document.createTextNode(child);
            }
            if (Array.isArray(child)) {
                renderChildren(child);
                continue;
            }
            if (child.mount) {
                child.mount(ele);
            } else {
                ele.appendChild(child); // child不是Node类的话会报错
            }
        }
    };
    renderChildren(children);
    return ele;
}

export class Component {
    constructor() {
        console.log('MyComponent');
        this.root = document.createElement('div');
        this.renderQuest = false;
        this.children = [];
        this.attributes = {};
        this.requestRender();
        this.state = {};
    }
    setState(state) {
        Object.assign(this.state, state);
        this.requestRender();
    }
    setAttribute(name, val) {
        let matched;
        if (matched = name.match(/^on([\s\S]+)/)) {
            const eventType = matched[1].replace(/[A-Z]/g, c => c.toLowerCase());
            this.root.addEventListener(eventType, val);
        }
        // this.root.setAttribute(name, val);
        this.attributes[name] = val;
        this.requestRender();
    };
    appendChild(child) {
        this.children.push(child);
        this.requestRender();
    }
    mount(parent) {
        parent.appendChild(this.root);
        this.requestRender();
    }
    requestRender() {
        if (this.renderQuest) return;
        this.renderQuest = true;
        // start a async render task
        Promise.resolve().then(() => {
            this.renderQuest = false;
            this.root.innerHTML = '';
            this.root.appendChild(this.render());
        })
    }
    render() {
        console.error('this render should not be called')
    }
    // render() {
    //     console.log('rendering');
    //     // this.root.appendChild(document.createTextNode(this.root.getAttribute('text')));
    //     // for (let child of this.children) {
    //     //     this.root.appendChild(child);
    //     // }
    //     return <div>
    //         {this.attributes.text}
    //         {this.children}
    //     </div>
    // }
}
function createElement(type, attributes, ...children) {
    const ele = typeof type === 'string' ? document.createElement(type) : new type;

    for (let name in attributes) {
        ele.setAttribute(name, attributes[name])
    }
    for (let child of children) {
        if (typeof child === 'string') {
            child = document.createTextNode(child);
        }
        if (child.mount) {
            child.mount(ele);
        } else {
            ele.appendChild(child); // child不是Node类的话会报错
        }
    }
    return ele;
}

class MyComponent {
    constructor() {
        console.log('MyComponent');
        this.root = document.createElement('div');
    }
    setAttribute(name, val) {
        this.root.setAttribute(name, val);
    };
    appendChild(child) {
        this.root.appendChild(child);
    }
    mount(parent) {
        parent.appendChild(this.root);
    }
}
let jsx = <div id='container'>
    whatever i am
    <MyComponent id='s'></MyComponent>
</div>

document.body.appendChild(jsx);
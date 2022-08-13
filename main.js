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
        this.renderQuest = false;
        this.children = [];
        this.requestRender();
    }
    setAttribute(name, val) {
        this.root.setAttribute(name, val);
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
            this.render();
        })
    }
    render() {
        console.log('rendering');
        this.root.innerHTML = '';
        this.root.appendChild(document.createTextNode(this.root.getAttribute('text')));
        for (let child of this.children) {
            this.root.appendChild(child);
        }
    }
}
let jsx = <div id='container'>
    whatever i am
    <MyComponent id='s' text='sth'>
        <div>1</div>
        <div>2</div>
        <div>3</div>
    </MyComponent>
</div>

document.body.appendChild(jsx);
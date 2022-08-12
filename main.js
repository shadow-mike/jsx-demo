function createElement(type, attributes, ...children) {
    const ele = document.createElement(type);

    for (let name in attributes) {
        ele.setAttribute(name, attributes[name])
    }
    for (let child of children) {
        if (typeof child === 'string') {
            child = document.createTextNode(child);
        }
        ele.appendChild(child);
    }
    return ele;
}
let jsx = <div id='container'>
    test2
    <div></div>
    <div></div>
    <div></div>
    <div></div>
</div>

document.body.appendChild(jsx);
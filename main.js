import { Component, createElement } from './lib.js'

class MyComponent extends Component {
    constructor() {
        super();
    }
    render() {
        return <div>
            {this.attributes.text}
            {this.children}
        </div>
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
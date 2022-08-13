import { Component, createElement } from './lib.js'

class MyComponent extends Component {
    constructor() {
        super();
    }
    state = { value: 1 };
    render() {
        return <div>
            {this.attributes.text}

            <div>state: {this.state.value}</div>
            {this.children}
            <Button onClick={() => { this.setState({ value: this.state.value + 1 }) }}>click</Button>
        </div>
    }
}
class Button extends Component {
    render() {
        return <button >{this.children}</button>
    }
}
let jsx = <div id='container'>
    whatever i am
    <MyComponent id='s' text='some text'>
        <div>child1</div>
        <div>child2</div>
        <div>child3</div>
    </MyComponent>
</div>

document.body.appendChild(jsx);
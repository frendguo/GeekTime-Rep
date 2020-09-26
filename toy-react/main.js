import { Component, createElement, domRender } from './toy-react.js'

class Div2 extends Component {
    render() {
        return <div>
            <h1>标题</h1>
            <Div3></Div3>
            {this.children}
        </div>
    }
}

class Div3 extends Component {
    render() {
        return <div><a href="http://www.baidu.com">这是个链接</a></div>
    }
}

domRender(<Div2 id="div_id" class="div_class">
    <div>hahhaha</div>
    <div id="123"></div>
    <div></div>
</Div2>, document.body);
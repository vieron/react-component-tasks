import React, { Component } from 'react';


export class TabsNav extends Component {

    render() {
        return (<nav>
                    <a>Link 1</a>
                    <a>Link 2</a>
                </nav>)
    }
}


export default class Tabs extends Component {
    render() {
        return (<div>
                    <TabsNav />
                </div>);
    }
}
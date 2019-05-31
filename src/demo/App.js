/* eslint no-magic-numbers: 0 */
import React, {Component} from 'react';

import {QueryBuilder} from '../lib';
import config from './config'

class App extends Component {

    constructor() {
        super();
        this.setProps = this.setProps.bind(this);
    }

    setProps(newProps) {
        this.setState(newProps);
    }

    render() {
        return (
            <div>
                <QueryBuilder
                    setProps={this.setProps}
                    {...config}
                />
            </div>
        )
    }
}

export default App;

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Query, Builder} from 'react-awesome-query-builder';
import {boundMethod} from 'autobind-decorator'

export default class QueryBuilder extends Component {
    @boundMethod
    onChange() {
        const {value, setProps} = this.props;
        setProps({
            value: value
        })
    }

    @boundMethod
    getChildren(props) {
        return (
            <div className="query-builder">
                <Builder {...props} />
            </div>
        )
    }


    render() {
        const {id, ...rest} = this.props;

        return (
            <div id={id}>
                <Query
                    get_children={this.getChildren}
                    onChange={this.onChange}
                    {...rest}
                ></Query>
            </div>
        );
    }

}

QueryBuilder.propTypes = {
    /**
     * The ID used to identify this component in Dash callbacks
     */
    id: PropTypes.string,


    /**
     * The value displayed in the input
     */
    value: PropTypes.string,

    /**
     * Dash-assigned callback that should be called whenever any of the
     * properties change
     */
    setProps: PropTypes.func

    /**
     * The remaining props are provided to the Query component: https://github.com/ukrbublik/react-awesome-query-builder#config-format
     */

};

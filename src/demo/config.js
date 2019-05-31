import React from 'react';
import {Widgets} from 'react-awesome-query-builder';
import en_US from 'antd/lib/locale-provider/en_US';

const {
    TextWidget,
    NumberWidget,
} = Widgets;


export default {
    conjunctions: {
        AND: {
            label: 'And',
            mongoConj: '$and',
            reversedConj: 'OR',
            formatConj: (children, conj, not, isForDisplay) => {
                return children.size > 1 ?
                    (not ? "NOT " : "") + '(' + children.join(' ' + (isForDisplay ? "AND" : "&&") + ' ') + ')'
                    : (not ? "NOT (" : "") + children.first() + (not ? ")" : "");
            },
        },
        OR: {
            label: 'Or',
            mongoConj: '$or',
            reversedConj: 'AND',
            formatConj: (children, conj, not, isForDisplay) => {
                return children.size > 1 ?
                    (not ? "NOT " : "") + '(' + children.join(' ' + (isForDisplay ? "OR" : "||") + ' ') + ')'
                    : (not ? "NOT (" : "") + children.first() + (not ? ")" : "");
            },
        },
    },
    fields: {
        text: {
            label: 'Text',
            type: 'text',
            operators: ['equal', 'not_equal'],
        },
        num: {
            label: 'Number',
            type: 'number',
            fieldSettings: {
                min: -1,
                max: 5
            },
            operators: [
                "equal",
                "not_equal",
                "less",
                "less_or_equal",
                "greater",
                "greater_or_equal",
                "between",
                "not_between",
                "is_empty",
                "is_not_empty",
            ],
        },
    },
    types: {
        text: {
            widgets: {
                text: {
                    defaultOperator: 'is_empty',
                    operators: [
                        'equal',
                        'not_equal',
                        "is_empty",
                        "is_not_empty",
                        'proximity'
                    ],
                    widgetProps: {
                        formatValue: (val, fieldDef, wgtDef, isForDisplay) => (JSON.stringify(val)),
                        valueLabel: "Text",
                        valuePlaceholder: "Enter text",
                    }
                },
                field: {
                    operators: [
                        'equal',
                        'not_equal',
                        'proximity'
                    ],
                }
            },
        },
        number: {
            mainWidget: "number",
            valueSources: ['value', 'field'],
            defaultOperator: 'equal',
            widgets: {
                number: {
                    operators: [
                        "equal",
                        "not_equal",
                        "less",
                        "less_or_equal",
                        "greater",
                        "greater_or_equal",
                        "between",
                        "not_between",
                        "is_empty",
                        "is_not_empty",
                    ],
                    widgetProps: {
                        valueLabel: "Number2",
                        valuePlaceholder: "Enter number2",
                    }
                },
                slider: {
                    operators: [
                        "equal",
                        "not_equal",
                        "less",
                        "less_or_equal",
                        "greater",
                        "greater_or_equal",
                    ],
                    widgetProps: {
                        valueLabel: "Slider",
                        valuePlaceholder: "Move slider",
                        customProps: {
                            width: '200px'
                        }
                    }
                },
                rangeslider: {
                    operators: [
                        "range_between",
                        "range_not_between",
                    ],
                    widgetProps: {
                        valueLabel: "Range",
                        valuePlaceholder: "Select range",
                        customProps: {
                            width: '300px'
                        }
                    }
                }
            },
        },
    },
    operators: {
        equal: {
            label: '==',
            labelForFormat: '==',
            reversedOp: 'not_equal',
            mongoFormatOp: (field, op, value) => ({[field]: {'$eq': value}}),
        },
        not_equal: {
            label: '!=',
            labelForFormat: '!=',
            reversedOp: 'equal',
            mongoFormatOp: (field, op, value) => ({[field]: {'$ne': value}}),
        },
        less: {
            label: '<',
            labelForFormat: '<',
            reversedOp: 'greater_or_equal',
            mongoFormatOp: (field, op, value) => ({[field]: {'$lt': value}}),
        },
        less_or_equal: {
            label: '<=',
            labelForFormat: '<=',
            reversedOp: 'greater',
            mongoFormatOp: (field, op, value) => ({[field]: {'$lte': value}}),
        },
        greater: {
            label: '>',
            labelForFormat: '>',
            reversedOp: 'less_or_equal',
            mongoFormatOp: (field, op, value) => ({[field]: {'$gt': value}}),
        },
        greater_or_equal: {
            label: '>=',
            labelForFormat: '>=',
            reversedOp: 'less',
            mongoFormatOp: (field, op, value) => ({[field]: {'$gte': value}}),
        },
    },
    widgets: {
        text: {
            type: "text",
            valueSrc: 'value',
            factory: (props) => <TextWidget {...props} />,
            formatValue: (val, fieldDef, wgtDef, isForDisplay) => {
                return isForDisplay ? '"' + val + '"' : JSON.stringify(val);
            },
            validateValue: (val, fieldDef) => {
                return (val != "test");
            },
        },
        number: {
            type: "number",
            valueSrc: 'value',
            factory: (props) => <NumberWidget {...props} />,
            valueLabel: "Number",
            valuePlaceholder: "Enter number",
            formatValue: (val, fieldDef, wgtDef, isForDisplay) => {
                return isForDisplay ? val : JSON.stringify(val);
            },
            //mongoFormatValue: (val, fieldDef, wgtDef) => (Number(val)),
        },
    },
    settings: {
        maxLabelsLength: 50,
        hideConjForOne: true,
        renderSize: 'small',
        renderConjsAsRadios: false,
        renderFieldAndOpAsDropdown: false,
        customFieldSelectProps: {
            showSearch: true
        },
        groupActionsPosition: 'topRight', // oneOf [topLeft, topCenter, topRight, bottomLeft, bottomCenter, bottomRight]
        setOpOnChangeField: ['keep', 'default'], // 'default' (default if present), 'keep' (keep prev from last field), 'first', 'none'
        clearValueOnChangeField: false, //false - if prev & next fields have same type (widget), keep
        clearValueOnChangeOp: false,
        setDefaultFieldAndOp: false,
        maxNesting: 10,
        fieldSeparator: '.',
        fieldSeparatorDisplay: '->',
        showLabels: false,
        valueLabel: "Value",
        valuePlaceholder: "Value",
        fieldLabel: "Field",
        operatorLabel: "Operator",
        fieldPlaceholder: "Select field",
        operatorPlaceholder: "Select operator",
        deleteLabel: null,
        addGroupLabel: "Add group",
        addRuleLabel: "Add rule",
        readonlyMode: false,
        notLabel: "Not",
        showNot: true,
        delGroupLabel: null,
        canLeaveEmptyGroup: true, //after deletion
        locale: {
            short: 'en',
            full: 'en-US',
            antd: en_US,
        },
        valueSourcesInfo: {
            value: {
                label: "Value"
            },
            field: {
                label: "Field",
                widget: "field",
            }
        }
    }
};


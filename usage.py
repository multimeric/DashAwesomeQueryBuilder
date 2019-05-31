import react_awesome_query_builder
import dash
from dash.dependencies import Input, Output
import dash_html_components as html
import json

with open('config.json') as config:
    config_dict = json.load(config)

app = dash.Dash(__name__)

app.scripts.config.serve_locally = True
app.css.config.serve_locally = True

app.layout = html.Div([
    react_awesome_query_builder.QueryBuilder(
        id='input',
        **config_dict
    ),
    html.Div(id='output')
])

@app.callback(Output('output', 'children'), [Input('input', 'value')])
def display_output(value):
    return 'You have entered {}'.format(value)


if __name__ == '__main__':
    app.run_server(debug=True)

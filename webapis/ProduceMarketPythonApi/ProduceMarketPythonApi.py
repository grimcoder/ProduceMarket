from flask import render_template, Flask
from flask.ext.api import FlaskAPI
from crossdomain import crossdomain

app = FlaskAPI(__name__)


@app.route('/api/prices')
@crossdomain(origin='*')
def prices():
    pricesList = [
        {
            'ItemName': 'Beet',
            'Price': '6',
            'Id': 6
        },
        {
            'ItemName': 'Cabbage',
            'Price': '4.5',
            'Id': 7
        },
        {
            'ItemName': 'Tomatos',
            'Price': '3',
            'Id': 8
        },
        {
            'ItemName': 'Arguila',
            'Price': '3.5',
            'Id': 9
        },
        {
            'ItemName': 'Eggplant',
            'Price': '2.4',
            'Id': 10
        }
    ]
    return pricesList
    # return [{'hello': 'world'},
    # {'hello': 'world'}]


if __name__ == '__main__':
    app.run('127.0.0.1', 3000)

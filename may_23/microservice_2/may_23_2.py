from flask import Flask, jsonify, request
import requests

app = Flask(__name__)

# Status Codes
status_codes = {
    'OK': 200,
    'CREATED': 201,
    'BAD_REQUEST': 400,
    'NOT_FOUND': 404
}

@app.route('/', methods=['GET'])
def get():
    return jsonify('Welcome to Distributed Systems 2025 MS2 . Atte: Jose')


@app.route('/likesDistributedSystems', methods=['GET'])
def get_likes_distributed_systems():
    # Your implementation goes here
    return ''


if __name__ == '__main__':
    app.run(debug=True, port=4000, host='0.0.0.0')

# USEFUL TO DO NOT WASTE TIME
## If you want to reach the other service, probably the url will be this 'http://microservice1:5000/'

## If you want to call this service from the browser or postman http://localhost:4000/
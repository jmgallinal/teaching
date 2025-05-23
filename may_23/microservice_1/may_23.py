from flask import Flask, jsonify, request

app = Flask(__name__)

# Temporal Fake Data
users = [
    {'name': 'Josefina', 'email': 'jmgallinal@correo.um.edu.uy'},
    {'name': 'Daniel', 'email': 'dcanoniero@example.com'}
]

# Status Codes
status_codes = {
    'OK': 200,
    'CREATED': 201,
    'BAD_REQUEST': 400,
    'NOT_FOUND': 404
}

@app.route('/', methods=['GET'])
def get():
    return jsonify('Welcome to Distributed Systems 2025 MS1 . Atte: Jose')

@app.route('/users', methods=['GET'])
def get_users():
    return jsonify(users)

@app.route('/users/<string:user_email>', methods=['GET'])
def get_user(user_email):
    user = find_user_by_email(user_email)
    if user:
        return jsonify(user), status_codes['CREATED']
    else:
        return jsonify({'Error': 'User not found'}), status_codes['NOT_FOUND']

@app.route('/users', methods=['POST'])
def create_user():
    new_user = request.json
    if not new_user or not 'name' in new_user or not 'email' in new_user:
        return jsonify({'Error: Bad Request'}), status_codes['BAD_REQUEST']

    user = {
        'name': new_user['name'],
        'email': new_user['email']
    }
    users.append(user)
    return jsonify(user), status_codes['CREATED']

# UTILS
def find_user_by_email(user_email):
    for user in users:
        if user['email'] == user_email:
            return user
    return None

if __name__ == '__main__':
    app.run(debug=True, port=5000, host='0.0.0.0')

# USEFUL TO DO NOT WASTE TIME

## If you want to reach the other service, probably the url will be this 'http://microservice2:4000/'
## If you want to call this service from the browser or postman http://localhost:5000/

### Requests
# Get /
# curl -X GET http://127.0.0.1:5000/

# Get users
# curl -X GET http://127.0.0.1:5000/users

# Get user by id
# curl -X GET http://127.0.0.1:5000/users/jmgallinal@correo.um.edu.uy

# Create user
# POST curl -X POST http://127.0.0.1:5000/users \
#     -H "Content-Type: application/json" \
#     -d '{"name": "Josefina", "email": "jgallinal@example.com"}'
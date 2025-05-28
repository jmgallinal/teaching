from flask import Flask, request, jsonify
import pika
import os

app = Flask(__name__)

@app.route('/send', methods=['POST'])
def send_message():
    message = request.json.get('message')
    connection = pika.BlockingConnection(pika.ConnectionParameters(
        host=os.environ['RABBITMQ_HOST'],
        credentials=pika.PlainCredentials(
            os.environ['RABBITMQ_USER'],
            os.environ['RABBITMQ_PASSWORD']
        )
    ))
    channel = connection.channel()
    # Add here your code to send a message with the message received through a queue 
    connection.close()
    return jsonify({'status': 'Distributed Systems message sent', 'message': message}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

# USEFUL
# curl -X POST http://localhost:5000/send -H "Content-Type: application/json" -d '{"message": "Type Here the message you want to send in the Distributed System queue"}'
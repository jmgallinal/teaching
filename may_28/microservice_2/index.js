const amqp = require('amqplib');

async function connect() {
    const rabbitmqHost = process.env.RABBITMQ_HOST || 'localhost';
    const rabbitmqUser = process.env.RABBITMQ_USER || 'guest';
    const rabbitmqPassword = process.env.RABBITMQ_PASSWORD || 'guest';

    for (let i = 0; i < 10; i++) {
        try {
            const connection = await amqp.connect(`amqp://${rabbitmqUser}:${rabbitmqPassword}@${rabbitmqHost}`);
            const channel = await connection.createChannel();
            // Add here your code to read the message
            return;
        } catch (error) {
            console.error('Error al conectar con Rabbit Mq:', error.message);
            await new Promise(resolve => setTimeout(resolve, 2000 * Math.pow(2, i)));
        }
    }
    throw new Error("No se pudo conectar a RabbitMQ tras 10 intentos.");
}

connect().catch(err => console.error(err.message));

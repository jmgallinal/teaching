FROM python:[VERSION]

WORKDIR /app

COPY requirements.txt requirements.txt

RUN pip install --no-cache-dir -r requirements.txt

COPY april_04_2025.py .

EXPOSE [LOCAL PORT]:[VM PORT]

CMD  [WHICH COMMAND WE WANT TO BE EXECUTED]
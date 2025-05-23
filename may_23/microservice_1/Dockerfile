FROM python:latest

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY may_23.py .

EXPOSE 5000:5000

CMD ["python", "may_23.py"]

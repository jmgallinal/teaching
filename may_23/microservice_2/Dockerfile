FROM python:latest

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY may_23_2.py .

EXPOSE 4000:4000

CMD ["python", "may_23_2.py"]
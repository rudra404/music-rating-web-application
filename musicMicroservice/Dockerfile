FROM python:3

WORKDIR /app 

COPY . /app

RUN pip install flask
RUN pip install flask-cors

EXPOSE 5000

CMD ["python", "app.py"]
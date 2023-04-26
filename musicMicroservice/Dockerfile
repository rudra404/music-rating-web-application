FROM python:3

WORKDIR /app 

COPY . /app

RUN pip install flask==2.2.3
RUN pip install flask-cors

EXPOSE 5050

CMD ["python", "app.py"]
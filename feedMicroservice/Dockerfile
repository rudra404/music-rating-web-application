FROM python:3

WORKDIR /app 

COPY . /app

RUN pip install flask==2.2.3
RUN pip install flask-cors
RUN pip install requests==2.28.2

EXPOSE 5051

CMD ["python", "app.py"]
FROM python:3

WORKDIR /app 

COPY . /app

RUN pip install flask==2.2.3
RUN pip install flask-cors
# added gunicorn install for deployment
RUN pip install gunicorn 

#EXPOSE 5050
# add this line to set environment variable
ENV PORT=5050
# update this line to use dynamic port
EXPOSE $PORT 

#CMD ["python", "app.py"]
CMD ["gunicorn", "-b", "0.0.0.0:${PORT}", "app:app"]

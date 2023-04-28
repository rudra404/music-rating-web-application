FROM python:3

WORKDIR /app 

COPY . /app

RUN pip install flask==2.2.3
RUN pip install flask-cors
RUN pip install requests==2.28.2
# added gunicorn install for deployment
RUN pip install gunicorn 

#EXPOSE 5051
# add this line to set environment variable
ENV PORT=5051
# update this line to use dynamic port
EXPOSE $PORT 

#CMD ["python", "app.py"]
# idk if this is correct, will have to try deploying it
CMD ["gunicorn", "-b", "0.0.0.0:${PORT}", "app:app"]
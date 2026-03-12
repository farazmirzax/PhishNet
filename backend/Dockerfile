#A lightweight python package
FROM python:3.10-slim

#working directory inside the container
WORKDIR /app

#Copying the requirements to leverage docker cache
COPY requirements.txt .

#Installing dependencies
RUN pip install --no-cache-dir -r requirements.txt

#Copying the rest of the backend code into the container
COPY . .

#Exposing the port FastAPI runs on
EXPOSE 8000

#FastAPI server starts with Uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
###########
# BUILDER #
###########
FROM python:3.8-slim-buster as compile-image

## install dependencies
RUN apt-get update
RUN apt-get upgrade -y

## virtualenv
ENV VIRTUAL_ENV=/opt/venv
RUN python3 -m venv $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"
RUN pip install --upgrade pip
RUN pip install psycopg2-binary

# install system dependencies
RUN pip install --upgrade pip setuptools && pip install pip-tools

# Location of the source code
ENV INSTALL_PATH /app     
RUN mkdir -p $INSTALL_PATH
WORKDIR $INSTALL_PATH

# Re-install packages
COPY requirements.txt .
RUN pip install -r requirements.txt

#########
# FINAL #
#########
FROM python:3.8-slim-buster

## install dependencies
RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install -y netcat-openbsd gcc

## copy Python dependencies from build image
COPY --from=compile-image /opt/venv /opt/venv

## virtualenv
ENV VIRTUAL_ENV=/opt/venv
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

# create the appropriate directories
ENV INSTALL_PATH /app     
RUN mkdir -p $INSTALL_PATH -p
WORKDIR $INSTALL_PATH

# Copy the current directory into the docker image
COPY . .

## set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV PATH="/opt/venv/bin:$PATH"

EXPOSE 8000

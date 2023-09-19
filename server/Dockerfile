FROM python:3.9.16-alpine3.18

ENV PYTHONUNBUFFERED 1
WORKDIR /app

COPY ./requirements.txt /requirements.txt
COPY ./scripts /scripts
COPY . .
EXPOSE 8000 
ENV PORT=8000
RUN python -m venv /py && \
    /py/bin/pip install --upgrade pip && \
    apk add --update --no-cache postgresql-client && \
    apk add --update --no-cache --virtual .tmp-deps \
    build-base postgresql-dev musl-dev linux-headers && \
    /py/bin/pip install -r ./requirements.txt && \
    apk del .tmp-deps && \
    chmod -R +x /scripts/*

ENV PATH="/scripts:/py/bin:$PATH"


CMD ["run.sh"]
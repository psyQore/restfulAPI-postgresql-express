CREATE DATABASE todo_database;

-- Next step

-- \c todo_database

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);
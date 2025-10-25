CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY;
    name VARCHAR,
    username VARCHAR(18) NOT NULL,
    password_hash VARCHAR NOT NULL,
    email VARCHAR,
    birthdate DATE,
    notify BOOLEAN
);
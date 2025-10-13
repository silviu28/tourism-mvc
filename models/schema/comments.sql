CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    comment VARCHAR(512),
    date DATE,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
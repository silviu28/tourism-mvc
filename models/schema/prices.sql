CREATE TABLE prices (
	id INT AUTO_INCREMENT PRIMARY KEY,
    country VARCHAR(50) NOT NULL,
    is_available BOOLEAN,
    host VARCHAR(50) NOT NULL,
    price_lower NUMERIC NOT NULL,
    price_upper NUMERIC
);
-- Create the database
CREATE DATABASE eats_in_reach_db;

-- Connect to the newly created database
\c eats_in_reach_db;

-- Create the Restaurants table
CREATE TABLE Restaurants (
    restaurant_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    price_range VARCHAR(50),
    hours_of_operation VARCHAR(255),
    is_open BOOLEAN NOT NULL DEFAULT FALSE,
    description TEXT
);

-- Create the Food_Types table
CREATE TABLE Food_Types (
    food_type_id SERIAL PRIMARY KEY,
    type_name VARCHAR(100) NOT NULL
);

-- Create the Restaurant_Food_Types junction table
CREATE TABLE Restaurant_Food_Types (
    restaurant_id INTEGER REFERENCES Restaurants(restaurant_id) ON DELETE CASCADE,
    food_type_id INTEGER REFERENCES Food_Types(food_type_id) ON DELETE CASCADE,
    PRIMARY KEY (restaurant_id, food_type_id)
);

-- Create the Photo_Types table
CREATE TABLE Photo_Types (
    photo_type_id SERIAL PRIMARY KEY,
    type_name VARCHAR(100) NOT NULL
);

-- Insert predefined photo types
INSERT INTO Photo_Types (type_name)
VALUES
    ('Menu'),
    ('Food'),
    ('Restaurant');

-- Create the Restaurant_Pictures table
CREATE TABLE Restaurant_Pictures (
    picture_id SERIAL PRIMARY KEY,
    restaurant_id INTEGER REFERENCES Restaurants(restaurant_id) ON DELETE CASCADE,
    photo_type_id INTEGER REFERENCES Photo_Types(photo_type_id),
    image_url VARCHAR(255) NOT NULL,
    alt_text VARCHAR(255)
);

-- Create the Price_Ranges table (Optional)
CREATE TABLE Price_Ranges (
    price_range_id SERIAL PRIMARY KEY,
    range VARCHAR(50) NOT NULL
);

CREATE TABLE Vendor_Submissions (
    submission_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    price_range TEXT NOT NULL,
    food_type TEXT NOT NULL,
    hours_of_operation TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status TEXT DEFAULT 'pending'
);


-- Optional: Insert predefined price ranges
INSERT INTO Price_Ranges (range)
VALUES
    ('$'),
    ('$$'),
    ('$$$'),
    ('$$$$');


------ DUMMY DATA -----
-- Insert dummy data into the Restaurants table
INSERT INTO Restaurants (name, location, price_range, hours_of_operation, is_open, description)
VALUES
    ('Pasta Palace', '123 Main St, Merced, CA', '$$', '11:00 AM - 10:00 PM', TRUE, 'A cozy Italian restaurant specializing in homemade pasta.'),
    ('Sushi Central', '456 Elm St, Merced, CA', '$$$', '12:00 PM - 11:00 PM', FALSE, 'Fresh sushi and sashimi with a modern twist.');

-- Insert dummy data into the Food_Types table
INSERT INTO Food_Types (type_name)
VALUES
    ('Italian'),
    ('Japanese');

-- Insert dummy data into the Restaurant_Food_Types table
INSERT INTO Restaurant_Food_Types (restaurant_id, food_type_id)
VALUES
    (1, 1),  -- Pasta Palace serves Italian food
    (2, 2);  -- Sushi Central serves Japanese food

-- Insert dummy data into the Restaurant_Pictures table
INSERT INTO Restaurant_Pictures (restaurant_id, photo_type_id, image_url, alt_text)
VALUES
    (1, 1, 'https://st3.depositphotos.com/1807998/37163/v/1600/depositphotos_371630846-stock-illustration-art-pizza-menu-design-big.jpg', 'Menu at Pasta Palace'),
    (1, 2, 'https://media.licdn.com/dms/image/C4E12AQHQPPSfVtjeJQ/article-cover_image-shrink_720_1280/0/1557238718742?e=2147483647&v=beta&t=IQLUyEnZBq_0DSHf0KxBi-b4uwubHAGzpfRES0AGY10', 'Signature pasta dish at Pasta Palace'),
    (2, 1, 'https://cdn.shopify.com/s/files/1/1568/8443/products/mv6_es_dad_layout_core_vertical_sushi-menu-chart-wall-art.webp?v=1716388788&width=900', 'Menu at Sushi Central'),
    (2, 2, 'https://i.pinimg.com/736x/cc/f3/a7/ccf3a7ccd98bb3413b32269b42381aeb.jpg', 'Fresh sashimi platter at Sushi Central');

-- Insert dummy data into the Price_Ranges table (if used)
INSERT INTO Price_Ranges (range)
VALUES
    ('$$'),
    ('$$$');


-- DROP DATABASE eats_in_reach_db;
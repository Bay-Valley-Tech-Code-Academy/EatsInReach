-- Create the database
CREATE DATABASE eats_in_reach_db;

-- Connect to the newly created database
\c eats_in_reach_db;

-- Create the Restaurants table with phone number and email
CREATE TABLE Restaurants (
    restaurant_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    price_range VARCHAR(50),
    hours_of_operation VARCHAR(255),
    is_open BOOLEAN NOT NULL DEFAULT FALSE,
    description TEXT,
    phone_number VARCHAR(15),
    email VARCHAR(255)
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

CREATE TABLE Restaurant_Food_Items (
    restaurant_id INTEGER REFERENCES Restaurants(restaurant_id) ON DELETE CASCADE,
    item_name VARCHAR(255) NOT NULL,
    item_desc VARCHAR(255) NOT NULL,
    image_path BLOB NOT NULL,
    alt_text VARCHAR(255)
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

-- Create the Vendor_Submissions table with phone number and email
CREATE TABLE Vendor_Submissions (
    submission_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    price_range TEXT NOT NULL,
    food_type TEXT NOT NULL,
    hours_of_operation TEXT NOT NULL,
    description TEXT,
    phone_number VARCHAR(15),
    email VARCHAR(255),
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
INSERT INTO Restaurants (name, location, price_range, hours_of_operation, is_open, description, phone_number, email)
VALUES
    ('Pasta Palace', '123 Main St, Merced, CA', '$$', '11:00 AM - 10:00 PM', TRUE, 'A cozy Italian restaurant specializing in homemade pasta.', '209-555-1111', 'contact@pastapalace.com'),
    ('Sushi Central', '456 Elm St, Merced, CA', '$$$', '12:00 PM - 11:00 PM', FALSE, 'Fresh sushi and sashimi with a modern twist.', '209-555-2222', 'info@sushicentral.com'),
    ('Burger Bonanza', '789 Oak St, Merced, CA', '$', '10:00 AM - 8:00 PM', TRUE, 'The best burgers in town with secret sauces.', '209-555-1234', 'info@burgerbonanza.com'),
    ('Taco Town', '987 Maple Ave, Merced, CA', '$$', '9:00 AM - 9:00 PM', TRUE, 'Authentic Mexican tacos made fresh daily.', '209-555-9876', 'contact@tacotown.com'),
    ('Steak House', '321 Pine St, Merced, CA', '$$$$', '5:00 PM - 11:00 PM', FALSE, 'Fine dining steakhouse with premium cuts.', '209-555-6543', 'reservations@steakhouse.com');

-- Insert dummy data into the Food_Types table
INSERT INTO Food_Types (type_name)
VALUES
    ('Italian'),
    ('Japanese'),
    ('American'),
    ('Mexican'),
    ('Steakhouse');

-- Insert dummy data into the Restaurant_Food_Types table
INSERT INTO Restaurant_Food_Types (restaurant_id, food_type_id)
VALUES
    (1, 1),  -- Pasta Palace serves Italian food
    (2, 2),  -- Sushi Central serves Japanese food
    (3, 3),  -- Burger Bonanza serves American food
    (4, 4),  -- Taco Town serves Mexican food
    (5, 5);  -- Steak House serves Steakhouse food

-- Insert dummy data into the Restaurant_Pictures table
INSERT INTO Restaurant_Pictures (restaurant_id, photo_type_id, image_url, alt_text)
VALUES
    (1, 1, 'https://st3.depositphotos.com/1807998/37163/v/1600/depositphotos_371630846-stock-illustration-art-pizza-menu-design-big.jpg', 'Menu at Pasta Palace'),
    (1, 2, 'https://media.licdn.com/dms/image/C4E12AQHQPPSfVtjeJQ/article-cover_image-shrink_720_1280/0/1557238718742?e=2147483647&v=beta&t=IQLUyEnZBq_0DSHf0KxBi-b4uwubHAGzpfRES0AGY10', 'Signature pasta dish at Pasta Palace'),
    (2, 1, 'https://cdn.shopify.com/s/files/1/1568/8443/products/mv6_es_dad_layout_core_vertical_sushi-menu-chart-wall-art.webp?v=1716388788&width=900', 'Menu at Sushi Central'),
    (2, 2, 'https://i.pinimg.com/736x/cc/f3/a7/ccf3a7ccd98bb3413b32269b42381aeb.jpg', 'Fresh sashimi platter at Sushi Central'),
    (3, 1, 'https://example.com/burger-bonanza-menu.jpg', 'Menu at Burger Bonanza'),
    (3, 2, 'https://example.com/burger-bonanza-burger.jpg', 'Signature burger at Burger Bonanza'),
    (4, 1, 'https://example.com/taco-town-menu.jpg', 'Menu at Taco Town'),
    (4, 2, 'https://example.com/taco-town-tacos.jpg', 'Fresh tacos at Taco Town'),
    (5, 1, 'https://example.com/steak-house-menu.jpg', 'Menu at Steak House'),
    (5, 2, 'https://example.com/steak-house-steak.jpg', 'Premium steak dish at Steak House');

-- Insert dummy data into the Vendor_Submissions table
INSERT INTO Vendor_Submissions (name, location, price_range, food_type, hours_of_operation, description, phone_number, email, image_url)
VALUES
    ('Tasty Thai', 'Meow St, Merced, CA', '$', 'Thai', '10:00 AM - 8:00 PM', 'The thai is good.', '209-209-2009', 'info@tastythai.com', 'https://example.com/tasty-thai.jpg'),


-- DROP DATABASE eats_in_reach_db;
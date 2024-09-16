-- Create the database
CREATE DATABASE eats_in_reach_db;

-- Connect to the newly created database
\c eats_in_reach_db;

-- Create the Food_Types table (removed description column)
CREATE TABLE Food_Types (
    food_type_id SERIAL PRIMARY KEY,
    type_name VARCHAR(100) NOT NULL
);

-- Create the Price_Ranges table (Optional)
CREATE TABLE Price_Ranges (
    price_range_id SERIAL PRIMARY KEY,
    range VARCHAR(50) NOT NULL
);


-- Create the Restaurants table with phone number and email (modified)
CREATE TABLE Restaurants (
    restaurant_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    price_range_id VARCHAR(50),
    hours_of_operation VARCHAR(255),
    is_open BOOLEAN NOT NULL DEFAULT FALSE,
    description TEXT,
    food_type_id INTEGER REFERENCES Food_Types(food_type_id),
    average_rating DECIMAL(3,2),
    total_reviews INTEGER DEFAULT 0,
    website VARCHAR(255),
    phone_number VARCHAR(20),
    email VARCHAR(255)
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

-- Create the Restaurant_Pictures table
CREATE TABLE Restaurant_Pictures (
    picture_id SERIAL PRIMARY KEY,
    restaurant_id INTEGER REFERENCES Restaurants(restaurant_id) ON DELETE CASCADE,
    photo_type_id INTEGER REFERENCES Photo_Types(photo_type_id),
    image_url VARCHAR(255) NOT NULL,
    alt_text VARCHAR(255)
);

-- Create the Vendor_Submissions table
CREATE TABLE Vendor_Submissions (
    submission_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    price_range_id INTEGER NOT NULL,
    food_type_id INTEGER NOT NULL,
    hours_of_operation TEXT NOT NULL,
    description TEXT,
    phone_number VARCHAR(15),
    email VARCHAR(255),
    image_url TEXT,
    submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (price_range_id) REFERENCES Price_Ranges(price_range_id),
    FOREIGN KEY (food_type_id) REFERENCES Food_Types(food_type_id)
);

-- Create the Menus table
CREATE TABLE Menus (
    menu_id SERIAL PRIMARY KEY,
    restaurant_id INTEGER REFERENCES Restaurants(restaurant_id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT
);

-- Create the Menu_Items table
CREATE TABLE Menu_Items (
    item_id SERIAL PRIMARY KEY,
    menu_id INTEGER REFERENCES Menus(menu_id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    is_vegetarian BOOLEAN DEFAULT FALSE,
    is_vegan BOOLEAN DEFAULT FALSE,
    is_gluten_free BOOLEAN DEFAULT FALSE
);

-- Create the Users table
CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the Favorites table
CREATE TABLE Favorites (
    user_id INTEGER REFERENCES Users(user_id) ON DELETE CASCADE,
    restaurant_id INTEGER REFERENCES Restaurants(restaurant_id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, restaurant_id)
);

-- Create the Dietary_Restrictions table
CREATE TABLE Dietary_Restrictions (
    restriction_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT
);

-- Create the Restaurant_Dietary_Options table
CREATE TABLE Restaurant_Dietary_Options (
    restaurant_id INTEGER REFERENCES Restaurants(restaurant_id) ON DELETE CASCADE,
    restriction_id INTEGER REFERENCES Dietary_Restrictions(restriction_id) ON DELETE CASCADE,
    PRIMARY KEY (restaurant_id, restriction_id)
);

-- Insert predefined price ranges
INSERT INTO Price_Ranges (range)
VALUES
    ('$'),
    ('$$'),
    ('$$$'),
    ('$$$$');

-- Insert predefined photo types
INSERT INTO Photo_Types (type_name)
VALUES
    ('Menu'),
    ('Food'),
    ('Restaurant');

-- Insert dummy data into the Food_Types table
INSERT INTO Food_Types (type_name) VALUES
    ('American'),
    ('Argentinian'),
    ('Brazilian'),
    ('British'),
    ('Caribbean'),
    ('Cajun'),
    ('Chinese'),
    ('Colombian'),
    ('Cuban'),
    ('Ethiopian'),
    ('Filipino'),
    ('French'),
    ('German'),
    ('Greek'),
    ('Indian'),
    ('Italian'),
    ('Japanese'),
    ('Korean'),
    ('Lebanese'),
    ('Mediterranean'),
    ('Mexican'),
    ('Middle Eastern'),
    ('Moroccan'),
    ('Peruvian'),
    ('Polish'),
    ('Portuguese'),
    ('Russian'),
    ('Spanish'),
    ('Sri Lankan'),
    ('Steakhouse'),
    ('Thai'),
    ('Turkish'),
    ('Ukrainian'),
    ('Vietnamese');


-- Insert dummy data into the Restaurants table
INSERT INTO Restaurants (name, location, price_range_id, hours_of_operation, is_open, description, food_type_id, average_rating, total_reviews, website, phone_number, email)
VALUES
    ('Pasta Palace', '123 Main St, Merced, CA', 2, '11:00 AM - 10:00 PM', TRUE, 'A cozy Italian restaurant specializing in homemade pasta.', 1, 4.2, 50, 'www.pastapalace.com','209-555-1111', 'contact@pastapalace.com'),
    ('Sushi Central', '456 Elm St, Merced, CA', 3, '12:00 PM - 11:00 PM', FALSE, 'Fresh sushi and sashimi with a modern twist.', 2, 4.5, 75, 'www.sushicentral.com', '209-555-2222', 'info@sushicentral.com'),
    ('Burger Bonanza', '789 Oak St, Merced, CA', 1, '10:00 AM - 8:00 PM', TRUE, 'The best burgers in town with secret sauces.',2, 4.5, 75, 'www.sushicentral.com', '209-555-1234', 'info@burgerbonanza.com'),
    ('Taco Town', '987 Maple Ave, Merced, CA', 2, '9:00 AM - 9:00 PM', TRUE, 'Authentic Mexican tacos made fresh daily.',2, 4.5, 75, 'www.sushicentral.com', '209-555-9876', 'contact@tacotown.com'),
    ('Steak House', '321 Pine St, Merced, CA', 4, '5:00 PM - 11:00 PM', FALSE, 'Fine dining steakhouse with premium cuts.',2, 4.5, 75, 'www.sushicentral.com', '209-555-6543', 'reservations@steakhouse.com');

-- Insert dummy data into the Restaurant_Food_Types table
INSERT INTO Restaurant_Food_Types (restaurant_id, food_type_id)
VALUES
    (1, 16),  -- Pasta Palace serves Italian food
    (2, 17),  -- Sushi Central serves Japanese food
    (3, 1),  -- Burger Bonanza serves American food
    (4, 21),  -- Taco Town serves Mexican food
    (5, 30);  -- Steak House serves Steakhouse food

-- Insert dummy data into the Restaurant_Pictures table
INSERT INTO Restaurant_Pictures (restaurant_id, photo_type_id, image_url, alt_text)
VALUES
    (1, 1, 'pizza-menu.jpg', 'Menu at Pasta Palace'),
    (1, 2, 'pizza-2.jpg', 'Signature pasta dish at Pasta Palace'),
    (2, 1, 'sushi-menu.jpg', 'Menu at Sushi Central'),
    (2, 2, 'sushi-1.jpg', 'Fresh sashimi platter at Sushi Central'),
    (3, 1, 'burger-menu.jpg', 'Menu at Burger Bonanza'),
    (3, 2, 'burger-1.jpg', 'Signature burger at Burger Bonanza'),
    (4, 1, 'taco-menu.jpg', 'Menu at Taco Town'),
    (4, 2, 'taco-1.jpg', 'Fresh tacos at Taco Town'),
    (5, 1, 'steak-menu.jpg', 'Menu at Steak House'),
    (5, 2, 'steak-1.jpg', 'Premium steak dish at Steak House');

-- Insert dummy data into the Vendor_Submissions table
INSERT INTO Vendor_Submissions (name, location, price_range_id, food_type_id, hours_of_operation, description, phone_number, email)
VALUES
    ('Tasty Thai', 'Meow St, Merced, CA', 1, 31, '10:00 AM - 8:00 PM', 'The thai is good.', '209-209-2009', 'info@tastythai.com');

INSERT INTO Menus (restaurant_id, name, description)
VALUES
    (1, 'Lunch', 'Weekday lunch specials'),
    (1, 'Dinner', 'Evening fine dining experience'),
    (2, 'All Day', 'Our full menu, available all day');

INSERT INTO Menu_Items (menu_id, name, description, price, is_vegetarian, is_vegan, is_gluten_free)
VALUES
    (1, 'Caesar Salad', 'Crisp romaine, croutons, parmesan', 8.99, true, false, false),
    (1, 'Margherita Pizza', 'Fresh mozzarella, tomatoes, basil', 12.99, true, false, false),
    (2, 'Filet Mignon', '8oz, garlic mashed potatoes, asparagus', 29.99, false, false, true),
    (3, 'Vegan Buddha Bowl', 'Quinoa, roasted vegetables, tahini dressing', 14.99, true, true, true);

INSERT INTO Users (username, email)
VALUES
    ('foodie123', 'foodie123@email.com'),
    ('tasteexplorer', 'taste@email.com');

INSERT INTO Favorites (user_id, restaurant_id)
VALUES (1, 2), (2, 1);

INSERT INTO Dietary_Restrictions (name, description)
VALUES
    ('Vegetarian', 'No meat or fish'),
    ('Vegan', 'No animal products'),
    ('Gluten-Free', 'No gluten-containing ingredients');

INSERT INTO Restaurant_Dietary_Options (restaurant_id, restriction_id)
VALUES (1, 1), (1, 3), (2, 1), (2, 2);

CREATE TABLE Favorite_Restaurants (
    restaurant_id SERIAL PRIMARY KEY,
    restaurant_name VARCHAR(255) NOT NULL,
    favorited BOOLEAN DEFAULT 
);

CREATE TABLE User_Info (

)

-- Uncomment to drop the database (use with caution)
-- DROP DATABASE eats_in_reach_db;

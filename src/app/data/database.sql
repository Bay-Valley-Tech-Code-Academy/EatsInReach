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

-- Create the Vendor_Items table
CREATE TABLE Vendor_Items (
    item_id SERIAL PRIMARY KEY,
    restaurant_id INTEGER REFERENCES Restaurants(restaurant_id) ON DELETE CASCADE,
    item_name VARCHAR(255) NOT NULL,
    item_desc VARCHAR(255) NOT NULL,
    item_price DECIMAL(10, 2) NOT NULL,
    image_path VARCHAR(255) NOT NULL,
    alt_text VARCHAR(255)
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
    ('Food'), -- Pops up on Restaurant search page
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
    ('Tonis Courtyard Cafe', '516 W 18th St, Merced, CA', 2, '7:30 AM - 3:00 PM', TRUE, 'Featuring an extensive menu of casual Italian-inspired American eats & an idyllic courtyard patio.', 1, 4.6, 704, 'http://www.toniscourtyardcafe.com/','209-384-2580', 'contact@example.com'),
    ('Joystiq', '325 W Main St, Merced, CA', 2, '3:00 PM - 12:00 AM', TRUE, 'Experience great vibes and nostalgia at one of the best bars in town, featuring old arcade games, fantastic drinks, and lively music.', 1, 4.3, 206, 'http://www.joystiqmerced.com/', '209-455-3300', 'joystiqmerced@gmail.com'),
    ('Kind Neighbor', '1635 M St, Merced, CA', 2, '7:30 AM - 6:00 PM', TRUE, 'Enjoy one of the best smoothies ever, like our refreshing strawberry smoothie with almond milk, for a delicious treat worth the wait.',1, 4.7, 49, 'http://www.kindneighborjuicebar.com/', '209-617-6538', 'kindneighborinfo@gmail.com'),
    ('Oishi Teri Sushi Bar', '235 W Main St, Merced, CA', 2, '11:00 AM - 8:00 PM', TRUE, 'Enduring, spacious eatery preparing traditional Thai staples & some Vietnamese options in calm digs.', 17, 4.3, 599, 'http://www.oishisushibar.com', '209-653-5859', 'contact@example.com'),
    ('El Palmar Taqueria', '1127 Martin Luther King Jr Way, Merced, CA', 2, '10:00 AM - 9:00 PM', TRUE, 'Enjoy some of the best Mexican food in a relaxed atmosphere with reasonable prices',21, 4.2, 364, 'http://www.elpalmartaqueria.com/', '209-726-8855', 'contact@example.com');

-- Insert dummy data into the Restaurant_Food_Types table
INSERT INTO Restaurant_Food_Types (restaurant_id, food_type_id)
VALUES
    (1, 1),  -- Courtyard Cafe serves American
    (2, 1),  -- Joystiq serves American
    (3, 1),  -- Kind Neighbor serves American food
    (4, 17),  -- Oishi Teri serves Japanese
    (5, 21);  -- El Palmar serves Mexican

-- Insert dummy data into the Restaurant_Pictures table
INSERT INTO Restaurant_Pictures (restaurant_id, photo_type_id, image_url, alt_text)
VALUES
    (1, 1, 'toni.jpg', 'Toni Courtyard Cafe'), -- Restaurant Building
    (1, 2, 'toni_burger.jpg', 'Bacon Hamburger'), -- Food
    (1, 1, 'toni_avo.jpg', 'Strawberry French Toast'), -- Menu Item
    (1, 1, 'toni_toast.jpg', 'Avocado Toast'), -- Menu Item
    (2, 1, 'joy2.jpg', 'Joystiq'), -- Restaurant Building
    (2, 2, 'joy_burger.jpg', 'Burger'), -- Food
    (2, 1, 'joy_salad.jpg', 'Salad'), -- Menu Item
    (2, 1, 'joy_moz.jpg', 'Mozzarella Sticks'), -- Menu Item
    (3, 1, 'kind.jpg', 'Kind Neighbor'), -- Restaurant Building
    (3, 2, 'kind_bowl.jpg', 'Acai Bowl'), -- Food
    (3, 1, 'kind_toast.jpg', 'Avocado Toast'), -- Menu Item
    (3, 1, 'kind_oats.jpg', 'Overnight Oats'), -- Menu Item
    (4, 1, 'oishi.jpg', 'Oishi Teri Sushi Bar'), -- Restaurant Building
    (4, 2, 'oishi_sashimi.jpg', 'Sashimi'), -- Food
    (4, 1, 'oishi_heart.jpg', 'Sushi Heart'), -- Menu Item
    (4, 1, 'oishi_shrimp.jpg', 'Shrimp Head Sushi'), -- Menu Item
    (5, 1, 'elpalmar.jpg', 'El Palmar Taqueria'), -- Restaurant Building
    (5, 2, 'tac_bur.jpg', 'Wet Burrito'), -- Food
    (5, 1, 'tac_nacho.jpg', 'Nachos'), -- Menu Item
    (5, 1, 'tac_torta.jpg', 'Torta'); -- Menu Item


-- Insert dummy data into the Vendor_Submissions table
-- Insert dummy data into the Vendor_Submissions table
INSERT INTO Vendor_Submissions (name, location, price_range_id, food_type_id, hours_of_operation, description, phone_number, email)
VALUES
    ('Native Son', '609 W Main St, Merced, CA', 2, 1, '6:00 AM - 10:00 PM', 'New American cafe.', '209-446-4027', 'Reservations@ElCapitanHotelMerced.com');

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
-- Insert dummy data into the Vendor_Items table
INSERT INTO Vendor_Items (restaurant_id, item_name, item_desc, item_price, image_path, alt_text)
VALUES
    (1, 'Spaghetti Carbonara', 'Classic Italian pasta with creamy sauce.', 12.99, 'spaghetti-carbonara.jpg', 'Spaghetti Carbonara at Pasta Palace'),
    (2, 'Salmon Sashimi', 'Freshly sliced salmon sashimi.', 15.99, 'salmon-sashimi.jpg', 'Salmon Sashimi at Sushi Central');

-- Uncomment to drop the database (use with caution)
-- -- DROP DATABASE eats_in_reach_db;

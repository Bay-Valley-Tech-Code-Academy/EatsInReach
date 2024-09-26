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

-- Create the Users table
CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    uid VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(6) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the Vendor_Submissions table
CREATE TABLE Vendor_Submissions (
    submission_id SERIAL PRIMARY KEY,
    uid VARCHAR(255) REFERENCES Users(uid) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    hours_of_operation VARCHAR(255),
    description TEXT,
    website VARCHAR(255),
    phone_number VARCHAR(20),
    email VARCHAR(255),
    price_range_id INTEGER NOT NULL,
    food_type_id INTEGER NOT NULL,
    FOREIGN KEY (price_range_id) REFERENCES Price_Ranges(price_range_id),
    FOREIGN KEY (food_type_id) REFERENCES Food_Types(food_type_id),
    submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the Restaurants table with phone number and email (modified)
CREATE TABLE Restaurants (
    restaurant_id SERIAL PRIMARY KEY,
    uid VARCHAR(255) REFERENCES Users(uid) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    hours_of_operation VARCHAR(255),
    description TEXT,
    website VARCHAR(255),
    phone_number VARCHAR(20),
    email VARCHAR(255),
    price_range_id INTEGER NOT NULL,
    food_type_id INTEGER REFERENCES Food_Types(food_type_id),
    is_open BOOLEAN NOT NULL DEFAULT FALSE
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

CREATE TABLE Vendor_Restaurant_Pictures (
    id SERIAL PRIMARY KEY,
    uid VARCHAR(255) REFERENCES Users(uid) ON DELETE CASCADE,
    photo_type_id INT REFERENCES Photo_Types(photo_type_id),
    image_url TEXT NOT NULL,
    alt_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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

-- Create the Favorites table
CREATE TABLE Favorites (
    uid VARCHAR(255) REFERENCES Users(uid) ON DELETE CASCADE,
    restaurant_id INTEGER REFERENCES Restaurants(restaurant_id) ON DELETE CASCADE,
    PRIMARY KEY (uid, restaurant_id)
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

-- Create a new table for vendor submission images
CREATE TABLE Vendor_Submission_Images (
    image_id SERIAL PRIMARY KEY,
    submission_id INTEGER REFERENCES Vendor_Submissions(submission_id) ON DELETE CASCADE,
    photo_type_id INTEGER REFERENCES Photo_Types(photo_type_id),
    image_url TEXT NOT NULL
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
    ('Restaurant'),
    ('Display');

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



INSERT INTO Restaurants (name, location, price_range_id, hours_of_operation, is_open, description, food_type_id, website, phone_number, email)
VALUES
    ('Tonis Courtyard Cafe', '516 W 18th St, Merced, CA', 2, '7:30 AM - 3:00 PM', TRUE, 'Featuring an extensive menu of casual Italian-inspired American eats & an idyllic courtyard patio.', 1, 'http://www.toniscourtyardcafe.com/','209-384-2580', 'contact@example.com'),
    ('Joystiq', '325 W Main St, Merced, CA', 3, '3:00 PM - 12:00 AM', TRUE, 'Experience great vibes and nostalgia at one of the best bars in town, featuring old arcade games, fantastic drinks, and lively music.', 1,  'http://www.joystiqmerced.com/', '209-455-3300', 'joystiqmerced@gmail.com'),
    ('Kind Neighbor', '1635 M St, Merced, CA', 2, '7:30 AM - 6:00 PM', TRUE, 'Enjoy one of the best smoothies ever, like our refreshing strawberry smoothie with almond milk, for a delicious treat worth the wait.', 1, 'http://www.kindneighborjuicebar.com/', '209-617-6538', 'kindneighborinfo@gmail.com'),
    ('Oishi Teri Sushi Bar', '235 W Main St, Merced, CA', 4, '11:00 AM - 8:00 PM', TRUE, 'Enduring, spacious eatery preparing traditional Thai staples & some Vietnamese options in calm digs.', 17, 'http://www.oishisushibar.com', '209-653-5859', 'contact@example.com'),
    ('El Palmar Taqueria', '1127 Martin Luther King Jr Way, Merced, CA', 1, '10:00 AM - 9:00 PM', TRUE, 'Enjoy some of the best Mexican food in a relaxed atmosphere with reasonable prices', 21, 'http://www.elpalmartaqueria.com/', '209-726-8855', 'contact@example.com');


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
    (1, 4, 'https://utfs.io/f/TnfuvTEmVxjlck1916M2BxEX4gp9VPDHA36Trh8aUvOY7zCs', 'Toni Courtyard Cafe'), -- Restaurant Building
    (1, 2, 'https://utfs.io/f/TnfuvTEmVxjlInrtm52apk34Q7E8uxyASnJPMFIRsGU5bjcq', 'Bacon Hamburger'), -- Food
    (1, 3, 'https://utfs.io/f/TnfuvTEmVxjlhtRKBb6qKOM2H9kBCzda7buYc4g3DmJ5xLXv', 'Strawberry French Toast'), -- Menu Item
    (1, 3, 'https://utfs.io/f/TnfuvTEmVxjl1FtkoY0vkWRAzO9Y2jL5eDi8md1VI370QxnT', 'Avocado Toast'), -- Menu Item
    (2, 4, 'https://utfs.io/f/TnfuvTEmVxjlyPXQfYDHhsbgP0vlOBIMWmEpy47rAJcGFfRk', 'Joystiq'), -- Restaurant Building
    (2, 2, 'https://utfs.io/f/TnfuvTEmVxjlCPescbntgdci7ymOo2TqsBznkIPx4w5tE0uJ', 'Burger'), -- Food
    (2, 3, 'https://utfs.io/f/TnfuvTEmVxjlbYYhoBakm8yxDQ2zjXVK9tcIu0lpLiE6Y7qB', 'Salad'), -- Menu Item
    (2, 3, 'https://utfs.io/f/TnfuvTEmVxjlZz4bNykTB7r6NOijlVQRg2cA03qxX5aUYTfz', 'Mozzarella Sticks'), -- Menu Item
    (3, 4, 'https://utfs.io/f/TnfuvTEmVxjl0l8UBuqEZ9v5FejB6oSg1MqUtTHkAzJibs8Y', 'Kind Neighbor'), -- Restaurant Building
    (3, 2, 'https://utfs.io/f/TnfuvTEmVxjlgiXd7tBy3G7qojHwPSJmlOY4LDbXQ08Ud16a', 'Acai Bowl'), -- Food
    (3, 3, 'https://utfs.io/f/TnfuvTEmVxjl9OryBwlIeQupKIDmfM8nCXlidcw3vHVbNSBT', 'Avocado Toast'), -- Menu Item
    (3, 3, 'https://utfs.io/f/TnfuvTEmVxjlpTaT7M25KW7g1TMRV9vGABShrJzekdE0DCmI', 'Overnight Oats'), -- Menu Item
    (4, 4, 'https://utfs.io/f/TnfuvTEmVxjl2HEoDoGMbIEUYnsuAjNdxG1SViXq6pFgmeKT', 'Oishi Teri Sushi Bar'), -- Restaurant Building
    (4, 2, 'https://utfs.io/f/TnfuvTEmVxjlaY4TjEOW4Mo9jEqKlJRn1gfb8De0PVZGsuc2', 'Sashimi'), -- Food
    (4, 3, 'https://utfs.io/f/TnfuvTEmVxjla9FHYJOW4Mo9jEqKlJRn1gfb8De0PVZGsuc2', 'Sushi Heart'), -- Menu Item
    (4, 3, 'https://utfs.io/f/TnfuvTEmVxjlgC6DftBy3G7qojHwPSJmlOY4LDbXQ08Ud16a', 'Shrimp Head Sushi'), -- Menu Item
    (5, 4, 'https://utfs.io/f/TnfuvTEmVxjlaF7WYTOW4Mo9jEqKlJRn1gfb8De0PVZGsuc2', 'El Palmar Taqueria'), -- Restaurant Building
    (5, 2, 'https://utfs.io/f/TnfuvTEmVxjlOGKBa2nRnS8w5sUrlh73XzKe2jafgVbqPyJt', 'Wet Burrito'), -- Food
    (5, 3, 'https://utfs.io/f/TnfuvTEmVxjl31i0Lm4UbSKvmQr8spuFqhCjN2knDeW5Lyl3', 'Nachos'), -- Menu Item
    (5, 3, 'https://utfs.io/f/TnfuvTEmVxjlUafMQdy9CMir73AItu2pD6oZfkPF0zy1cUOH', 'Torta'); -- Menu Item



INSERT INTO Menus (restaurant_id, name, description)
VALUES
    (1, 'Specialty Sandwiches', 'Served with Salad, Potato Salad or French fries'),
    (1, 'Organic Salads', 'Served with choice of Dressing and Freshly Baked Bread & Butter');

INSERT INTO Menu_Items (menu_id, name, description, price, is_vegetarian, is_vegan, is_gluten_free)
VALUES
    (1, 'MEDITERRANEAN GRILLED CHICKEN', 'Sundried tomatoes, feta, spinach, pesto mayo on homemade focaccia bread', 14.00, false, false, false),
    (1, 'TRI TIP', 'Our house smoked tri tip sauteed mushrooms, caramelized onions, swiss, mayo on french bread', 14.00, false, false, false),
    (2, 'COURTYARD SALAD', 'mixed greens with apples, cranberries, tomatoes, blue cheese crumbles and candied walnuts', 12.00, true, false, false);

INSERT INTO Dietary_Restrictions (name, description)
VALUES
    ('Vegetarian', 'No meat or fish'),
    ('Vegan', 'No animal products'),
    ('Gluten-Free', 'No gluten-containing ingredients');

INSERT INTO Restaurant_Dietary_Options (restaurant_id, restriction_id)
VALUES (1, 1);

-- Uncomment to drop the database (use with caution)
--  DROP DATABASE eats_in_reach_db;

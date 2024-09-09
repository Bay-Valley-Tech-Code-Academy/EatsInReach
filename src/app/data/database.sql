CREATE DATABASE eats_in_reach_db;


-- Connect to the newly created database
\c eats_in_reach_db;


-- Create the table
CREATE TABLE eats_in_reach_table(
    id SERIAL PRIMARY KEY,
    description TEXT,
    category TEXT
);


INSERT INTO eats_in_reach_table (description, category)
VALUES
    ('Item 1 description', 'Category A'),
    ('Item 2 description', 'Category B'),
    ('Item 3 description', 'Category C');
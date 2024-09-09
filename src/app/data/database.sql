CREATE DATABASE rural_eats_db;


-- Connect to the newly created database
\c my_database;


-- Create the table
CREATE TABLE rural_table(
    id SERIAL PRIMARY KEY,
    description TEXT,
    category TEXT
);


INSERT INTO rural_table (description, category)
VALUES
    ('Item 1 description', 'Category A'),
    ('Item 2 description', 'Category B'),
    ('Item 3 description', 'Category C');
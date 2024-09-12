[Prerequisites](doc:EatsInReach#prerequisites) |
[Setup](doc:EatsInReach#setup)

## PREREQUISITES

### Windows

1. Install [PostgreSQL 15.8](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads). (Uncheck 'Stack builder' and 'pgAdmin' when installing, we don't need those.)
2. After installation, open your Command Prompt and type `psql`.

- If `psql` is not recognized, then open your environment variables, and add `C:\Program Files\PostgreSQL\15\lib` and `C:\Program Files\PostgreSQL\15\bin` to your system variables PATH.
- [Follow this tutorial to access and edit the environment variables.](https://www.c-sharpcorner.com/article/how-to-addedit-path-environment-variable-in-windows-11/#:~:text=We%20require%20permission%20from%20the,if%20you%20are%20not%20one.&text=Press%20Windows%2BR%2C%20type%20%22,%22%20and%20press%20%22Ok%22.)
- Open and close Command Prompt, try `psql` again. (If issues persist, message Soraya if you need help.)

3. In cmd, type `psql -U postgres`. Press enter, then enter your password. If this all works, you're good to go!

### MacOS

1. Install [PostgreSQL 16.4](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads). (Uncheck 'Stack builder' and 'pgAdmin' when installing, we don't need those.)
2. After installation, open a terminal window and type `psql` to ensure that PostgreSQL is added to your system’s PATH.

- If `psql` is not recognized, then open your .zshrc or .bash_profile file in a text editor (depending on which shell you’re using):
- - code ~/.zshrc # For zsh users
- - nano ~/.bash_profile # For bash users
- - - Instead of using the nano text editor you could use VS Code using: code ~/.bash_profile
- Add the following line (adjust the path if needed):
- - export PATH="/Library/PostgreSQL/16/bin:$PATH"
- Save and close the file, then reload your terminal by running:
- - source ~/.zshrc # For zsh users
- - source ~/.bash_profile # For bash users

3.  Open a new terminal window and type `psql --version`. If you see `psql(PostgreSQL)16.4`, then it worked!

## SETUP

After cloning the repo:

1. Navigate to EatsInReach in terminal by typing `cd EatsInReach`.
2. Install packages by typing `npm install` in terminal. You can also type `npm i`.
3. Create a file named `.env` in the base folder. Add the following contents inside:

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=[your postgreSQL password here]
DB_NAME=eats_in_reach_db
DATABASE_URL=postgres://postgres:[your postgreSQL password here]@localhost:5432/eats_in_reach_db
```

Do not include the brackets when adding in the password.

4. In terminal, type `psql -U postgres -f src/app/data/database.sql`. This creates the database for you.
5. Install the PostgreSQL Explorer by Chris Kolkman on VS Code.
6. Once you install this, follow the instructions in [this Youtube video](https://youtu.be/ezjoDYs72GA?si=0U7jKxL2xwNuQ5YR&t=680) to create a connection to the database. The instruction ends at 13:20.
7. Run the program using `npm run dev`.
8. Go to http://localhost:3000 to view the website.
9. Kill the program by pressing `CTRL+C` in the terminal.

## Enhanced Food Recommendation App Database Schema

## Existing Tables (with potential additions)

### 1. Restaurants

- Add `cuisine_id` (Foreign Key to Cuisines table)
- Add `average_rating` (DECIMAL)
- Add `total_reviews` (INTEGER)
- Add `website` (VARCHAR)
- Add `phone_number` (VARCHAR)

### 2. Food_Types

(No changes)

### 3. Restaurant_Food_Types

(No changes)

### 4. Photo_Types

(No changes)

### 5. Restaurant_Pictures

(No changes)

### 6. Price_Ranges

(No changes)

## New Tables

### 7. Menus

| Column Name   | Data Type | Description                                       |
| ------------- | --------- | ------------------------------------------------- |
| menu_id       | SERIAL    | Primary Key                                       |
| restaurant_id | INTEGER   | Foreign Key referencing Restaurants.restaurant_id |
| name          | VARCHAR   | Name of the menu (e.g., "Lunch", "Dinner")        |
| description   | TEXT      | Brief description of the menu                     |

### 8. Menu_Items

| Column Name    | Data Type | Description                           |
| -------------- | --------- | ------------------------------------- |
| item_id        | SERIAL    | Primary Key                           |
| menu_id        | INTEGER   | Foreign Key referencing Menus.menu_id |
| name           | VARCHAR   | Name of the menu item                 |
| description    | TEXT      | Description of the item               |
| price          | DECIMAL   | Price of the item                     |
| is_vegetarian  | BOOLEAN   | Indicates if the item is vegetarian   |
| is_vegan       | BOOLEAN   | Indicates if the item is vegan        |
| is_gluten_free | BOOLEAN   | Indicates if the item is gluten-free  |

### 9. Users

| Column Name   | Data Type | Description                |
| ------------- | --------- | -------------------------- |
| user_id       | SERIAL    | Primary Key                |
| username      | VARCHAR   | User's chosen username     |
| email         | VARCHAR   | User's email address       |
| password_hash | VARCHAR   | Hashed password            |
| created_at    | TIMESTAMP | Account creation timestamp |

### 10. Favorites

| Column Name   | Data Type                | Description                                       |
| ------------- | ------------------------ | ------------------------------------------------- |
| user_id       | INTEGER                  | Foreign Key referencing Users.user_id             |
| restaurant_id | INTEGER                  | Foreign Key referencing Restaurants.restaurant_id |
| PRIMARY KEY   | (user_id, restaurant_id) | Composite Primary Key                             |

### 11. Cuisines

| Column Name | Data Type | Description                      |
| ----------- | --------- | -------------------------------- |
| cuisine_id  | SERIAL    | Primary Key                      |
| name        | VARCHAR   | Name of the cuisine              |
| description | TEXT      | Brief description of the cuisine |

### 12. Dietary_Restrictions

| Column Name    | Data Type | Description                     |
| -------------- | --------- | ------------------------------- |
| restriction_id | SERIAL    | Primary Key                     |
| name           | VARCHAR   | Name of the dietary restriction |
| description    | TEXT      | Description of the restriction  |

### 13. Restaurant_Dietary_Options

| Column Name    | Data Type                       | Description                                                 |
| -------------- | ------------------------------- | ----------------------------------------------------------- |
| restaurant_id  | INTEGER                         | Foreign Key referencing Restaurants.restaurant_id           |
| restriction_id | INTEGER                         | Foreign Key referencing Dietary_Restrictions.restriction_id |
| PRIMARY KEY    | (restaurant_id, restriction_id) | Composite Primary Key                                       |

## Additional Relationships

- Restaurants has a many-to-one relationship with Cuisines
- Restaurants has a one-to-many relationship with Menus
- Menus has a one-to-many relationship with Menu_Items
- Users has a many-to-many relationship with Restaurants through Favorites
- Restaurants has a many-to-many relationship with Dietary_Restrictions through Restaurant_Dietary_Options

[Prerequisites](doc:EatsInReach#prerequisites) |
[Setup](doc:EatsInReach#setup)

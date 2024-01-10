-- Drop user first if they exist
DROP USER if exists 'ngts'@'localhost' ;

-- Create user
CREATE USER 'ngts'@'localhost' IDENTIFIED BY 'ngts';

-- Grant all privileges to the user
GRANT ALL PRIVILEGES ON * . * TO 'ngts'@'localhost';
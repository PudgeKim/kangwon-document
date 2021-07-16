-- CREATE TABLE app_user (
--     id serial PRIMARY KEY,
--     email VARCHAR (50) UNIQUE NOT NULL,
--     nickname VARCHAR (33) UNIQUE NOT NULL,
--     password TEXT NOT NULL,
--     created_at TIMESTAMP NOT NULL
-- );

-- GRANT ALL PRIVILEGES ON TABLE app_user to user123;

-- INSERT INTO app_user (email, nickname, password, created_at) VALUES ('test@gmail.com', '1234', 'tony', NOW());
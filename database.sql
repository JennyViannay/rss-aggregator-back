DROP DATABASE IF EXISTS `rss-agregator`;
CREATE DATABASE `rss-agregator` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

USE `rss-agregator`;

CREATE TABLE category (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE flux (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL,
    category_id INTEGER NOT NULL,
    FOREIGN KEY(category_id) REFERENCES category(id)   
);

CREATE TABLE user (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    fullname VARCHAR(255) NOT NULL,
    token VARCHAR(255),
    token_expiration DATETIME
);

CREATE TABLE favorite (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    flux_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL
);

INSERT INTO category (name) VALUES 
    ('Actus'),
    ('Tech'),
    ('Developpment')
;

INSERT INTO flux (title, url, category_id) VALUES
    ('Le Monde','https://www.lemonde.fr/rss/une.xml',1),
    ('France Info','https://www.francetvinfo.fr/titres.rss',1),
    ('frandroid','https://www.frandroid.com/feed',2),
    ('futura-sciences','https://www.futura-sciences.com/rss/actualites.xml',2),
    ('Eleven Labs','https://blog.eleven-labs.com/feed.xml',3),
    ('Je suis un dev','https://www.jesuisundev.com/feed/',3),
    ('Developpez.com','https://www.developpez.com/index/rss',3)
;

INSERT INTO user (email, password, fullname, token, token_expiration) VALUES
    ('francois@email.fr', '$argon2i$v=19$m=4096,t=3,p=1$P/vLAIfYFTHyDNIRfKpYIw$QyrKk/G62ztaL52u4rBSauqF2i/G8/d7A0qIOnWehVo', 'Francois Doussin', null, null)
;

INSERT INTO favorite (flux_id, user_id) VALUES
    (1,1),
    (3,1),
    (4,1),
    (5,1)
;

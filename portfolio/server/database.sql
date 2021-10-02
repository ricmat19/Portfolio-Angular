CREATE DATABASE portfolio;

CREATE TABLE project(
    project VARCHAR(150) NOT NULL PRIMARY KEY,
    thumbnail VARCHAR(150)
);

CREATE TABLE technology(
    project VARCHAR(150) NOT NULL PRIMARY KEY,
    technology VARCHAR(50) NOT NULL,
    FOREIGN KEY (project) REFERENCES project(project)
);
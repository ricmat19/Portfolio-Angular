CREATE DATABASE portfolio;

CREATE TABLE projects(
    project VARCHAR(150) NOT NULL PRIMARY KEY,
    thumbnail VARCHAR(150)
);

CREATE TABLE project_tech(
    id BIGINT PRIMARY KEY,
    project VARCHAR(150) NOT NULL,
    technology VARCHAR(50) NOT NULL,
    FOREIGN KEY (project) REFERENCES projects(project)
);
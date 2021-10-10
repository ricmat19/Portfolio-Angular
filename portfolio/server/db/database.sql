CREATE DATABASE portfolio;

CREATE TABLE projects(
    project VARCHAR(150) NOT NULL PRIMARY KEY,
    thumbnail VARCHAR(150)
);

CREATE TABLE project_tech(
    id BIGINT PRIMARY KEY auto_increment,
    project VARCHAR(150) NOT NULL,
    technology VARCHAR(50) NOT NULL,
    CONSTRAINT fk_project_tech FOREIGN KEY (project) REFERENCES projects(project) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE project_images(
    id BIGINT PRIMARY KEY auto_increment,
    project VARCHAR(150) NOT NULL,
    thumbnail VARCHAR(150) NOT NULL,
    CONSTRAINT fk_project_images FOREIGN KEY (project) REFERENCES projects(project) ON UPDATE CASCADE ON DELETE CASCADE
);
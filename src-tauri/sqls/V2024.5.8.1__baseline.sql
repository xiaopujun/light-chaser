create table common_database
(
    id          INTEGER
        primary key autoincrement,
    name        VARCHAR(255),
    type        INTEGER            not null,
    username    VARCHAR(20)        not null,
    password    VARCHAR(255)       not null,
    url         VARCHAR(255)       not null,
    des         VARCHAR(255),
    deleted     INTEGER  default 0 not null,
    update_time DATETIME default CURRENT_TIMESTAMP,
    create_time DATETIME default CURRENT_TIMESTAMP
);

create table image
(
    id          INTEGER
        primary key autoincrement,
    url         VARCHAR(255) not null,
    name        VARCHAR(255),
    deleted     INTEGER  default 0,
    create_time DATETIME default CURRENT_TIMESTAMP,
    update_time DATETIME default CURRENT_TIMESTAMP
);

create table project
(
    id          INTEGER
        primary key autoincrement,
    name        VARCHAR(255) not null,
    des         VARCHAR(255),
    data_json   TEXT,
    cover       VARCHAR(255),
    deleted     INTEGER  default 0,
    create_time DATETIME default CURRENT_TIMESTAMP,
    update_time DATETIME default CURRENT_TIMESTAMP
);

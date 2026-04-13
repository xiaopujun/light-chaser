create table ai_model
(
    id                    INTEGER
        primary key autoincrement,
    name                  VARCHAR(255)  not null,
    provider              VARCHAR(128)  not null,
    model_name            VARCHAR(255)  not null,
    base_url              VARCHAR(512)  not null,
    api_key               TEXT,
    api_key_header        VARCHAR(128)  default 'Authorization',
    api_key_prefix        VARCHAR(64)   default 'Bearer',
    chat_completions_path VARCHAR(255)  default '/chat/completions',
    description           VARCHAR(500),
    temperature           REAL          default 0.3,
    max_tokens            INTEGER,
    enabled               INTEGER       default 1 not null,
    is_default            INTEGER       default 0 not null,
    deleted               INTEGER       default 0 not null,
    update_time           DATETIME      default CURRENT_TIMESTAMP,
    create_time           DATETIME      default CURRENT_TIMESTAMP
);

create index idx_ai_model_default on ai_model (is_default, deleted);

create table ai_model_meta
(
    meta_key   VARCHAR(64) not null primary key,
    meta_value VARCHAR(255),
    update_time DATETIME default CURRENT_TIMESTAMP
);

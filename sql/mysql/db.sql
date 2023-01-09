-- User table--

create table t_users(
    _id  bigint auto_increment  not null,
    _uuid varchar(40) not null,
    _last_name varchar(160) not null,
    _first_name varchar(160) not null,
    _email varchar(255) not null,
    _birthday date not null,
    _password text not null,
    _status enum('activated', 'deactivated', 'deleted') default('activated') not null,
    _confirmed boolean not null default false,
    _inserted_at timestamp not null default now(),
    _updated_at timestamp not null default now(),
    primary key(_id),
    constraint u_users_email unique(_email),
    constraint u_users_uuid unique(_uuid)

) engine = innodb default charset utf8;


-- media table--

create table t_users_media(
    _id bigint auto_increment not null,
    _uuid varchar(40) not null,
    _user bigint not null,
    primary key(_id),
    constraint u_users_uuid unique(_uuid),
    constraint fk_users_media_user foreign key(_user) references t_users(_id)
    
)engine = innodb default charset utf8;

--

-- drop table t_sessions;
create table t_sessions(
    _id varchar(40)  not null,
    _data text not null,
    _valide boolean default(true) not null
    
)engine = innodb default charset utf8;


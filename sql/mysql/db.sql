-- User table--

create table t_users(
    _id  bigint auto_increment  not null,
    _uuid varchar(40) not null,
    _last_name varchar(160) not null,
    _first_name varchar(160) not null,
    _pseudo varchar(160) not null,
    _email varchar(255) not null,
    _birthday date not null,
    _password varchar(70) not null,
    _inserted_at timestamp not null default now(),
    _updated_at timestamp not null default now(),
    primary key(_id),
    constraint u_users_name unique(_last_name, _first_name),
    constraint u_users_email unique(_email),
    constraint u_users_uuid unique(_uuid)

) engine = innodb default charset utf8;


--media table--

create table t_users_media(
    _id bigint auto_increment not null,
    _uuid varchar(40) not null,
    _user bigint not null,
    primary key(_id),
    constraint u_users_uuid unique(_uuid),
    constraint fk_users_media_user foreign key(_user) references t_users(_id)
    
)engine = innodb default charset utf8;

--

create table t_session(
    _id varchar(40) not null,
    _data text not null,
    _valide boolean default(true) not null
    
)engine = innodb default charset utf8;


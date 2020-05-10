CREATE SEQUENCE status_types_seq;

CREATE TABLE status_types (
  status_id int NOT NULL DEFAULT NEXTVAL ('status_types_seq'),
  status_name varchar(45) NOT NULL,
  status_value varchar(45) NOT NULL,
  PRIMARY KEY (status_id)
);

CREATE SEQUENCE user_details_seq;

CREATE TABLE user_details (
  user_id int NOT NULL DEFAULT NEXTVAL ('user_details_seq'),
  user_name varchar(45) NOT NULL,
  email_id varchar(100) NOT NULL,
  created_on timestamp(0) DEFAULT CURRENT_TIMESTAMP,
  last_updated_on timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (user_id)
);

CREATE SEQUENCE task_seq;

CREATE TABLE task (
  task_id int NOT NULL DEFAULT NEXTVAL ('task_seq'),
  user_id int DEFAULT NULL,
  title varchar(200) NOT NULL,
  description varchar(2000) DEFAULT NULL,
  due_date timestamp(0) NULL DEFAULT NULL,
  status varchar(15) DEFAULT NULL,
  created_on timestamp(0) DEFAULT CURRENT_TIMESTAMP,
  last_updated_on timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (task_id)
 ,
  CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES user_details (user_id) ON DELETE NO ACTION ON UPDATE NO ACTION
) ;

CREATE INDEX user_id_idx ON task (user_id);

CREATE SEQUENCE subtask_seq;

CREATE TABLE subtask (
  subtask_id int NOT NULL DEFAULT NEXTVAL ('subtask_seq'),
  title varchar(200) DEFAULT NULL,
  description varchar(2000) DEFAULT NULL,
  task_id int NOT NULL,
  is_completed boolean DEFAULT false,
  created_on timestamp(0) DEFAULT CURRENT_TIMESTAMP,
  last_updated_on timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (subtask_id)
 ,
  CONSTRAINT task_id FOREIGN KEY (task_id) REFERENCES task (task_id) ON DELETE NO ACTION ON UPDATE NO ACTION
) ;

CREATE INDEX task_id_idx ON subtask (task_id);

CREATE SEQUENCE task_comment_seq;

CREATE TABLE task_comment (
  task_comment_id int NOT NULL DEFAULT NEXTVAL ('task_comment_seq'),
  comment_data varchar(4000) DEFAULT NULL,
  task_id int NOT NULL,
  created_on timestamp(0) DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (task_comment_id)
 ,
  CONSTRAINT task_comment_ref FOREIGN KEY (task_id) REFERENCES task (task_id) ON DELETE NO ACTION ON UPDATE NO ACTION
) ;


INSERT INTO status_types values(nextval('status_types_seq'), 'New', 'new');
INSERT INTO status_types values(nextval('status_types_seq'), 'In Progress', 'inProgress');
INSERT INTO status_types values(nextval('status_types_seq'), 'Completed', 'completed');

INSERT INTO user_details values(nextval('user_details_seq'), 'test1', 'user1@user.com', now(), now())
INSERT INTO user_details values(nextval('user_details_seq'), 'test2', 'user2@user.com', now(), now())
INSERT INTO user_details values(nextval('user_details_seq'), 'test3', 'user3@user.com', now(), now())

INSERT INTO task values(nextval('task_seq'), 1, 'Task One', 'Task One Desc', now(), 'new', now(), now());
INSERT INTO task values(nextval('task_seq'), 1, 'Task TwO', 'Task Two Desc', now(), 'inProgress', now(), now())

INSERT INTO subtask values(nextval('subtask_seq'), 'Sub Task One', 'Sub Task One Desc', 1, now(), now());
INSERT INTO subtask values(nextval('subtask_seq'), 'Sub Task Two', 'Sub Task Two Desc', 1, now(), now());

INSERT INTO task_comment values(nextval('task_comment_seq'), 'Test comment1 for task1', 1, now());
INSERT INTO task_comment values(nextval('task_comment_seq'), 'Test comment2 for task1', 1, now());



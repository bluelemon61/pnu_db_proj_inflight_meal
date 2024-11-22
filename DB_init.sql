-- Active: 1732236334963@@pnu-database-1.cn8iacmm0ih8.ap-northeast-2.rds.amazonaws.com@5432@postgres@public

CREATE TABLE flight {
  flight_number INT NOT NULL,
  flight_state VARCHAR(8) NOT NULL,
  serve BOOLEAN NOT NULL DEFAULT FALSE
}

CREATE TABLE users {
  id SERIAL,
  role VARCHAR(8) NOT NULL,

  PRIMARY KEY (id)
}

CREATE TABLE food {
  id SERIAL,
  category VARCHAR(16) NOT NULL, -- 한식, 중식, 양식
  name VARCHAR(16) NOT NULL,
  provider INT,
  like INT NOT NULL DEFAULT 0,
  hate INT NOT NULL DEFAULT 0,

  PRIMARY KEY (id),
  FOREIGN KEY (provider) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
}

CREATE TABLE flight_food {
  flight_number INT,
  food_id INT,
  count INT DEFAULT 0,
  for VARCHAR(8) NOT NULL, -- 기내식 제공 대상, 승객용, 기장용, 승무원용

  FOREIGN KEY (flight_number) REFERENCES flight (flight_number) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (food_id) REFERENCES food (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT flight_food_PK PRIMARY KEY (flight_number, food_id)
}

CREATE TABLE flight_user {
  flight_number INT,
  user_id INT,
  state VARCHAR(8) NOT NULL, -- NORMAL, DONOTTOUCH (수면 중, 깨우지 마세요), AWAKEME (수면 중, 깨워주세요)
  eat_count INT NOT NULL, -- 해당 항공 운항 중 기내식을 먹은 횟수
  seat_number INT NOT NULL,
  order INT,

  FOREIGN KEY (flight_number) REFERENCES flight (flight_number) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (order) REFERENCES flight_food (food_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT flight_user_PK PRIMARY KEY (flight_number, user_id)
}
CREATE TABLE flight (
  flight_number SERIAL PRIMARY KEY,
  flight_state VARCHAR(8) NOT NULL,
  serve BOOLEAN NOT NULL DEFAULT FALSE
)

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  role VARCHAR(8) NOT NULL
)

CREATE TABLE food (
  id SERIAL PRIMARY KEY,
  category VARCHAR(16) NOT NULL, -- 한식, 중식, 양식
  name VARCHAR(16) NOT NULL,
  provider INT REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  like_count INT NOT NULL DEFAULT 0,
  hate_count INT NOT NULL DEFAULT 0
)

CREATE TABLE flight_food (
  id SERIAL PRIMARY KEY,
  flight_number INT REFERENCES flight (flight_number) ON DELETE CASCADE ON UPDATE CASCADE,
  food_id INT REFERENCES food (id) ON DELETE CASCADE ON UPDATE CASCADE,
  food_count INT DEFAULT 0,
  food_target VARCHAR(8) NOT NULL -- 기내식 제공 대상, 승객용, 기장용, 승무원용
)

CREATE TABLE flight_user (
  id SERIAL PRIMARY KEY,
  flight_number INT REFERENCES flight (flight_number) ON DELETE CASCADE ON UPDATE CASCADE,
  user_id INT REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
  sleep_state VARCHAR(8) NOT NULL, -- NORMAL, NOTTOUCH (수면 중, 깨우지 마세요), AWAKEME (수면 중, 깨워주세요)
  eat_count INT NOT NULL, -- 해당 항공 운항 중 기내식을 먹은 횟수
  seat_number INT NOT NULL,
  food_order INT REFERENCES flight_food (id) ON DELETE CASCADE ON UPDATE CASCADE
)
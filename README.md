# 2024-2학기 데이터베이스 텀프로젝트
프로젝트는 항공사의 기내식 서비스 관리를 위한 데이터베이스 시스템을 구현하는 것을 목표로 한다. 항공 기내식을 데이터 베이스를 사용하여 기장은 비행기의 상태와 기내식을 구성할 수 있는 권리를 가지고 승객은 기내식을 주문 및 추천기능을 가진다. 기내식의 주문 및 제공 과정, 승객 요구 사항, 음식 공급자와의 협력, 승무원과 기장의 정보 공유를 통해 전체 기내식 프로세스를 효율적으로 관리할 수 있다.

**프로젝트 시나리오는 실제 항공기의 기내식 제공을 모방하여 구성된 가상의 시나리오입니다. 실제와 다를 수 있습니다.**

## Contributor
- 염현석 - [github](https://github.com/bluelemon61)
1. QUERY문 작성 및 BACKEND 제작

- 이동훈 - [github](https://github.com/YeomHyunseok)
1. 아이디어 구성 및 데이터 베이스 구성
2. FRONTEND 제작

## 프로젝트 실행 방법

개발환경: Node.js 20.16.0

부산대학교 Plato로 제출한 프로그램 소스코드 파일에는 `.env` 파일이 AWS RDS에 접속하도록 세팅되어 있습니다. **AWS RDS의 PostgreSQL에는 프로젝트 실행에 필요한 데이터가 이미 구축되어 있으므로 로컬 컴퓨터의 PostgreSQL이 아닌, RDS를 이용하신다면 3번으로 건너뛰어주세요**


1. 프로젝트 실행에 필요한 테이블 생성 및 데이터 삽입
```bash
# hostname, port_number, username, databasename을 환경에 맞게 입력해주세요.
# DB_dump.sql 파일은 프로젝트에 필요한 테이블 및 튜플을 담고있습니다.
# Root 폴더에서 실행해주세요.
psql -h hostname -p port_number -U username -f DB_dump.sql databasename
```

2. Root 폴더(pnu_db_proj_inflight_meal)에 `.env` 파일 생성 후 아래 내용 입력
```bash
# .env
DB_HOST="YOUR HOSTNAME"
DB_PORT="YOUR PORT"
DB_USER="YOUR USERNAME"
DB_PASSWORD="YOUR PASSWORD"
DB_NAME="YOUR DATABASENAME"
```

3. 첫 실행 시, Root 폴더(pnu_db_proj_inflight_meal)에서 아래 명령어를 실행하여 필요한 모듈 설치
```bash
npm install
```

4. 아래 명령어를 입력하여 서버 실행

```bash
npm run dev
```

5. [http://localhost:3000](http://localhost:3000) 접속

## 추가 설명
- 부산대학교 Plato로 제출한 프로그램 소스코드 파일에는 `.env` 파일이 AWS RDS에 접속하도록 세팅되어 있습니다. 로컬 환경이 아닌 RDS를 이용하신다면 테이블 생성 및 데이터 삽입 등의 초기화를 생략하셔도 됩니다.
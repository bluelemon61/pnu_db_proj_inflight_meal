--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: flight; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.flight (
    flight_number integer NOT NULL,
    flight_state character varying(8) NOT NULL,
    serve boolean DEFAULT false NOT NULL
);


ALTER TABLE public.flight OWNER TO postgres;

--
-- Name: flight_flight_number_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.flight_flight_number_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.flight_flight_number_seq OWNER TO postgres;

--
-- Name: flight_flight_number_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.flight_flight_number_seq OWNED BY public.flight.flight_number;


--
-- Name: flight_food; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.flight_food (
    id integer NOT NULL,
    flight_number integer,
    food_id integer,
    food_count integer DEFAULT 0,
    food_target character varying(8) NOT NULL
);


ALTER TABLE public.flight_food OWNER TO postgres;

--
-- Name: flight_food_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.flight_food_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.flight_food_id_seq OWNER TO postgres;

--
-- Name: flight_food_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.flight_food_id_seq OWNED BY public.flight_food.id;


--
-- Name: flight_user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.flight_user (
    id integer NOT NULL,
    flight_number integer,
    user_id integer,
    sleep_state character varying(8) NOT NULL,
    eat_count integer NOT NULL,
    seat_number integer NOT NULL,
    food_order integer,
    is_reviewed boolean DEFAULT false NOT NULL
);


ALTER TABLE public.flight_user OWNER TO postgres;

--
-- Name: flight_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.flight_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.flight_user_id_seq OWNER TO postgres;

--
-- Name: flight_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.flight_user_id_seq OWNED BY public.flight_user.id;


--
-- Name: food; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.food (
    id integer NOT NULL,
    category character varying(16) NOT NULL,
    name character varying(16) NOT NULL,
    provider integer,
    like_count integer DEFAULT 0 NOT NULL,
    hate_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.food OWNER TO postgres;

--
-- Name: food_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.food_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.food_id_seq OWNER TO postgres;

--
-- Name: food_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.food_id_seq OWNED BY public.food.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    role character varying(8) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: flight flight_number; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.flight ALTER COLUMN flight_number SET DEFAULT nextval('public.flight_flight_number_seq'::regclass);


--
-- Name: flight_food id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.flight_food ALTER COLUMN id SET DEFAULT nextval('public.flight_food_id_seq'::regclass);


--
-- Name: flight_user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.flight_user ALTER COLUMN id SET DEFAULT nextval('public.flight_user_id_seq'::regclass);


--
-- Name: food id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.food ALTER COLUMN id SET DEFAULT nextval('public.food_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: flight; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.flight (flight_number, flight_state, serve) FROM stdin;
100	착륙	f
\.


--
-- Data for Name: flight_food; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.flight_food (id, flight_number, food_id, food_count, food_target) FROM stdin;
13	100	40	10	직원
16	100	31	17	승객
21	100	38	24	직원
22	100	52	25	직원
18	100	48	10	직원
5	100	35	20	승객
\.


--
-- Data for Name: flight_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.flight_user (id, flight_number, user_id, sleep_state, eat_count, seat_number, food_order, is_reviewed) FROM stdin;
12	100	13	NORMAL	0	10	\N	f
11	100	12	NORMAL	0	9	\N	f
14	100	15	NORMAL	0	12	\N	f
21	100	22	NORMAL	0	19	\N	f
5	100	6	NORMAL	0	3	\N	f
25	100	10	NORMAL	0	7	\N	f
7	100	8	NORMAL	0	5	\N	f
22	100	23	NORMAL	0	20	\N	f
6	100	7	NORMAL	0	4	\N	f
8	100	9	NORMAL	0	6	\N	f
10	100	11	NORMAL	0	8	\N	f
13	100	14	NORMAL	0	11	\N	f
15	100	16	NORMAL	0	13	\N	f
17	100	18	NORMAL	0	15	\N	f
26	100	20	NORMAL	0	17	\N	f
18	100	19	NORMAL	0	16	\N	f
27	100	21	NORMAL	0	18	\N	f
1	100	1	NORMAL	0	0	\N	f
23	100	3	NORMAL	0	1	\N	f
24	100	4	NORMAL	0	2	\N	f
2	100	2	NORMAL	0	0	\N	f
16	100	17	NORMAL	0	14	\N	f
\.


--
-- Data for Name: food; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.food (id, category, name, provider, like_count, hate_count) FROM stdin;
52	양식	피자 	2	0	0
35	음료	아메리카노	2	0	0
38	양식	파스타	2	0	0
31	한식	불고기	2	1	0
47	한식	김치찜	2	0	0
40	음료	오렌지 주스	2	2	0
48	중식	꿔바로우	2	0	1
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, role) FROM stdin;
1	기장
3	승객
4	제공자
2	승무원
5	승객
6	승객
7	승객
8	승객
9	승객
10	승객
11	승객
12	승객
13	승객
14	승객
15	승객
16	승객
17	승객
18	승객
19	승객
20	승객
21	승객
22	승객
23	승객
\.


--
-- Name: flight_flight_number_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.flight_flight_number_seq', 1, false);


--
-- Name: flight_food_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.flight_food_id_seq', 22, true);


--
-- Name: flight_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.flight_user_id_seq', 27, true);


--
-- Name: food_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.food_id_seq', 52, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- Name: flight_food flight_food_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.flight_food
    ADD CONSTRAINT flight_food_pkey PRIMARY KEY (id);


--
-- Name: flight flight_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.flight
    ADD CONSTRAINT flight_pkey PRIMARY KEY (flight_number);


--
-- Name: flight_user flight_user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.flight_user
    ADD CONSTRAINT flight_user_pkey PRIMARY KEY (id);


--
-- Name: food food_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.food
    ADD CONSTRAINT food_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: flight_food flight_food_flight_number_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.flight_food
    ADD CONSTRAINT flight_food_flight_number_fkey FOREIGN KEY (flight_number) REFERENCES public.flight(flight_number) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: flight_food flight_food_food_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.flight_food
    ADD CONSTRAINT flight_food_food_id_fkey FOREIGN KEY (food_id) REFERENCES public.food(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: flight_user flight_user_flight_number_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.flight_user
    ADD CONSTRAINT flight_user_flight_number_fkey FOREIGN KEY (flight_number) REFERENCES public.flight(flight_number) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: flight_user flight_user_food_order_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.flight_user
    ADD CONSTRAINT flight_user_food_order_fkey FOREIGN KEY (food_order) REFERENCES public.flight_food(id) ON UPDATE CASCADE;


--
-- Name: flight_user flight_user_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.flight_user
    ADD CONSTRAINT flight_user_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: food food_provider_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.food
    ADD CONSTRAINT food_provider_fkey FOREIGN KEY (provider) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--


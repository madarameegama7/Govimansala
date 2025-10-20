--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

-- Started on 2025-10-20 15:43:56

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- TOC entry 222 (class 1259 OID 49765)
-- Name: farmer_profiles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.farmer_profiles (
    farmer_id bigint NOT NULL,
    user_id bigint,
    farm_size double precision,
    farm_type character varying(100),
    location text,
    credits integer DEFAULT 0
);


ALTER TABLE public.farmer_profiles OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 49764)
-- Name: farmer_profiles_farmer_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.farmer_profiles_farmer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.farmer_profiles_farmer_id_seq OWNER TO postgres;

--
-- TOC entry 4928 (class 0 OID 0)
-- Dependencies: 221
-- Name: farmer_profiles_farmer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.farmer_profiles_farmer_id_seq OWNED BY public.farmer_profiles.farmer_id;


--
-- TOC entry 4769 (class 2604 OID 49878)
-- Name: farmer_profiles farmer_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.farmer_profiles ALTER COLUMN farmer_id SET DEFAULT nextval('public.farmer_profiles_farmer_id_seq'::regclass);


--
-- TOC entry 4922 (class 0 OID 49765)
-- Dependencies: 222
-- Data for Name: farmer_profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.farmer_profiles (farmer_id, user_id, farm_size, farm_type, location, credits) FROM stdin;
2	42	12.5	Vegetable	Kurunegala District	250
3	48	\N	\N	\N	0
\.


--
-- TOC entry 4929 (class 0 OID 0)
-- Dependencies: 221
-- Name: farmer_profiles_farmer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.farmer_profiles_farmer_id_seq', 3, true);


--
-- TOC entry 4772 (class 2606 OID 49880)
-- Name: farmer_profiles farmer_profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.farmer_profiles
    ADD CONSTRAINT farmer_profiles_pkey PRIMARY KEY (farmer_id);


--
-- TOC entry 4774 (class 2606 OID 49896)
-- Name: farmer_profiles farmer_profiles_user_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.farmer_profiles
    ADD CONSTRAINT farmer_profiles_user_id_key UNIQUE (user_id);


--
-- TOC entry 4775 (class 2606 OID 49897)
-- Name: farmer_profiles farmer_profiles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.farmer_profiles
    ADD CONSTRAINT farmer_profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


-- Completed on 2025-10-20 15:43:56

--
-- PostgreSQL database dump complete
--


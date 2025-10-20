--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

-- Started on 2025-10-20 15:44:36

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
-- TOC entry 230 (class 1259 OID 50060)
-- Name: qa_profiles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.qa_profiles (
    qa_id bigint NOT NULL,
    user_id bigint,
    certification_id character varying(100),
    expertise_area character varying(255),
    region character varying(100),
    years_of_experience integer,
    rating double precision DEFAULT 0.0
);


ALTER TABLE public.qa_profiles OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 50059)
-- Name: qa_profiles_qa_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.qa_profiles_qa_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.qa_profiles_qa_id_seq OWNER TO postgres;

--
-- TOC entry 4928 (class 0 OID 0)
-- Dependencies: 229
-- Name: qa_profiles_qa_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.qa_profiles_qa_id_seq OWNED BY public.qa_profiles.qa_id;


--
-- TOC entry 4769 (class 2604 OID 50090)
-- Name: qa_profiles qa_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.qa_profiles ALTER COLUMN qa_id SET DEFAULT nextval('public.qa_profiles_qa_id_seq'::regclass);


--
-- TOC entry 4922 (class 0 OID 50060)
-- Dependencies: 230
-- Data for Name: qa_profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.qa_profiles (qa_id, user_id, certification_id, expertise_area, region, years_of_experience, rating) FROM stdin;
1	49	QA12345	Vegetables	Colombo	5	5
\.


--
-- TOC entry 4929 (class 0 OID 0)
-- Dependencies: 229
-- Name: qa_profiles_qa_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.qa_profiles_qa_id_seq', 1, true);


--
-- TOC entry 4772 (class 2606 OID 50092)
-- Name: qa_profiles qa_profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.qa_profiles
    ADD CONSTRAINT qa_profiles_pkey PRIMARY KEY (qa_id);


--
-- TOC entry 4774 (class 2606 OID 50110)
-- Name: qa_profiles qa_profiles_user_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.qa_profiles
    ADD CONSTRAINT qa_profiles_user_id_key UNIQUE (user_id);


--
-- TOC entry 4775 (class 2606 OID 50111)
-- Name: qa_profiles qa_profiles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.qa_profiles
    ADD CONSTRAINT qa_profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


-- Completed on 2025-10-20 15:44:36

--
-- PostgreSQL database dump complete
--


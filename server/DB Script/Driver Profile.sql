--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

-- Started on 2025-10-20 15:43:39

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
-- TOC entry 226 (class 1259 OID 49798)
-- Name: driver_profiles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.driver_profiles (
    driver_id bigint NOT NULL,
    user_id bigint,
    license_number character varying(50),
    vehicle_no character varying(20),
    is_available boolean DEFAULT true,
    current_location text
);


ALTER TABLE public.driver_profiles OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 49797)
-- Name: driver_profiles_driver_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.driver_profiles_driver_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.driver_profiles_driver_id_seq OWNER TO postgres;

--
-- TOC entry 4928 (class 0 OID 0)
-- Dependencies: 225
-- Name: driver_profiles_driver_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.driver_profiles_driver_id_seq OWNED BY public.driver_profiles.driver_id;


--
-- TOC entry 4769 (class 2604 OID 49854)
-- Name: driver_profiles driver_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.driver_profiles ALTER COLUMN driver_id SET DEFAULT nextval('public.driver_profiles_driver_id_seq'::regclass);


--
-- TOC entry 4922 (class 0 OID 49798)
-- Dependencies: 226
-- Data for Name: driver_profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.driver_profiles (driver_id, user_id, license_number, vehicle_no, is_available, current_location) FROM stdin;
1	44	B1234567	WP-AB-2345	t	Gampaha
\.


--
-- TOC entry 4929 (class 0 OID 0)
-- Dependencies: 225
-- Name: driver_profiles_driver_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.driver_profiles_driver_id_seq', 1, true);


--
-- TOC entry 4772 (class 2606 OID 49856)
-- Name: driver_profiles driver_profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.driver_profiles
    ADD CONSTRAINT driver_profiles_pkey PRIMARY KEY (driver_id);


--
-- TOC entry 4774 (class 2606 OID 49865)
-- Name: driver_profiles driver_profiles_user_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.driver_profiles
    ADD CONSTRAINT driver_profiles_user_id_key UNIQUE (user_id);


--
-- TOC entry 4775 (class 2606 OID 49866)
-- Name: driver_profiles driver_profiles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.driver_profiles
    ADD CONSTRAINT driver_profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


-- Completed on 2025-10-20 15:43:39

--
-- PostgreSQL database dump complete
--


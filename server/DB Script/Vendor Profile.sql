--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

-- Started on 2025-10-20 15:45:42

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
-- TOC entry 224 (class 1259 OID 49782)
-- Name: vendor_profiles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vendor_profiles (
    vendor_id bigint NOT NULL,
    user_id bigint,
    company_name character varying(100),
    license_no character varying(50),
    location text
);


ALTER TABLE public.vendor_profiles OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 49781)
-- Name: vendor_profiles_vendor_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.vendor_profiles_vendor_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.vendor_profiles_vendor_id_seq OWNER TO postgres;

--
-- TOC entry 4927 (class 0 OID 0)
-- Dependencies: 223
-- Name: vendor_profiles_vendor_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.vendor_profiles_vendor_id_seq OWNED BY public.vendor_profiles.vendor_id;


--
-- TOC entry 4769 (class 2604 OID 49909)
-- Name: vendor_profiles vendor_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vendor_profiles ALTER COLUMN vendor_id SET DEFAULT nextval('public.vendor_profiles_vendor_id_seq'::regclass);


--
-- TOC entry 4921 (class 0 OID 49782)
-- Dependencies: 224
-- Data for Name: vendor_profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.vendor_profiles (vendor_id, user_id, company_name, license_no, location) FROM stdin;
1	43	Agro Lanka Pvt Ltd	LIC-VEN-1234	Colombo
\.


--
-- TOC entry 4928 (class 0 OID 0)
-- Dependencies: 223
-- Name: vendor_profiles_vendor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.vendor_profiles_vendor_id_seq', 1, true);


--
-- TOC entry 4771 (class 2606 OID 49911)
-- Name: vendor_profiles vendor_profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vendor_profiles
    ADD CONSTRAINT vendor_profiles_pkey PRIMARY KEY (vendor_id);


--
-- TOC entry 4773 (class 2606 OID 49920)
-- Name: vendor_profiles vendor_profiles_user_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vendor_profiles
    ADD CONSTRAINT vendor_profiles_user_id_key UNIQUE (user_id);


--
-- TOC entry 4774 (class 2606 OID 49921)
-- Name: vendor_profiles vendor_profiles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vendor_profiles
    ADD CONSTRAINT vendor_profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


-- Completed on 2025-10-20 15:45:42

--
-- PostgreSQL database dump complete
--


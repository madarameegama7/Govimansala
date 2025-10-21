--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

-- Started on 2025-10-20 15:42:39

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
-- TOC entry 228 (class 1259 OID 49815)
-- Name: buyer_profiles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.buyer_profiles (
    buyer_id bigint NOT NULL,
    user_id bigint,
    business_name character varying(100),
    delivery_address text
);


ALTER TABLE public.buyer_profiles OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 49814)
-- Name: buyer_profiles_buyer_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.buyer_profiles_buyer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.buyer_profiles_buyer_id_seq OWNER TO postgres;

--
-- TOC entry 4927 (class 0 OID 0)
-- Dependencies: 227
-- Name: buyer_profiles_buyer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.buyer_profiles_buyer_id_seq OWNED BY public.buyer_profiles.buyer_id;


--
-- TOC entry 4769 (class 2604 OID 49830)
-- Name: buyer_profiles buyer_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.buyer_profiles ALTER COLUMN buyer_id SET DEFAULT nextval('public.buyer_profiles_buyer_id_seq'::regclass);


--
-- TOC entry 4921 (class 0 OID 49815)
-- Dependencies: 228
-- Data for Name: buyer_profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.buyer_profiles (buyer_id, user_id, business_name, delivery_address) FROM stdin;
1	45	Fresh Market Distributors	No. 78, Main Street, Matara
\.


--
-- TOC entry 4928 (class 0 OID 0)
-- Dependencies: 227
-- Name: buyer_profiles_buyer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.buyer_profiles_buyer_id_seq', 1, true);


--
-- TOC entry 4771 (class 2606 OID 49832)
-- Name: buyer_profiles buyer_profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.buyer_profiles
    ADD CONSTRAINT buyer_profiles_pkey PRIMARY KEY (buyer_id);


--
-- TOC entry 4773 (class 2606 OID 49841)
-- Name: buyer_profiles buyer_profiles_user_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.buyer_profiles
    ADD CONSTRAINT buyer_profiles_user_id_key UNIQUE (user_id);


--
-- TOC entry 4774 (class 2606 OID 49842)
-- Name: buyer_profiles buyer_profiles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.buyer_profiles
    ADD CONSTRAINT buyer_profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


-- Completed on 2025-10-20 15:42:39

--
-- PostgreSQL database dump complete
--


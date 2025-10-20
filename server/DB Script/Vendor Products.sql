--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

-- Started on 2025-10-20 15:47:01

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
-- TOC entry 218 (class 1259 OID 16462)
-- Name: vendor_products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vendor_products (
    product_id bigint NOT NULL,
    user_id bigint NOT NULL,
    name character varying(255) NOT NULL,
    category character varying(255),
    price double precision NOT NULL,
    stock_quantity integer NOT NULL,
    description character varying(255),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.vendor_products OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16461)
-- Name: vendor_products_product_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.vendor_products_product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.vendor_products_product_id_seq OWNER TO postgres;

--
-- TOC entry 4901 (class 0 OID 0)
-- Dependencies: 217
-- Name: vendor_products_product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.vendor_products_product_id_seq OWNED BY public.vendor_products.product_id;


--
-- TOC entry 4745 (class 2604 OID 50001)
-- Name: vendor_products product_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vendor_products ALTER COLUMN product_id SET DEFAULT nextval('public.vendor_products_product_id_seq'::regclass);


--
-- TOC entry 4895 (class 0 OID 16462)
-- Dependencies: 218
-- Data for Name: vendor_products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.vendor_products (product_id, user_id, name, category, price, stock_quantity, description, created_at) FROM stdin;
13	33	Pepper	Seeds	500	20	Black Pepper seeds from kegalle	2025-07-11 22:51:56.794789
14	33	Cardamon	Seeds	7850	10	Original Cardamon from Kandy plantations	2025-07-11 23:43:21.308206
16	33	Tsunami Tractor	Machinery	25000	10	Tsunami Tractor imported from japan	2025-07-12 00:17:07.562997
\.


--
-- TOC entry 4902 (class 0 OID 0)
-- Dependencies: 217
-- Name: vendor_products_product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.vendor_products_product_id_seq', 17, true);


--
-- TOC entry 4748 (class 2606 OID 50003)
-- Name: vendor_products vendor_products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vendor_products
    ADD CONSTRAINT vendor_products_pkey PRIMARY KEY (product_id);


-- Completed on 2025-10-20 15:47:02

--
-- PostgreSQL database dump complete
--


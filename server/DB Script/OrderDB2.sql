--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

-- Started on 2025-10-17 17:59:57

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
-- TOC entry 220 (class 1259 OID 16605)
-- Name: cart_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cart_items (
    item_id integer NOT NULL,
    cart_id integer,
    product_id integer NOT NULL,
    quantity integer NOT NULL
);


ALTER TABLE public.cart_items OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16604)
-- Name: cart_items_item_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cart_items_item_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cart_items_item_id_seq OWNER TO postgres;

--
-- TOC entry 4931 (class 0 OID 0)
-- Dependencies: 219
-- Name: cart_items_item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cart_items_item_id_seq OWNED BY public.cart_items.item_id;


--
-- TOC entry 218 (class 1259 OID 16597)
-- Name: carts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.carts (
    cart_id integer NOT NULL,
    user_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.carts OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16596)
-- Name: carts_cart_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.carts_cart_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.carts_cart_id_seq OWNER TO postgres;

--
-- TOC entry 4932 (class 0 OID 0)
-- Dependencies: 217
-- Name: carts_cart_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.carts_cart_id_seq OWNED BY public.carts.cart_id;


--
-- TOC entry 224 (class 1259 OID 16627)
-- Name: order_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_items (
    item_id integer NOT NULL,
    order_id integer,
    product_id integer NOT NULL,
    quantity integer NOT NULL,
    unit_price double precision NOT NULL,
    order_status character varying(255)
);


ALTER TABLE public.order_items OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16626)
-- Name: order_items_item_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.order_items_item_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.order_items_item_id_seq OWNER TO postgres;

--
-- TOC entry 4933 (class 0 OID 0)
-- Dependencies: 223
-- Name: order_items_item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.order_items_item_id_seq OWNED BY public.order_items.item_id;


--
-- TOC entry 222 (class 1259 OID 16617)
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    order_id integer NOT NULL,
    user_id integer NOT NULL,
    order_status character varying(255),
    payment_status character varying(255),
    delivery_status character varying(255),
    total_amount double precision,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    assigned_driver character varying(255)
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16616)
-- Name: orders_order_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.orders_order_id_seq OWNER TO postgres;

--
-- TOC entry 4934 (class 0 OID 0)
-- Dependencies: 221
-- Name: orders_order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_order_id_seq OWNED BY public.orders.order_id;


--
-- TOC entry 4759 (class 2604 OID 16608)
-- Name: cart_items item_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items ALTER COLUMN item_id SET DEFAULT nextval('public.cart_items_item_id_seq'::regclass);


--
-- TOC entry 4757 (class 2604 OID 16600)
-- Name: carts cart_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts ALTER COLUMN cart_id SET DEFAULT nextval('public.carts_cart_id_seq'::regclass);


--
-- TOC entry 4762 (class 2604 OID 16630)
-- Name: order_items item_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items ALTER COLUMN item_id SET DEFAULT nextval('public.order_items_item_id_seq'::regclass);


--
-- TOC entry 4760 (class 2604 OID 16620)
-- Name: orders order_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ALTER COLUMN order_id SET DEFAULT nextval('public.orders_order_id_seq'::regclass);


--
-- TOC entry 4921 (class 0 OID 16605)
-- Dependencies: 220
-- Data for Name: cart_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cart_items (item_id, cart_id, product_id, quantity) FROM stdin;
3	3	101	2
4	3	202	1
15	9	13	1
16	9	14	1
\.


--
-- TOC entry 4919 (class 0 OID 16597)
-- Dependencies: 218
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.carts (cart_id, user_id, created_at) FROM stdin;
3	3	2025-07-15 01:07:15.025971
9	7	2025-07-24 06:23:27.851778
\.


--
-- TOC entry 4925 (class 0 OID 16627)
-- Dependencies: 224
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.order_items (item_id, order_id, product_id, quantity, unit_price, order_status) FROM stdin;
13	7	13	1	500	PENDING
14	7	14	1	7850	PENDING
\.


--
-- TOC entry 4923 (class 0 OID 16617)
-- Dependencies: 222
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (order_id, user_id, order_status, payment_status, delivery_status, total_amount, created_at, assigned_driver) FROM stdin;
7	0	PENDING	\N	\N	8350	2025-07-24 07:40:25.725391	\N
\.


--
-- TOC entry 4935 (class 0 OID 0)
-- Dependencies: 219
-- Name: cart_items_item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cart_items_item_id_seq', 16, true);


--
-- TOC entry 4936 (class 0 OID 0)
-- Dependencies: 217
-- Name: carts_cart_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.carts_cart_id_seq', 9, true);


--
-- TOC entry 4937 (class 0 OID 0)
-- Dependencies: 223
-- Name: order_items_item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.order_items_item_id_seq', 14, true);


--
-- TOC entry 4938 (class 0 OID 0)
-- Dependencies: 221
-- Name: orders_order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_order_id_seq', 7, true);


--
-- TOC entry 4766 (class 2606 OID 16610)
-- Name: cart_items cart_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_pkey PRIMARY KEY (item_id);


--
-- TOC entry 4764 (class 2606 OID 16603)
-- Name: carts carts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY (cart_id);


--
-- TOC entry 4770 (class 2606 OID 16634)
-- Name: order_items order_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_pkey PRIMARY KEY (item_id);


--
-- TOC entry 4768 (class 2606 OID 16625)
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (order_id);


--
-- TOC entry 4771 (class 2606 OID 16611)
-- Name: cart_items cart_items_cart_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_cart_id_fkey FOREIGN KEY (cart_id) REFERENCES public.carts(cart_id) ON DELETE CASCADE;


--
-- TOC entry 4772 (class 2606 OID 16635)
-- Name: order_items order_items_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(order_id) ON DELETE CASCADE;


-- Completed on 2025-10-17 17:59:57

--
-- PostgreSQL database dump complete
--


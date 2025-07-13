-- Table: vendor_orders
CREATE TABLE vendor_orders (
    order_id SERIAL PRIMARY KEY,
    vendor_id INTEGER NOT NULL,
    farmer_id INTEGER NOT NULL,
    total_amount DECIMAL NOT NULL,
    status VARCHAR(30) CHECK (status IN ('PENDING', 'ACCEPTED', 'REJECTED', 'DELIVERED')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: vendor_order_items
CREATE TABLE vendor_order_items (
    item_id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES vendor_orders(order_id) ON DELETE CASCADE,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    unit_price DECIMAL NOT NULL
);

-- Table: buyer_orders
CREATE TABLE buyer_orders (
    order_id SERIAL PRIMARY KEY,
    buyer_id INTEGER NOT NULL,
    farmer_id INTEGER NOT NULL,
    total_amount DECIMAL NOT NULL,
    status VARCHAR(30) NOT NULL,
    payment_status VARCHAR(20) NOT NULL,
    delivery_status VARCHAR(30) NOT NULL,
    assigned_driver INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: buyer_order_items
CREATE TABLE buyer_order_items (
    item_id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES buyer_orders(order_id) ON DELETE CASCADE,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    unit_price DECIMAL NOT NULL
);

-- Table: buyer_cart
CREATE TABLE buyer_cart (
    cart_id SERIAL PRIMARY KEY,
    buyer_id INTEGER NOT NULL
);

-- Table: buyer_cart_items
CREATE TABLE buyer_cart_items (
    item_id SERIAL PRIMARY KEY,
    cart_id INTEGER REFERENCES buyer_cart(cart_id) ON DELETE CASCADE,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL
);

-- Table: farmer_cart
CREATE TABLE farmer_cart (
    cart_id SERIAL PRIMARY KEY,
    farmer_id INTEGER NOT NULL
);

-- Table: farmer_cart_items
CREATE TABLE farmer_cart_items (
    item_id SERIAL PRIMARY KEY,
    cart_id INTEGER REFERENCES farmer_cart(cart_id) ON DELETE CASCADE,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL
);

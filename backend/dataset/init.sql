CREATE TABLE companies (
  company_id serial NOT NULL,
  company_name character varying(100),
  PRIMARY KEY (company_id)
);

CREATE TABLE customers (
  user_id character varying(100) NOT NULL,
  login character varying(100) NOT NULL,
  password character varying(50) NOT NULL,
  name character varying(50),
  company_id integer,
  credit_card character varying,
  PRIMARY KEY (user_id)
);

CREATE TABLE orders (
  id serial NOT NULL,
  created_at timestamp without time zone,
  order_name character varying(50),
  customer_id character varying(100),
  PRIMARY KEY (id)
);

CREATE TABLE order_items (
  id serial NOT NULL,
  order_id integer,
  price_per_unit numeric,
  quantity character varying(50),
  product character varying(50),
  PRIMARY KEY (id)
);

CREATE TABLE deliveries (
  id serial NOT NULL,
  order_item_id integer,
  delivered_quantity character varying(50),
  PRIMARY KEY (id)
);

COPY companies
FROM '/docker-entrypoint-initdb.d/companies.csv'
DELIMITER ','
CSV HEADER;

COPY customers
FROM '/docker-entrypoint-initdb.d/customers.csv'
DELIMITER ','
CSV HEADER;

COPY orders
FROM '/docker-entrypoint-initdb.d/orders.csv'
DELIMITER ','
CSV HEADER;

COPY order_items
FROM '/docker-entrypoint-initdb.d/order_items.csv'
DELIMITER ','
CSV HEADER;

COPY deliveries
FROM '/docker-entrypoint-initdb.d/deliveries.csv'
DELIMITER ','
CSV HEADER;


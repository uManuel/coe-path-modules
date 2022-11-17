# Databases

There are different types of them

- Relational
- Key-value
- In-memory
- Document
- Graph
- Time-series
- Wide column
- Ledger

Some advantages
- Fully managed
- You don't have to patch the sofware or give support to them.
- Highly available meaning that they won't go offline if there is an issue in one of data centers.

## Relational Databases

- **Amazon Aurora** A MySQL and PostgreSQL compatible for the cloud
- **Amazon RDS (Relational Database Service)** Easily to setup, use and scale multiple database engines
- **Amazon Redshift** A cloud database Warehouse

## Key-Value Databases

Used in high traffic web apps, like e-commerce system, gaming applications

- **Amazon DynamoDB** Fast and Flexible Database for any scale

## In memory Databases

- **Amazon ElastiCache** Managed, in-memory data storage service for Redis and Memcached

## Document Database 

- **Amazon DocumentDB** MongoDB compatible fast, scalable, highly available document database.

# Reviewing RDS

Allow us to have relational databses in the cloud

Engines
- Mysql
- MariaDB
- Microsoft SQL Server
- PostgreSQL
- Oracle
- Amazon Aurora

Reasons to use
- Easy to setup
- Fully managed
- Scalable
- Automatic backups
- Cost effective

# Discussing DynamoDB

It's NoSQL Database 

- Key value Document database
- Single digit millisecond performance
- Flexibility (No requiring patching or migrate the whole thing to add new values)
- Fully managed
- Works in multiple regions
- Built in security, backup and restore
- Can handle more than 20 million of request per second
- Work great with serverless apps like lambda
- Works great with mobile application data 

It's very popular because more than 100.000 costumers are using it.

# Evaluating Elastic Cache

Fully in memory data store that allow us to improve the performance of our applications and load time.

Amazon provide scalable cache tools like.

- Redis
- Memcached

Amazon has thousands of customers to improve the performance and latency for apps
# Chapter 5: Storage
## Studying Storage

Types of storage data in the cloud:

- **File:** using folders, directories difficult to find and organize it.
- **Block:**  Block of data of equal size, saved in raw storage volumes and ideal for RAID systems.
- **Object:** Saved as objects that are added an id to everyone of them

### File storage

- **Amazon EFS:** A scalable, elastic and cloud native Network file system.
- **Amazon FSx for Windows File Server:** A fully managed file storage for Windows Server.

### Block Storage

- **Amazon EBS(Elastic block storage)** easy to use, high performance block storage.

### Object Storage

- **Amazon S3(Simple)** Store and retrieve any amount of data from anywhere in the world

### Backup

- **AWS backup** Centrally and automate backups across AWS services

### Data transfer

- **AWS Storage Gateway** Provide on premises access to unlimited cloud storage
- **AWS DataSync** Easily transfer to and fro 10x faster than normal 
- **AWS Transfer Family** Transfer files to Amazon S3 using SFTP, FTP and FTPS

## Selecting s3 and s3 Glacier

AWS S3 is an object storage 99% of the people storage there their information, files etc.
- It's very secure 11'9s 99.999999999% 

Storage classes
- S3 standard (frequently access)
- S3 Standard infrequent (Not access frequently)
- S3 One Zone Infrequent (Not access frequently)
- S3 Glacier (Long term archival)
- S3 Glacier Archive (Long term archival)
- S3 Intelligent Tiering (saving moving)

![Screen Shot 2022-11-17 at 13 32 56](https://user-images.githubusercontent.com/26603591/202503341-80b2d914-1bf8-4973-bf31-b516433e5c68.png)

S3 Glacier 
- Data archival and long term-backup
- 1$ per month
- Query-in-place functionality
- Three retrieval options
    - Standard (low-cost).
    - Bulk retrieval - cost effective for large amounts.
    - Expedited - urgent retrieval

## Explaining Amazon Elastic File System

Provides NFS(Network file system) shared files system for the linux VM  in amazon EC2

- Can be accessed by multiple computers (because it's NFS)
- Highly available and durable 
- Built in protection form AZ(Availability Zone) outages
- EFS automatically grows and shrinks
- Encrypted

Storage classes

- Standard 
- Infrequent Access Enable EFS lyfecycle management (access every 7,14,30,60,90 days) to save money

## Solving Storage Gateway

### AWS Storage Gateway

- Gives you access to virtually unlimited cloud storage on premises.

### File Gateway

- Gives you SMB(Server message block) and NFS interfaces to AWS S3. This means that your AWS gateway has access to AWS3 services with interfaces with S3

### Tape Gateway

Present a virtual tape library on your local network.

- It's compatible with CommVault, Veeam, Veritas
- Can implement Glacier S3

Used when you want to implement storage cloud but you still use backup software.

### Volume Gateway

Presents an iSCSI block storage volume to your on-premises applications.
Modes
- **Storage Mode** Storage that are not needed to access frequently
- **Cache Mode** Storage that are frequently accessed


## HANDS-ON LAB Introducing Amazon S3 (Simple Storage Service)

What I learned
- Create bucket S3
- Learn different options of storage classes
- Upload file
- Add permissions ACL and Bucket policies.

Access Controll list (ACL) Doesn't allow all of the permissions than Bucket policies,
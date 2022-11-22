# Chapter 4: Compute

## Considering compute

When we have to make compute we have instances, containers.

### Instances :
- **AWS EC2** (Elastic compute two)
- **AWS EC2 Spot**, Run fault tolerant workload at 90% off the normal price
- **AWS EC2 Autoscaling** Automatically add or remove capacity based on demand
- **Amazon lightsail** An easy - to - use cloud platform to build applications or websites.

### Containers
- **Amazon ECS (Elastic Container Service)**: Run secure, reliable and scalable containers. 
- **Amazon ECR (Elastic Container Registry)**: Storage, manage, and deploy container images.
- **Amazon EKS (Elastic Kubernetes Service)**: Fully managed kubernetes services

### Serverless
- **AWS Lambda**: A compute service to run code without service.

### Edge services
- **AWS Outposts**: Run AWS services on-premises (run AWS in your own servers )
- **AWS Snow Family**: Bring your data into AWS
- **AWS Wavelength**: Access AWS services via 5g networks
- **VMWare Cloud on AWS**: Migrate VMWare workloads
- **AWS Local Zones**: Run latency sensitive applications closer to end users.

## Exploring EC2

Elastic compute cloud are
- Rent virtual computers
- Choose from various types with different CPU, RAM and storage
- Different optimizations are available as well
- Pay by the hour or second

## Clarifying containers

A container allow us to package all the libraries, building tools, programming language versions to run in all the computers in the world in the same way.

![Screen Shot 2022-11-16 at 20 27 42](https://user-images.githubusercontent.com/26603591/202316883-a3624b9e-b845-4a72-9872-efbbfd6c6166.png)

## Learning lambda

AWS lambda allow us to execute code in the server so you don't have to maintain the server, buy storage, server, pay for rent, or even maintain your language version.

- Serverless compute service
- Runs your code in response to events
- Runs your code for somewhere.

### Charge by the millisecond 

- The price depends On ram use
- 128MB Ram x 30 million triggers per month cost 11.63$
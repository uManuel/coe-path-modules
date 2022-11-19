# Negotiating Networking

## Networking

How we connect together different computers and electronic devices. WIFI is a network technology.
We need
- Ip addresses
- DNS
- Routes

AWS provide us

## Cloud network

- **Amazon VPC(Virtual private Cloud)** Define and provision an isolated network for your AWS resources.
- **AWS Transit gateway** Connect VPCs(virtual private cloud) and on-premises networks
- **AWS PrivateLink** Provide private connectivity between VPCs and on-premises applications
- **Amazon Route 53** Hos your own managed DNS

## Scaling Network
- **Elastic Load Balancing** Automatically distribute network traffic across a pool of resources
- **AWS Global Accelerator** Direct traffic trough the AWS Global Network to improve global application performance

## Content Delivery
- **Amazon CloudFront** Securely deliver data, videos and application to customers globally with low latency and high transfer speeds.

# Valuing VPC

To setup a network we have first set up 

- **IP address:** IPv4 are 4 number of ranging between 0 and 256 x.x.x.x
- **Amazon VPC** Create a virtual network for your AWS service to exist in a local IP address range using that local network, so your virtual machines can interact with other services.

VPCs has other features too
- **NAT gateway** Provide internet to your VPC network
- **Internet gateway** Provide internet to your EC2 
- **Network ACL(Access control Lists)** Allow which traffic is allowed to enter into your VPC 

# Choosing CloudFront

It's a CDN (content delivery network) that allow to serve your client with low latency because Amazon has different servers near of their users.

- **Increases Security** The attacks are going to be to the CDN not you
- **Traffic spike protection** If there are a lot of traffic can uses nearest CDN
- **Lambda@Edge** Run lambda code in the CDN
- **Real-time Metrics** 
- **Cost-effective**


# Revising Route S3

Amazon Route 53

To transfer acloud.guru -> 52.206.213.112(ip address) we use DNS to map it

Features

- **Simple routing** Standard DNS functionality, will reply your ip web service
- **Weighted Policy** Multiple ip address that can be spread your internet traffic load to. If you have different types of your app or test ones
- **Geolocation policy** To give different ips based on the locations of your clients.
- **Latency policy** Reply the ip address with the lowest latency, or fastest response.
- **Failover Latency** If the server is okay will reply the ip of your server, if is not will reply other one.
- **Multiple Answer Policy** Similar to weighted Policy, but has questions to ask and check the health of your ip server before reply it.



# Hands-on Lab Create and Configuring Basic VPC components in AWS

what we're going to do It's 

- Create a VPC
- Create a Gateway and attach to our VPC
- Create a route table for the VPC
- Create two Network ACL so they connect with each other, and connect with the internet.
- Create subnets that attach to the ACL A and B with different availability zones 

![Diagram](https://labkeep-assets-production.s3.amazonaws.com/u26c8yzaiphhks2dtwpwsjkvkc34?response-content-disposition=inline%3B%20filename%3D%22AWS_Essentials_VPC_Learning_Activity.png%22%3B%20filename%2A%3DUTF-8%27%27AWS_Essentials_VPC_Learning_Activity.png&response-content-type=image%2Fpng&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAVKPCGNLN74KACTOK%2F20221118%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20221118T211829Z&X-Amz-Expires=14400&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEUaCXVzLWVhc3QtMSJHMEUCIQCZutEREYxxHFJaX0vLtKTeZfsp6iWdKRH5GE6tb9riGQIgNS0s5dbFN9Dbj5dJrSCLdISjx1y1YDh630CcCBtb0F8qgwQIThACGgwzNjYwODM0Njc5OTUiDFFazIMBQIzTgLsTRCrgA%2BD%2BB6pnegoAtRQDwwKQ3%2Ffil5%2Bbys7TIArJ4ymhufId5IuqfvuHk8igZlbasAEJwXL9FyCDqETkvDHvqOXZLrQOkMTgJtx0a8UrZqjUVrjvC20lUW%2FWeeP8nHbNGPYFDiaLfJXp2kx29yswH7%2BB2pJo2t0m%2FvLe1riFLkfFCVAoV2wleNPwmVZMlnMmx%2BGl2oZmBr9ADHz8mFU8N9DZ7qX3z2eiGbt1H54aoU2oVBaNbFViJgIGkoJ74tVEUMN69WJXeW%2FNZZ70OyPfnYTNdZDA5TQfTp5RoaCDI5CANhkUa8Q7wRGjw4YuPUwAJDfPzfyb8pADX3r2G7Hq0OHgWB8GoiT4O71DDzz%2Ba5zmlQRUj9WXST%2B1jBdL2eVBT3SzmZvOHtvCrEhBKVl2UrR6EHA7gbnKcX2wzEwIqBks4tqMBGGZ0PZhWgSUCK5pgKTDUyaY%2BCL2UYG3uHWTG%2F%2BpohlISWR4yq3HIQUrLW3HGFINLM2LlF2MeONp9GsLs6BPX22v9v136BDpPstLuKyXYltNQKQ8A7ln%2BvkxDq7FHNmJJ8gNsb4EqFGLeSoeJbVBGMRYgNcuU6Qi366YOAghqBAgUiXdSEaqaRcLmVjue8cxTHZ3Z7D4JsG%2B8MgMg9XKFzDH19%2BbBjqlAVAwdK545Fh6fNfTOIkgBoDjZIidosQLh0VR%2B0Ll6nWJsr2XJKOhlLRNAWSzRyXhpvXRaQaNXjkqZRCgRkOODYi2%2B%2FlNslj3%2FT9LAC6142gxzWZVlVfDDOgG6Y2KmUVnmsKWquL%2BODeJu6pzZqzNjru0bLgmcCC7SYSr71weFW3iiVy0XPbZUGrtjfaV5gTFL147q0jeRsTOKwJSd6LUXsoV6BHxZQ%3D%3D&X-Amz-SignedHeaders=host&X-Amz-Signature=2fd79a446bcf018c63a4ddff0d1623137c12e32125637269b7b0165974b24384)
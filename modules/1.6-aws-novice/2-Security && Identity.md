
# Chapter 3: Security And Identity

## Seeking security and identity

AWS has to provide you Security of threads and Check identity of users and permissions.

**Data Protection**

- Amazon Macie
- AWS Key Management Service
- AWS Cloud SHM
- AWS Certificate Manager
- AWS Secret Manager
**Infrastructure Protection**
- AWS SHield
- AWS Application Firewall
- AWS Firewall Manager

**Thread Detection**

- Amazon GuardDuty
- Amazon Inspector
- AWS Config
- AWS Cloud trail

**Identity Management**

- AWS IAM  
- AWS Single Sign On
- Amazon Cognito
- AWS Directory
- AWS Organization

## Illustrating IAM 

Identity and Access Management (IAM)

- Manage Who Can Access What in your AWS Account
- Create Users and Groups
- Allow or deny via Policies
- Free in all accounts 

### IAM Users

We get a Root User who is going to be you the owner of the account. You can Create Specific Policies for every group of users like Developers, Sales, Testers, they are roles.

To set them up we have to configure it with JSON like: 

```JSON
{
    "Version":"2022-01-22",
    "Statement": [
        {
            "Effect":"Allow",
            "Action": ["s3:ListBucket"],
            "Resource": "arn:aws:s3::bucket-name/*"
        },{
            .... more js code
        }
    ]
}
```
### IAM Roles

Roles are similar than Users but these can also be applied to services to add a layer of security for example:

Website -> Role-> Database
If it has the correct role then can access to the Database.

## Summarizing Secrets Manager

Allow us to protect our secrets environment to get access to databases or other services.
So in order to do that we can get that environment making an http request:

```javascript
import 'mysql.connector'

const connection = mysql.connection.connect(
    host='localhost',database='apetguru',user='root',
    password=get_secret_value_response('SecretString')
    );

```
- Improve security
- Facilitate change the secret value

## Demonstrating Directory service

When you login into a computer (own or a company ones) they will use a **directory** which is a database of people and also check other policies providing them access to some folders or restrictions and providing some certain configurations. Also users can be added to some certain groups so they have some default configurations.

Microsoft has provided a directory called ***Microsoft Active Directory**. As a consequence AWS developed **AWS Directory Service** so you don't have to run your own server directory.

- Managed Microsoft Active Directory 
- Managed Simple directory
- AD connector
- Distributed service with automatic failover
- Compatible with other AWS services:
    - Amazon chime
    - Amazon connect

## Hands labs: Introduction to AWS Identity and Access Management

IAM It's global, means that It's going to be available in all regions. We can also add regional-based access to services as well

Instances of services like EC2 are regional, so It's going to be available on `us-east-1` or `N. Virginia`

- Each user can have different SSH keys
- API keys
- ARN(Access Resource Name) It's like an Id

There are two types of policies
- Managed: Managed by AWS and applied to many users or groups.
- Inline: Inline are applied to only one user or group

Important!!
If we apply a **Deny** will always override any **Allow** policy
All permissions are deny until you allow it.


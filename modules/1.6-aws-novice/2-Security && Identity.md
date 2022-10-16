# Security And Identity

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

## Ilustrating IAM 

Identity and Access Management (IAM)

- Manage Who Can Access What in your AWS Account
- Create Users and Groups
- Allow or deny via Policies
- Free in all accounts 

## IAM Users

We get a Root User who is going to be you the owner of the account. You can Create Specific Policies for every group of users like Developers, Sales, Testers.

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
## IAM Roles

Roles are similar than Users but these can be applied to services to add a layer of security for example:

Website -> Role-> Database
If it has the correct role then can access to the Database.




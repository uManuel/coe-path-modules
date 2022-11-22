# Chapter 8: Management and Governance

## Memorizing management and Governance

In the past Organizations had to strike a balance between innovating and maintaining control over costs security and compliance. AWS do this for you in a streamline 

### AWS services regarding account management Services

- **AWS Control Tower** setup and govern a secure multi-user AWS environment.
- **AWS Organizations** Centrally Govern and manage your environment across multiple AWS accounts.
- **AWS Budgets** Improve your planning and costs

### Provision Services

- **AWS Cloud formation** Model and provision all your resources via code.
- **AWS Service Catalog** Create, organize and govern your own curated catalog of aws products
- **AWS OpsWork** Automate operations with Chef and Puppet.
- **AWS Marketplace** Find, test, buy and deploy software that runs on AWS 

### Operation Services

- **Amazon CloudWatch** Observe your services via metrics and logging
- **AWS Config** Record and Evaluate Configurations of AWS resources
- **AWS CloudTrail** Track all user activity across your AWS accounts
- **AWS Systems Manager** Optimize performance and security while managing a large amount of systems.
- **Amazon X-ray** Analyze and debug production applications

## Composing Cloudformation

### Cloudformation

Allow us to create infrastructure of EC2, VPN, Cloudfront (CDN) using templates that use code with JSON and YAML syntax.

The infrastructure is called stack because you can put one service on other like a stack.

- Using Code allow us to versioning, and allow us to rollback.

- Automation is allowed so devops engineers can do it easily, also save money because It's faster 

- We have also benefits of scale because we can implement the template in different regions easily.

## Collecting CloudWatch

AMazon Cloudwatch is a monitoring and observability service for AWS.

- Collect metrics from services.
- Integrates with 70+ AWS services
- Lots of pre defined metrics
- Collect and Display Data
- Show log data of your organization in a centralized service.
- Create alarms of Cloud Watch (e.g. if you budgets goes over 10$).

## Applying Auto Scaling

It automatically scales your EC2 servers which run your applications.

![Auto scaling](https://user-images.githubusercontent.com/26603591/203177960-e9a69c9a-bdf1-4ec2-9770-31251b7b11c2.png)

We also have **Load Balancer** this distribute automatically the connection to these servers as they appear or disappear automatically

### Auto scaling

- High availability 
- Better fault tolerance
- Better cost management
- EC2, DynamoDB, Aurora

## Hands-on lab: Getting started with CloudFormation

What we did are

1. Create a cloud formation
2. Create an stack with a template
3. Update the stack.
4. Deleting the stack

### Diagram
![Diagram cloud formation](https://labkeep-assets-production.s3.amazonaws.com/z0338j0iy78cxdmdqo5kf4s4v0um?response-content-disposition=inline%3B%20filename%3D%22Lab%20-%20Getting%20Started%20With%20CloudFormation.001.png%22%3B%20filename%2A%3DUTF-8%27%27Lab%2520-%2520Getting%2520Started%2520With%2520CloudFormation.001.png&response-content-type=image%2Fpng&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAVKPCGNLNZUXFSTUE%2F20221121%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20221121T233404Z&X-Amz-Expires=14400&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJGMEQCIDDilpapmQXnQk%2FMdnBr5Mmw3gM6QN1OXrmUeQdHlnlPAiBRBopcN8%2FRAYqtHvEZWNLxNBqGauQkDwQVz8UjXEa1YyqMBAiX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAIaDDM2NjA4MzQ2Nzk5NSIMXGV5d81JZtCC6I4UKuADfXRKY4blv%2FhFU%2BfC%2BXVIKJxl48DZlaNv5l9R1mlfUvuNBKr68XXE1JXoa6TgTHLG5OjvLWmlPdWxHuHGAT%2BmOwfWEABdsjR9BOdzCHTZjI4vujwFILUgn6B1IBkWVCmEER0yC0WxBHhC8F%2BFUthbIUzUKi%2FDV7fpfO9GnXFjPYgUZNyKow6cNUtbi6DO04V%2BEfPGKOi3e0JA1Dvc7F1wFbkfwP8SJoMq09Bsc%2Buxkfz7NwNyX6lzoXC1%2FwmsrO3i6jwyqLVYpen8yMT83nENrbjdP5E%2F%2FkCzOUNZ3h6QtUco5o0eiTvPDHJAkbMrqsCucQrmGXUiGFh%2FguOfhhMKOLDAa%2BeaHxiR0aQ7gr4xO7aJ6wWK9b0oBH0mRICbya4618mcCygBkKd58dkpth%2Fwm19B3%2FLUoBTP56JfKYy9ITqVr6FpUjpTnTYLwtDG4ZQKGIP77f11sDzjjhemszqBRY5D65VbZEVnNgKvMvklXQiRo78IZmG1Pi04tXXx4A0JluaJfWWqVyARBmZHwyJdZYgcLNUJUsl1JMvhMc0A8cWaezW4lsbsRsNo6wJGnv4wze8L3rucMI3uiMA9e8poUVWQ%2B8q6IxuFkKpyRymFXzMi7zcFViwz5PQkWzK598HWMIjx75sGOqYB58fksG%2BFUje59%2FBsuw%2BjAqCib5V3tdwBBwUgWhHecF8EcPRIJZSSefYh1uiC2fnA0FQwzHrJwGPzfgrBqzzlTWSpQhBs%2BDI7dvs8sWpzbQe%2FO4LKABl7XCpGfB%2FpTAklyB4cU3qdIQcK5SUwufBh1G7ljrE4DjbzdoHGioXS0N9qL%2BvDMGqBSMtAj%2F3sjOWlogavvPlvIMGR0uzRgskrHDGc4DLg0Q%3D%3D&X-Amz-SignedHeaders=host&X-Amz-Signature=d6ad726341e1273db8bda553c2e5c6f3a7d4b11389de0f4744601449ea13515b)
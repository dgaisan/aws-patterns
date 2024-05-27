# CDK Go template

## Before deploying lambda
 * `GOOS=linux GOARCH=amd64 go build -o bootstrap`  Creates linux executable as required by runtime:
 * `zip function.zip bootstrap`                     Creates zip bootstrap file
 
## Before very first deploy (need to run only once)
* `cdk bootstrap`   Init AWS environment

## Deployment commands
 * `cdk deploy`         deploy this stack to your default AWS account/region

## Other useful commands
 * `cdk diff`           Display changes in the current stack (Won't deploy anything. Will show what you're about to deploy)

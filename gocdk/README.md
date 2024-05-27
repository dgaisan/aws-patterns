# CDK Go template

## Before deploying lambda
 * `GOOS=linux GOARCH=amd64 go build -o bootstrap`  Creates linux executable as required by runtime:
 * `zip function.zip bootstrap`                     Creates zip bootstrap file
 * `cdk bootstrap`                                  Init AWS env. has to be executed only once on very first deployment

## Deployment commands
 * `cdk deploy`         deploy this stack to your default AWS account/region

## Other useful commands
 * `cdk diff`           Display changes in the current stack (Won't deploy anything. Will show what you're about to deploy)

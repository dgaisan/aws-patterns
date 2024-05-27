# CDK Go template

## Before very first deploy (need to run only once)
* `cdk bootstrap`   Init AWS environment

## Deployment commands
 * `make build`         (run from lambda/ folder) create lambda executables & a zip file for upload
 * `cdk deploy`         deploy this stack to your default AWS account/region

## Other useful commands
 * `cdk diff`           Display changes in the current stack (Won't deploy anything. Will show what you're about to deploy)

# Analytics using Pixel tracking 
Basic pixel tracking service to enable analytics. 
- Serves a pixel (1x1 png)
- Any client loading this image will trigger lambda to handle a request and thefore collect some anaytics from a client
- * very simple setup: no CDN, no reverse-proxy + logs  

### setup
* after cloning the repo, run `npm install`
* `npm run build`   compile typescript to js
* `npx cdk synth`   emits the synthesized CloudFormation template
* `npx cdk bootstrap` Run once before first deployment
* `npx cdk deploy`  deploy this stack to your default AWS account/region

### Other Useful commands (npm & cdk commands)
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk diff`    compare deployed stack with current state

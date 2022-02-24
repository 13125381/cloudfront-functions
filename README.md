# Lambda@Edge Serverless Demo
## Deployment
Deployment requires `profile` and `stage` environment variables to be set. You can set them like so:

```
export profile=${profile}
export stage=${stage}
```
Once exported, run the following command to build and deploy the stack:
```
npm run build-deploy
```

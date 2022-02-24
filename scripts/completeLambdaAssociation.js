// serverless injected by serverless-scriptable-plugin
const sls = serverless;

const resources = sls.service.provider.compiledCloudFormationTemplate.Resources;
const resourceType = 'AWS::Lambda::Version';
const prefix = 'ContentAuthorizerLambdaVersion';
const resourceNames = Object.keys(resources)
    .filter(name => resources[name].Type === resourceType && name.startsWith(prefix))
if (resourceNames.length !== 1) {
    throw Error(`Must have exactly 1 resource of type ${resourceType} and prefix ${prefix}, found ${resourceNames}`);
}
const distConfig = resources['ContentCFDistribution']['Properties']['DistributionConfig'];
distConfig['DefaultCacheBehavior']['LambdaFunctionAssociations'][0]['LambdaFunctionARN'] = {Ref: resourceNames[0]};
console.log(`[${__filename}] Updated LambdaFunctionARN`);
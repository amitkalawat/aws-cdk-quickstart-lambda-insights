import * as core from "@aws-cdk/core";
import * as apigateway from "@aws-cdk/aws-apigateway";
import * as lambda from "@aws-cdk/aws-lambda";
import * as s3 from "@aws-cdk/aws-s3";

export class LambdaMain extends core.Construct {
  constructor(scope: core.Construct, id: string) {
    super(scope, id);

    const bucket = new s3.Bucket(this, "LambdaStore");
    
    const duration = core.Duration.seconds(900);
    
    const layerArn = `arn:aws:lambda:us-west-2:907985872988:layer:LambdaInsightsExtensionBeta:1`;
    const layer = lambda.LayerVersion.fromLayerVersionArn(this, `LayerFromArn`, layerArn);

    const handler = new lambda.Function(this, "LambdaCPU", {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.asset("resources"),
      handler: "lambda_cpu.handler",
      layers: [layer],
      timeout: duration,
      environment: {
        BUCKET: bucket.bucketName
      }
    });

    bucket.grantReadWrite(handler); // was: handler.role);

    const api = new apigateway.RestApi(this, "helloworld-api-cpu", {
      restApiName: "Default API - CPU ",
      description: "Default API - Test Service - CPU"
    });

    const getLambdaIntegration = new apigateway.LambdaIntegration(handler);

    api.root.addMethod("ANY", getLambdaIntegration); 
  }
}
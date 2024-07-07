import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import { LambdaRestApi } from "aws-cdk-lib/aws-apigateway";
import { FunctionUrl, FunctionUrlAuthType, Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from 'constructs';

export class ApiStack extends Stack {
  api: FunctionUrl;
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const fn = new NodejsFunction(this, 'lambda', {
      entry: '../backend/src/api/lambda.ts',
      handler: 'handler',
      runtime: Runtime.NODEJS_20_X,
      bundling: {
        commandHooks: {
          beforeBundling() { return [] },
          beforeInstall() { return [] },
          afterBundling(_inputDir: string, outputDir: string): string[] {
            return [
              `cp -r ../backend/sqlite.db ${outputDir}`,
              `cp -r ./pkgs//backend/package.json ${outputDir}`,
              `cp -r ./pkgs/node_modules/better-sqlite3/build ${outputDir}/build`
            ]
          },
        }
      }
    })

    this.api = fn.addFunctionUrl({
      authType: FunctionUrlAuthType.NONE,
    })

    new LambdaRestApi(this, 'myapi', {
      handler: fn,
    })

    new CfnOutput(this, 'api-url', {
      value: this.api.url
    })
  }
}

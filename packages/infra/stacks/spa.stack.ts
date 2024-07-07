import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from 'constructs';
import { ApiStack } from "./api.stack";
import { SPADeploy } from 'cdk-spa-deploy';

interface Props extends StackProps {
  api: ApiStack
}

export class SpaStack extends Stack {
  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id, props);

    const spa = new SPADeploy(this, 'cfDeploy')
      .createSiteWithCloudfront({
        indexDoc: 'index.html',
        websiteFolder: '../frontend/dist'
      });

    new CfnOutput(this, 'spa-url', {
      value: spa.distribution.distributionDomainName
    })
  }
}


#!/usr/bin/env node
import 'source-map-support/register';
import { CDKApplication } from 'opinionated-ci-pipeline';
import { ApiStack } from '../stacks/api.stack';
import { SpaStack } from '../stacks/spa.stack';

new CDKApplication({
  stacks: {
    create: (scope, projectName, envName) => {
      const api = new ApiStack(scope, 'api', {
        stackName: `${projectName}-${envName}-api`
      })
      new SpaStack(scope, 'spa', {
        api,
        stackName: `${projectName}-${envName}-spa`
      })
    },
  },
  repository: {
    host: 'github',
    name: 'blntrsz/hexagonal-full-stack',
  },
  packageManager: 'pnpm',
  commands: {
    buildAndTest: ["cd packages/frontend && pnpm build && cd ../infra"],
  },
  cdkOutputDirectory: "packages/infra/cdk.out",
  pipeline: [
    {
      environment: 'test',
    },
  ],
});

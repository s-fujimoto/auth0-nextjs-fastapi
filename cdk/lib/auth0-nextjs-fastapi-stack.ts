import { Stack, StackProps, SecretValue } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as amplify from '@aws-cdk/aws-amplify-alpha';

export class Auth0NextjsFastapiStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const amplifyApp = new amplify.App(this, 'auth0-nextjs-fastapi-app', {
      sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
        owner: 's-fujimoto',
        repository: 'auth0-nextjs-fastapi',
        oauthToken: SecretValue.secretsManager('prod/blog.elmoelmo.net/amplify', {
          jsonField: 'GITHUB_OAUTH_TOKEN'
        })
      })
    });
    const masterBranch = amplifyApp.addBranch('master');

    amplifyApp.addDomain('elmoelmo.net', {
      subDomains: [
        {
          branch: masterBranch,
          prefix: 'myapp'
        }
      ]
    });
  }
}

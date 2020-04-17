# wa-influencer-landing

# Influencers landing page

## Build Setup

``` bash

# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate

# deployment
$ yarn deploy

```

To use deployment setup AWS CLI 
``` bash
brew install awscli

aws configure
```

At this stage open your AWS console, create an `Access key`
Enter your `Access key` and `Secret access key` to configuration

To test
```bash
aws s3 ls
```
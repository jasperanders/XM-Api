[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/tguelcan/restexpress">
    <img src="https://fontmeme.com/permalink/200630/49d0f80c2242a75c9fe95ca87134c7cb.png" alt="Logo">
  </a>

  <h3 align="center">RESTexpress</h3>

  <p align="center">
    RESTexpress is a highly customizable REST backend and API generator.
    <br />
    <a href="https://github.com/tguelcan/restexpress"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/tguelcan/restexpress">View Demo</a>
    ·
    <a href="https://github.com/tguelcan/restexpress/issues">Report Bug</a>
    ·
    <a href="https://github.com/tguelcan/restexpress/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [Deployment](#usage)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)
* [Acknowledgements](#acknowledgements)



<!-- ABOUT THE PROJECT -->
## About The Project

RESTexpress is a highly customizable REST backend and API generator.

Here's why this is some cool shit:
* Your time should be focused on creating amazing features, not thinking about authentication, user management and project structure.
* You shouldn't have to implement simple CRUD operations over and over again.

Of course, no template will serve all projects since your needs may be different. So we made it easy to add your own mongoose plugins, services and middleware.


### Built With
* [NodeJS](https://nodejs.org)
* [Babel](https://babeljs.io)
* [ExpressJS](https://expressjs.com)
* [MongoDB](https://mongodb.com)


<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* [yarn](https://classic.yarnpkg.com/en/docs/install/#debian-stable)
* [mongoDB](https://docs.mongodb.com/manual/installation/)

The easiest way to install mongoDB is with docker. A simple docker-compose file would look like this:
```yml
version: "3.8"
services:
    mongo:
        image: mongo:4.2.5
        ports:
            - "27017:27017"
```
### Installation

2. Clone the repo
```sh
git clone git@github.com:tguelcan/restexpress.git
```
3. Install dependencies
```sh
yarn
```
4. Enter your variables in `.env.example` and rename the file to `.env`


<!-- USAGE EXAMPLES -->
## Usage

Start the server with:
```sh
yarn run dev
```
If it succesfully started, the output should look like this:
[![yarn run dev screenshot][yarn-run-dev-screenshot]](http://0.0.0.0:8080)


You should now be able to see the [Documentation](http://0.0.0.0:8080/docs)


You can run tests with:
```sh
yarn run test
```
or
```sh
yarn run test:coverage
```
to check the code coverage

## Adding routes / plugins / services

### Mongoose plugins

0. Read about [Mongoose Plugins](https://mongoosejs.com/docs/plugins.html)
1. Create your new plugin in `src/services/mongoose/plugins`
2. Make sure to export it in `src/services/mongoose/index.js`
3. Access the plugin in your model like this:
```js
import { yourPlugin } from 's/mongoose'
```

### Adding routes

```sh
yarn run generate
```
Enter your resource name

=> All required files should now be generated and you can start writing code!

1. Define ACL in /api/resource-name/acl.js
2. Define model in /api/resource-name/model.js
3. Write tests in /tests/api/resoure-name.test.js
4. Add middleware in /api/resource-name/index.js
5. Implement controllers in /api/resource-name/controller.js


### Services
1. Create your new service in a separate folder in `src/services`
2. Import it when necessary with `s/yourservice`

<!-- Deployment -->
## Deployment

### Heroku + MongoDB Atlas = 👁👄👁

1. Create a new heroku app
2. Enter the needed environment variables:
```
MASTER_KEY=
JWT_SECRET=
MONGODB_URI=
SENDGRID_KEY=
```
You can get a free mongoDB database from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and a free [SendGrid](https://sendgrid.com/) account for testing

3. `heroku git:remote -a <your-app-name>`
4. `git push heroku master`
5. Your API should now be online and accessible under: https://\<your-app-name>.herokuapp.com/ 🥳

### Docker

// TODO:

<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/tguelcan/restexpress/issues) for a list of proposed features (and known issues)

Or take a look at the currently empty [project board](https://github.com/tguelcan/restexpress/projects/1)


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.


<!-- CONTACT -->
## Contact

Jonas Scholz - [@jscholz42](https://twitter.com/jscholz42)

Tayfun Gülcan - [@Tayfuuu](https://twitter.com/Tayfuuu)


<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
* [Img Shields](https://shields.io)
* [README Template](https://github.com/othneildrew/Best-README-Template)
* [Mongoose](https://github.com/Automattic/mongoose)
* [JWT](https://jwt.io/)
* [Swagger](https://swagger.io)
* [bodymen](https://github.com/diegohaz/bodymen)
* [querymen](https://github.com/diegohaz/querymen)
* [Jest](https://jestjs.io)
* [Sendgrid](https://sendgrid.com/)

## recommended sources

<a target="_blank"  href="https://www.amazon.de/gp/product/B08BV4TPXD/ref=as_li_tl?ie=UTF8&camp=1638&creative=6742&creativeASIN=B08BV4TPXD&linkCode=as2&tag=kopfundgeist-21&linkId=f0cf7b617e43f6fad63f342a0952c4be"><img border="0" src="//ws-eu.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=DE&ASIN=B08BV4TPXD&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL160_&tag=kopfundgeist-21" ></a><img src="//ir-de.amazon-adsystem.com/e/ir?t=kopfundgeist-21&l=am2&o=3&a=B08BV4TPXD" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
<a target="_blank"  href="https://www.amazon.de/gp/product/1680501747/ref=as_li_tl?ie=UTF8&camp=1638&creative=6742&creativeASIN=1680501747&linkCode=as2&tag=kopfundgeist-21&linkId=5e8e6029243ef71110c346ee0d1fea26"><img border="0" src="//ws-eu.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=DE&ASIN=1680501747&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL160_&tag=kopfundgeist-21" ></a><img src="//ir-de.amazon-adsystem.com/e/ir?t=kopfundgeist-21&l=am2&o=3&a=1680501747" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
<a target="_blank"  href="https://www.amazon.de/gp/product/B07TWDNMHJ/ref=as_li_tl?ie=UTF8&camp=1638&creative=6742&creativeASIN=B07TWDNMHJ&linkCode=as2&tag=kopfundgeist-21&linkId=3827cc7a30af48b0efdd6a492f7974a8"><img border="0" src="//ws-eu.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=DE&ASIN=B07TWDNMHJ&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL160_&tag=kopfundgeist-21" ></a><img src="//ir-de.amazon-adsystem.com/e/ir?t=kopfundgeist-21&l=am2&o=3&a=B07TWDNMHJ" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
<a target="_blank"  href="https://www.amazon.de/gp/product/1617292427/ref=as_li_tl?ie=UTF8&camp=1638&creative=6742&creativeASIN=1617292427&linkCode=as2&tag=kopfundgeist-21&linkId=c1f483714cfc05f1fce1a57f24f19b14"><img border="0" src="//ws-eu.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=DE&ASIN=1617292427&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL160_&tag=kopfundgeist-21" ></a><img src="//ir-de.amazon-adsystem.com/e/ir?t=kopfundgeist-21&l=am2&o=3&a=1617292427" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />  

[contributors-shield]: https://img.shields.io/github/contributors/tguelcan/restexpress.svg?style=flat-square
[contributors-url]: https://github.com/tguelcan/restexpress/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/tguelcan/restexpress.svg?style=flat-square
[forks-url]: https://github.com/tguelcan/restexpress/network/members
[stars-shield]: https://img.shields.io/github/stars/tguelcan/restexpress.svg?style=flat-square
[stars-url]: https://github.com/tguelcan/restexpress/stargazers
[issues-shield]: https://img.shields.io/github/issues/tguelcan/restexpress.svg?style=flat-square
[issues-url]: https://github.com/tguelcan/restexpress/issues
[license-shield]: https://img.shields.io/github/license/tguelcan/restexpress.svg?style=flat-square
[license-url]: https://github.com/tguelcan/restexpress/blob/master/LICENSE.md
[yarn-run-dev-screenshot]: images/yarn-run-dev-screenshot.png

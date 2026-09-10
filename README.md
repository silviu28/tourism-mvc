<div align="center">
  <h1>MyTravel</h1>
  <p><strong>Web App for a hypothetical tourism agency.</strong></p>

  <!-- Badges -->
  <a href="https://github.com/silviu28/tourism-mvc/actions">
    <img src="https://img.shields.io/github/actions/workflow/status/silviu28/tourism-mvc/pipeline.yml?style=for-the-badge" alt="Build Status">
  </a>
  <a href="https://github.com/silviu28/morphlect-android/issues">
    <img src="https://img.shields.io/github/issues/silviu28/tourism-mvc?style=for-the-badge&color=orange" alt="Issues">
  </a>
  <br>
</div>

---

A Wordpress-style Web application for a tourism agency. It has a Blog and a community-drive Wiki page for all tourist needs.

### Key Features

- **User-friendly modern UI** - Metro-inspired interface created in React, using both Styled Components and vanilla CSS
- **Community-driven Wiki** - Learn about various tourist attractions and places or post about them yourself on the Wiki
- **Notifications** - Get notified about announcements or new offers
- **Easy management** - Access the control panel as an admin and control visible comments, Blog posts, approve Wiki posts and much more 
- **Rich customization** - Wiki and Blog use HTML for rich formatting options, adding images and much more, sanitized after upload for security
- **Analytics and data** - View collected non-invasive data based on usage metrics of consenting users. (TBA)
---

### Technologies

> UI: TypeScript (React), Styled Components, Tanstack Query, React Router, CSS
> 
> Backend: TypeScript (Node.JS), Express, Sequelize ORM, MySQL/MariaDB DBMS

---

## Screenshots

TBA

---
## Development and Build

### Prerequisites

- [Node.js](https://nodejs.org/en/download) (20+)
- [NVM](https://github.com/nvm-sh/nvm) (For handling different Node.js versions)
- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/products/docker-desktop/)
- [MariaDB](https://mariadb.org/download)/[MySQL](https://dev.mysql.com/downloads/) (Either one works with the driver, in case you don't want to run containerized)
- An IDE (WebStorm) or text editor (VS Code, Sublime Text) of your choice

### Installation

The following instructions apply for all projects (`view`, `server` and `shared`).
1. **Clone the repository**

```
git clone https://github.com/silviu28/tourism-mvc.git
cd tourism-mvc/[view|server|shared]
```

2. **Download dependencies**

```
npm install
```

3. **Create a build**

```
npm run build
```

The following instructions apply for `view` and `shared`.

4a. **Run unit tests**

```
npm run test
```

5a. Provide environment variables for the backend
```
cd tourism-mvc/server (if not in the directory already)
touch .env
```

Copy the following fields and provide values:

```
DB_NAME=
DB_USER=
PASSWORD=
HOST=
JWT_SECRET=
DB_ALTER=
JWT_EXPIRY=
```

6a. **Run development mode with HMR**

```
npm run dev
```

~~7a. **Alternatively, run in container cluster**~~
```
docker compose up
```

The following instructions apply for the `shared` module.

4b. **Import module in project(s)**

For any item in the module, at the top of your file (example for importing the `PagedQuery<T>` type):
```js
import { PagedQuery } from "shared";
```

## CI/CD

Automated actions are run using GitHub Actions. You can also run them locally using [act](https://github.com/nektos/act) (Docker is required):
```
act
```


## Contributing

The project is actively maintained and contributions are welcome. Do not push directly on the `main` branch and create a PR. Even if the workflow fails your contribution may still pass after approval. Purely AI-generated contributions are prohibited.

## Additional Credits

TBA
  
<sub>silviu28 | 2026</sub>

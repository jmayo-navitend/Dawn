# Dawn

A repository for my start to learning modern website development

---

## 🛫 &nbsp; Setup

### Requirements

-   [Node.js](https://nodejs.org/)
-   npm (Comes with Node.js)
-   Text Editor

**Notice**: [pnpm](https://pnpm.io/) and [yarn](https://yarnpkg.com/) are untested.

### Recommended

-   [nvm](https://github.com/nvm-sh/nvm) &#8628;

```bash
nvm install 22
```

&emsp; &emsp; &#8595;

-   Node.js Version 22.14.0 (or newer)
-   npm Version 10.9.2 (or newer)

-   [Visual Studio Code](https://code.visualstudio.com/)

1. Clone the repository

HTTPS

```bash
git clone https://github.com/jmayo-navitend/Dawn.git
```

SSH

```bash
git clone git@github.com:jmayo-navitend/Dawn.git
```

GitHub CLI

```bash
gh repo clone jmayo-navitend/dawn
```

2. Enter the repositories directory

```bash
cd dawn
```

3. Navigate to the `server` directory

```bash
cd packages/server/
```

4. Install dependancies

```bash
npm install
```

5. Start a mySQL database

I use an app like [DBngin](https://dbngin.com/) for running local databases

Default database config:

-   username: root
-   password:
-   host: localhost
-   port: 3306

6. Create a `.env` file

Create the file in the server directory `packages/server/` and add the following environment variable, or modify it for your configuration:

```
DATABASE_URL="mysql://root:@localhost:3306/data"
```

7. Run the database migrations

```bash
npx prisma migrate dev --name init
```

8. Start the backend server

```bash
npm start
```

9. Start a new terminal session

10. Enter the repositories directory

```bash
cd dawn
```

11. Navigate to the `client` directory

```bash
cd packages/client/
```

12. Install dependancies

```bash
npm install
```

13. Start the frontend server

```bash
npm start
```

14. Open a new browser tab and navigate to `http://localhost:5173/` or click [here](http://localhost:5173/) to view the frontend application.

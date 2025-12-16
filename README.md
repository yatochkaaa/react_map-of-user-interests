# Users Map Demo

Interactive map displaying users with clustering and interest-based filtering.

## Features

- User markers with clustering.
- Donut clusters showing interest distribution.
- Interest filter with icons.
- Popup with avatar and interest badges.
- User generation using `faker.js`.

## Installation

```bash
# Clone the repository
git clone https://github.com/yatochkaaa/react_map-of-user-interests.git
cd react_map-of-user-interests
```

№# Install dependencies
```bash
npm install
```

## Generating Users

By default, the project includes `public/users.json` with 10,000 users.  
Running the generation script is optional and only needed if you want to change the number of users.

The users are stored in `public/users.json`. To generate or change the number of users:

1. Open `scripts/generate-users.ts`.
2. Update the `USERS_COUNT` constant:

```ts
const USERS_COUNT = 10000; // Set the desired number of users
```

## Run the generation script

```bash
npm run generate:users
```

After running the script, `public/users.json` will contain the generated users.

## Running the App
Once the users are generated, you can start the development server:

```bash
npm run dev
```

This will start the app at `http://localhost:5173`.
Open it in your browser to see the interactive map with users, clusters, and filters.

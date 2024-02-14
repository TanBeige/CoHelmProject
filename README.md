## Some reasonings
- **NPM**: I chose to use npm instead of yarn for this project as it is a small project. In a production environment, I recommend yarn.
- **Monorepo with two separate run functions**: It is easier to develop and test separately if running the frontend and backend separately in terminal. In deployment, might be nice to have a single script that runs both separately and reports events and issues to different loggers.
- **React Context**: For any larger application, I recommend using React Redux as the state is more persistent throughout the application than context (specifically in nested components). I am using React context here because this is a small application that only needs to store a few state variables.
- **Using Websocket** - I decided to use a websocket instead of a normal HTTP API so I can update the loading state on the frontend based on what the backend is working on. Don't think this was necessary but why not.

## Run frontend
First, install dependencies
```bash
npm install
```

then, run the development server
```bash
npm run dev
```

### Structure

- The application-level reusable components are in a folder that starts with lowercase letters, the page-specific components are in uppercase letter folders in the "components" folder.


## Run backend
Again, first install dependencies
```bash
npm install
```

then, run the server
```bash
npm run start
```

or if you want to make changes and test, you can run it with NodeMon:
```bash
npm run dev
```

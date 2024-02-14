import { server } from "./server"
const dotenv = require('dotenv');

dotenv.config();

const port = process.env.PORT;

// app.get('/', (req: any, res: any) => {
//   res.send('Express + TypeScript Server');
// });

server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
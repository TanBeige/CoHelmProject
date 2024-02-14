import { Socket } from "socket.io";

import { promises as fs } from 'fs';
import path from 'path';

// Normally, in a production environment, you would combine this with a user ID, in case they close out of the window while the backend still runs the function and updates the database.
export async function process_function(socket: Socket, data: any) {

  socket.emit("process_update", { message: "Processing step 1" });
  await delay(2000);
  socket.emit("process_update", { message: "Processing step 2" });
  await delay(3000);
  socket.emit("process_update", { message: "Processing final step" });
  await delay(2000);

  // Get JSON data and return to client
  let jsonData = null
  try {
    const filePath = path.join(__dirname, '../../mock_res/example-response.json');
    jsonData = await readJsonFile(filePath);
  } catch(err) {
    throw err
  }

  // Send final event back to client, along with JSON data
  socket.emit("process_completed", { message: "Process completed", data: jsonData });
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Boilterplate code that reads JSON data so I can return via websocket
async function readJsonFile(filePath: string): Promise<any> {
  try {
      const data = await fs.readFile(filePath, { encoding: 'utf8' });
      return JSON.parse(data);
  } catch (error) {
      console.error('Error reading JSON file:', error);
      throw error;
  }
}
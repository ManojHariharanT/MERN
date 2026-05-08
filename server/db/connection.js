import { MongoClient, ServerApiVersion } from "mongodb";
import dns from "node:dns";

dns.setServers(
  (process.env.NODE_DNS_SERVERS || "8.8.8.8,1.1.1.1")
    .split(",")
    .map((server) => server.trim())
    .filter(Boolean)
);

const uri = process.env.ATLAS_URI || "";

if (!uri.startsWith("mongodb://") && !uri.startsWith("mongodb+srv://")) {
  throw new Error(
    'ATLAS_URI must start with "mongodb://" or "mongodb+srv://". Check your .env file.'
  );
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;

try {
  // Connect the client to the server
  await client.connect();
  // Send a ping to confirm a successful connection
  await client.db("admin").command({ ping: 1 });
  console.log(
    "Pinged your deployment. You successfully connected to MongoDB!"
  );
  db = client.db("employees");
} catch(err) {
  console.error("Failed to connect to MongoDB:", err.message);
  process.exit(1);
}

export default db;

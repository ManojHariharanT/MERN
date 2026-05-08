import dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";
import dns from "node:dns";

dotenv.config({ path: "config.env" });

dns.setServers(
  (process.env.NODE_DNS_SERVERS || "8.8.8.8,1.1.1.1")
    .split(",")
    .map((server) => server.trim())
    .filter(Boolean)
);

const records = [
  {
    name: "Jesse Hall",
    position: "Developer Advocate",
    level: "Senior",
  },
  {
    name: "Kushagra Kesav",
    position: "Community Triage Engineer",
    level: "Junior",
  },
  {
    name: "Stanimira Vlaeva",
    position: "Developer Advocate",
    level: "Senior",
  },
];

const client = new MongoClient(process.env.ATLAS_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

try {
  await client.connect();
  const collection = client.db("employees").collection("records");

  const results = await Promise.all(
    records.map((record) =>
      collection.updateOne(record, { $setOnInsert: record }, { upsert: true })
    )
  );

  results.forEach((result, index) => {
    const action = result.upsertedCount ? "inserted" : "already exists";
    console.log(`${records[index].name}: ${action}`);
  });
} finally {
  await client.close();
}

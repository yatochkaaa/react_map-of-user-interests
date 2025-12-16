import { faker } from "@faker-js/faker";
import { writeFileSync, mkdirSync } from "fs";
import path from "path";

const outputPath = path.join(process.cwd(), "public", "users.json");

const users = Array.from({ length: 500 }, () => ({
  _id: faker.string.uuid(),
  lat: faker.location.latitude(),
  lon: faker.location.longitude(),
  fullName: faker.person.fullName(),
  interests: faker.helpers.arrayElements(
    [
      "hiking",
      "cooking",
      "traveling",
      "reading",
      "gaming",
      "music",
      "sports",
      "photography",
      "art",
      "technology",
    ],
    { min: 1, max: 4 }
  ),
}));

mkdirSync(path.dirname(outputPath), { recursive: true });
writeFileSync(outputPath, JSON.stringify(users, null, 2), "utf-8");

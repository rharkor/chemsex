import { db as database } from "../src/database";
import { userTable } from "../src/schemas/user";

const main = async () => {
  const result = await database.select().from(userTable);
  console.log(result);
};

void main()
  // eslint-disable-next-line unicorn/no-process-exit
  .then(() => process.exit(0));

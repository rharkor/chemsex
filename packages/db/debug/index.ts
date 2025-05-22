import { db } from "../src/database";
import { usersTable } from "../src/schema/user";

const main = async () => {
  const result = await db.select().from(usersTable);
  console.log(result);
};

main()
  .catch(console.error)
  .then(() => process.exit(0));

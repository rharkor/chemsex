import { db } from "../src/database";
import { userTable } from "../src/schema/user";

const main = async () => {
  const result = await db.select().from(userTable);
  console.log(result);
};

main()
  .catch(console.error)
  .then(() => process.exit(0));

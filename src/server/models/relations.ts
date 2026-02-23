import { defineRelations } from "drizzle-orm/relations";
import * as schema from "./index";

export const relations = defineRelations(schema, (r) => ({
  UserTable: {
    sessions: r.many.SessionTable(),
    accounts: r.many.AccountTable(),
  },
  SessionTable: {
    user: r.one.UserTable({
      from: r.SessionTable.userId,
      to: r.UserTable.id,
    }),
  },
  AccountTable: {
    user: r.one.UserTable({
      from: r.AccountTable.userId,
      to: r.UserTable.id,
    }),
  },
}));

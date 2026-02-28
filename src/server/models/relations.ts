import { defineRelations } from "drizzle-orm/relations";
import * as schema from "./index";

export const relations = defineRelations(schema, (r) => ({
  UserTable: {
    sessions: r.many.SessionTable(),
    accounts: r.many.AccountTable(),
    members: r.many.MemberTable(),
    invitations: r.many.InvitationTable(),
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
  OrganizationTableDb: {
    members: r.many.MemberTable(),
    invitations: r.many.InvitationTable(),
  },
  MemberTable: {
    organization: r.one.OrganizationTableDb({
      from: r.MemberTable.organizationId,
      to: r.OrganizationTableDb.id,
    }),
    user: r.one.UserTable({
      from: r.MemberTable.userId,
      to: r.UserTable.id,
    }),
  },
  InvitationTable: {
    organization: r.one.OrganizationTableDb({
      from: r.InvitationTable.organizationId,
      to: r.OrganizationTableDb.id,
    }),
    user: r.one.UserTable({
      from: r.InvitationTable.inviterId,
      to: r.UserTable.id,
    }),
  },
}));

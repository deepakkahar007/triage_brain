import { createAccessControl } from "better-auth/plugins/access";
import {
  defaultStatements,
  adminAc,
} from "better-auth/plugins/organization/access";

const statement = {
  ...defaultStatements,
  project: [
    "manage_platform",
    "manage_org",
    "manage_orgs",
    "manage_users",
    "manage_rules",
    "manage_kb",
    "manage_integrations",
    "manage_billing",
    "manage_models",
    "manage_tickets",
    "read_tickets",
    "update_tickets",
    "create_feedback",
    "view_analytics",
    "view_ai",
    "view_audit",
  ],
} as const;

const ac = createAccessControl(statement);

const superadmin = ac.newRole({
  project: [
    "manage_platform",
    "manage_orgs",
    "manage_users",
    "manage_billing",
    "manage_integrations",
    "manage_models",
    "view_analytics",
    "view_audit",
  ],
  ...adminAc.statements,
});

const owner = ac.newRole({
  project: [
    "manage_org",
    "manage_users",
    "manage_rules",
    "manage_kb",
    "manage_integrations",
    "manage_billing",
    "view_analytics",
    "view_ai",
    "view_audit",
    "manage_tickets",
  ],
});

const admin = ac.newRole({
  project: [
    "manage_users",
    "manage_rules",
    "manage_kb",
    "manage_tickets",
    "view_analytics",
    "view_ai",
    "view_audit",
  ],
});

const agent = ac.newRole({
  project: [
    "read_tickets",
    "update_tickets",
    "create_feedback",
    "view_ai",
    "view_audit",
  ],
});

const viewer = ac.newRole({
  project: ["read_tickets", "view_analytics", "view_ai"],
});

export { ac, superadmin, admin, owner, agent, viewer };

import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import config from "../config/index.js";

import * as noticeSchema from "./schemas/notice.schema.js";
import * as noticesToTagsSchema from "./schemas/notices_to_tags.schema.js";
import * as tagSchema from "./schemas/tags.schema.js";
import * as userSchema from "./schemas/users.schema.js";
import * as roleSchema from "./schemas/roles.schema.js";
import * as permissionSchema from "./schemas/permissions.schema.js";
import * as userRolesSchema from "./schemas/userRoles.schema.js";
import * as rolePermissionsSchema from "./schemas/rolePermissions.schema.js";
import * as carouselSchema from "./schemas/carousels.schema.js";
import * as fileSchema from "./schemas/file.schema.js";
import * as directorMessageSchema from "./schemas/director_message.schema.js";
import * as eventSchema from "./schemas/event.schema.js";
import * as newsSchema from "./schemas/news.schema.js";

const schema = {
  ...noticeSchema,
  ...noticesToTagsSchema,
  ...tagSchema,
  ...userSchema,
  ...roleSchema,
  ...permissionSchema,
  ...userRolesSchema,
  ...rolePermissionsSchema,
  ...fileSchema,
  ...carouselSchema,
  ...directorMessageSchema,
  ...eventSchema,
  ...newsSchema,
};

const pool = new pg.Pool({
  connectionString: config.db.url,
});

export const db = drizzle(pool, { schema });

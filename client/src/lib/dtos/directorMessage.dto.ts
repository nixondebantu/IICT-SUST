import { z } from "zod";
import { directorMessageValidator } from "../validators/directorMessage.validator";

export type DirectorMessage = z.infer<typeof directorMessageValidator>;
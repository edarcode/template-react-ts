import { z } from "zod";

export const pageSchema = z.coerce.number().min(1);

import { z } from "zod";

export const imgSchema = z.string().url();

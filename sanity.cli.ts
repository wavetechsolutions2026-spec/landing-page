// Sanity CLI settings, used by commands such as `npx sanity schemas deploy`.
import { defineCliConfig } from "sanity/cli";
import { dataset, projectId } from "./src/sanity/env";

export default defineCliConfig({
  api: { projectId, dataset },
});

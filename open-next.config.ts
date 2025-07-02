// open-next.config.ts
// OpenNext.js configuration for Cloudflare Workers with Node.js compatibility
import { defineCloudflareConfig } from "@opennextjs/cloudflare/config";
//import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";

export default defineCloudflareConfig({
  // Optional: Enable R2 incremental cache for better ISR performance
  //incrementalCache: r2IncrementalCache,
});

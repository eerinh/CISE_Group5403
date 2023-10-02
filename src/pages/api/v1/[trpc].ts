import { createOpenApiNextHandler } from "trpc-openapi";
import { env } from "~/env.mjs";
import { appRouter } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";

// export API handler
export default createOpenApiNextHandler({
    router: appRouter,
    createContext: createTRPCContext,
    onError:
        env.NODE_ENV === "development"
            ? ({ path, error }) => {
                  console.error(`❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`);
              }
            : undefined,
});
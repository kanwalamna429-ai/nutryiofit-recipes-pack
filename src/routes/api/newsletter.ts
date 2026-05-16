import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/newsletter")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as { email?: string };
          const email = body.email?.trim();
          if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return Response.json(
              { success: false, error: "Please enter a valid email address." },
              { status: 400 },
            );
          }
          console.log("[newsletter]", { email });
          return Response.json({
            success: true,
            message: "You're subscribed! Thanks for joining.",
          });
        } catch {
          return Response.json(
            { success: false, error: "Invalid request." },
            { status: 400 },
          );
        }
      },
    },
  },
});

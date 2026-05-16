import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as {
            name?: string;
            email?: string;
            subject?: string;
            message?: string;
          };
          if (!body.name || !body.email || !body.message) {
            return Response.json(
              { success: false, error: "Name, email, and message are required." },
              { status: 400 },
            );
          }
          console.log("[contact]", {
            name: body.name,
            email: body.email,
            subject: body.subject,
          });
          return Response.json({
            success: true,
            message: "Thanks! Your message has been received. We'll get back to you within 2–3 business days.",
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

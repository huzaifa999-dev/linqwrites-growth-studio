import { createFileRoute } from "@tanstack/react-router";
import { LinqLanding } from "@/components/linq/LinqLanding";

export const Route = createFileRoute("/")({
  component: LinqLanding,
});

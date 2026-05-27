import type { Metadata } from "next";
import { AboutPage } from "./AboutPage";

export const metadata: Metadata = {
  title: "About — Better Machine",
  description: "Better Machine is an AI-native startup lab founded by Erik Ross. Named after people who matter, built with purpose, and allergic to the status quo.",
  openGraph: {
    title: "About — Better Machine",
    description: "Why exist in a state of suck? Better Machine is a native AI startup lab turning lived experience into ventures that matter.",
    type: "website",
  },
};

export default function About() {
  return <AboutPage />;
}

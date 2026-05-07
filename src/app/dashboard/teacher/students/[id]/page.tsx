import React from "react";
import StudentDetailClient from "./StudentDetailClient";

export function generateStaticParams() {
  // Prerender pages for these student IDs for the static export
  return [
    { id: "1" },
    { id: "2" },
    { id: "1042" },
    { id: "1045" },
    { id: "1048" },
    { id: "1051" },
    { id: "1054" },
    { id: "1059" }
  ];
}

export default async function StudentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return <StudentDetailClient id={resolvedParams.id} />;
}

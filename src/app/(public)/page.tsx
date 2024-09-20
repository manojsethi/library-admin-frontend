import Image from "next/image";
import type { Metadata } from "next";

export default function Home() {
  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to the Library Management System
      </h1>
      <p className="text-lg">Your gateway to managing libraries efficiently.</p>
    </div>
  );
}

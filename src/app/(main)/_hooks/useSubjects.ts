"use client";
import { useState, useEffect } from "react";
import { getSubjects } from "@/lib/api/subjects-api/subjects.api";
import type { Subject } from "@/lib/types/subjects";

export function useSubjects() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await getSubjects();
        setSubjects(data.items); // items = subjects[] from API
      } catch (err) {
        setError("Failed to load subjects");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { subjects, loading, error };
}

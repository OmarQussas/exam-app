"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import type { Subject } from "@/lib/types/subjects.d.ts";
import { useEffect } from "react";
import SubjectCard from "./subject-card";

const Limit = 10;

type SubjectsListProps = { initialItems: Subject[] };

export default function SubjectsList({ initialItems }: SubjectsListProps) {
  //Translation

  //Navigation

  //State

  //Ref

  //Context

  //Query

  //Mutation

  // Hooks
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["subjects"],
      initialPageParam: 1,
      queryFn: async ({ pageParam }) => {
        const res = await fetch(
          `/api/subjects?page=${pageParam}&limit=${Limit}`,
          {
            cache: "no-store",
          }
        );
        if (!res.ok) throw new Error("Failed to fetch subjects");

        return res.json();
      },
      getNextPageParam: (lastPage, allPages) => {
        // If last page returned fewer than Limit, stop. Else fetch next (pages.length+1)
        const len = (lastPage?.subjects ?? []).length;
        return len < Limit ? undefined : allPages.length + 1;
      },
      // Seed with server-fetched items so it doesn't refetch page 1
      initialData: {
        pageParams: [1],
        pages: [{ subjects: initialItems }],
      },
    });

  // Form & Validation

  // Variables

  const subjects =
    data?.pages.flatMap((p: { subjects: Subject[] }) => p.subjects) ?? []; // Flat map collects all the previous array into what flattened array

  // Functions

  // Effects

  return (
    <main className="p-4">
      <h2 className="text-xl font-semibold mb-4">Subjects</h2>

      <InfiniteScroll
        dataLength={subjects.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={null}
        scrollableTarget="scrollableDiv"
      >
        <div className="grid grid-cols-3 gap-4">
          {subjects.map((subject) => (
            <SubjectCard key={subject._id} subject={subject} />
          ))}
        </div>
      </InfiniteScroll>
    </main>
  );
}

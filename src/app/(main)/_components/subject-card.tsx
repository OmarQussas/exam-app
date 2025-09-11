import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import type { Subject } from "@/lib/types/subjects.d.ts";

function SubjectCard({ subject }: { subject: Subject }) {
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false); // ✅ new loading state
  const imgRef = useRef<HTMLImageElement | null>(null);
  const router = useRouter();

  //Translation

  //Navigation

  //State

  //Ref

  //Context

  //Query

  //Mutation

  // Hooks

  // Form & Validation

  // Variables

  // Functions
  const handleClick = () => {
    setLoading(true); // ✅ show loader instantly
    router.push(`/subjects/${subject._id}`);
  };

  // Effects

  useEffect(() => {
    if (imgRef.current?.complete) {
      setLoaded(true);
    }
  }, []);

  return (
    <div
      className="flex flex-col items-center relative shadow-sm cursor-pointer"
      onClick={handleClick}
    >
      <img
        ref={imgRef}
        src={subject.icon}
        alt={subject.name}
        className="w-full object-contain rounded-none"
        loading="lazy"
        onLoad={() => setLoaded(true)}
      />

      {/* Overlay loader when navigating */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {loaded && !loading && (
        <span className="text-center font-medium absolute bg-[#155DFC80] text-white font-geistMono w-[90%] bottom-5 py-4 transition-opacity duration-300">
          {subject.name}
        </span>
      )}
    </div>
  );
}

export default SubjectCard;

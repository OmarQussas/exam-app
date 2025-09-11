import DiplomasTitle from "../_components/diplomas-title";
import SubjectsList from "../_components/subject-list";
import { getSubjects } from "@/lib/api/subjects-api/subjects.api";
import { RiGraduationCapLine } from "react-icons/ri";

export default async function Home() {
  const payload = await getSubjects();

  return (
    <main className="">
      <DiplomasTitle title={"Diplomas"} icon={<RiGraduationCapLine />} />
      <div
        id="scrollableDiv"
        className="pb-2 border-b border-gray-200 h-[85vh] overflow-y-auto"
        style={{
          scrollbarWidth: "none", // Firefox
        }}
      >
        <SubjectsList initialItems={payload.subjects} />
      </div>
    </main>
  );
}

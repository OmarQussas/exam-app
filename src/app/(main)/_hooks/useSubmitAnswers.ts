import { useMutation } from "@tanstack/react-query";

export function useSubmitAnswers() {
  return useMutation({
    mutationFn: async (payload: any) => {
      const res = await fetch("/api/submit-answers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to submit answers");
      }

      return res.json();
    },
  });
}

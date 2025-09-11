import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

type ResultsProps = {
  result: {
    correct: number;
    wrong: number;
    total: string;
    correctQuestions: { Question: string }[];
    WrongQuestions: { Question: string }[];
  };
};

export default function Results({ result }: ResultsProps) {
  //Translation

  //Navigation

  //State
  const [loading, setLoading] = useState(true);

  //Ref

  //Context

  //Query

  //Mutation

  // Hooks

  // Form & Validation

  // Variables
  const data = [
    { name: "Correct", value: result.correct },
    { name: "Wrong", value: result.wrong },
  ];

  const COLORS = ["#22c55e", "#ef4444"]; // green, red

  // Functions

  // Effects

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // fake delay
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-6">
        <span className="animate-spin w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full"></span>
        <p className="ml-2 text-gray-600">Loading results...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {/* Left Section */}
      <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-4">Statistics</h2>

        <PieChart width={220} height={220}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>

        {/* Numbers */}
        <div className="mt-6 flex justify-around w-full">
          <div className="text-center">
            <p className="text-green-600 text-lg font-bold">{result.correct}</p>
            <p className="text-gray-500 text-sm">Correct</p>
          </div>
          <div className="text-center">
            <p className="text-red-600 text-lg font-bold">{result.wrong}</p>
            <p className="text-gray-500 text-sm">Wrong</p>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="bg-white rounded-2xl shadow p-6 flex flex-col">
        <h2 className="text-xl font-semibold mb-4">Answers Overview</h2>

        <div className="overflow-y-auto max-h-80 space-y-3 pr-2">
          {/* Wrong Answers */}
          {result.WrongQuestions.length > 0 && (
            <div>
              <h3 className="text-red-600 font-semibold mb-2">Wrong Answers</h3>
              <ul className="space-y-1">
                {result.WrongQuestions.map((q, i) => (
                  <li key={i} className="text-red-500">
                    ❌ {q.Question}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Correct Answers */}
          {result.correctQuestions.length > 0 && (
            <div className="mt-4">
              <h3 className="text-green-600 font-semibold mb-2">
                Correct Answers
              </h3>
              <ul className="space-y-1">
                {result.correctQuestions.map((q, i) => (
                  <li key={i} className="text-green-600">
                    ✅ {q.Question}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

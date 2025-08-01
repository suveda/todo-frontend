"use client";

import { useRouter } from "next/navigation";
import Layout from "../../components/layout";
import TaskForm from "../../components/taskform";
import { useTasks } from "../../components/taskcontext";
import Leftarrow from "../../components/leftarrow";
import Plus from "../../components/plus";

export default function CreateTaskPage() {
  const { addTask } = useTasks();
  const router = useRouter();

  return (
    <Layout>
      <div className="flex flex-col items-center pt-10">
        <div className="w-full max-w-xl flex items-center mb-8">
          <button
            className="mr-4 px-3 py-2 rounded hover:bg-[#232323] text-lg text-[#1E6F9F] font-semibold transition-colors"
            onClick={() => router.push("/")}
          >
            <Leftarrow />
          </button>
        </div>
        <div className="w-full max-w-xl bg-[#262626] rounded-2xl shadow-lg px-6 py-8 border border-[#333]">
          <TaskForm
            onSubmit={(title, color) => {
              addTask({ title, color });
              router.push("/");
            }}
            onCancel={() => router.push("/")}
            submitLabel="Add Task"
            submitIcon={<Plus />}
          />
        </div>
      </div>
    </Layout>
  );
}

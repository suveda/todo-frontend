"use client";

import { useParams, useRouter } from "next/navigation";
import Layout from "../../../components/layout";
import { useTasks } from "../../../components/taskcontext";
import TaskForm from "../../../components/taskform";
import Leftarrow from "../../../components/leftarrow";

export default function EditTaskPage() {
  const { id } = useParams();
  const router = useRouter();
  const { tasks, updateTask } = useTasks();

  const task = tasks.find(t => t.id == id);

  if (!task) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <p className="mb-4 text-white">Task not found.</p>
            <button 
              className="text-[#1E6F9F] hover:underline" 
              onClick={() => router.push("/")}
            >
              <Leftarrow />
            </button>
          </div>
        </div>
      </Layout>
    );
  }

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
            initialTitle={task.title}
            initialColor={task.color || "#4F46E5"}
            onSubmit={(title, color) => {
              updateTask(task.id, { title, color });
              router.push("/");
            }}
            onCancel={() => router.push("/")}
            submitLabel="Save"
            submitIcon={
              <svg width={22} height={22} viewBox="0 0 20 20" fill="none">
                <path d="M5 10.5l4 4 6-7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
          />
        </div>
      </div>
    </Layout>
  );
}

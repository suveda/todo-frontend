"use client";

import { useRouter } from "next/navigation";
import Layout from "../components/layout";
import Clipboard from "../components/clipboard";
import Plus from "../components/plus";
import TaskCard from "../components/taskcard";
import { useTasks } from "../components/taskcontext";

export default function HomePage() {
  const { tasks, toggleComplete, deleteTask } = useTasks();
  const router = useRouter();

  const handleEditTask = (id: string | number) => {
    router.push(`/edit/${id}`);
  };

  const handleCreateTask = () => {
    router.push("/create");
  };

  return (
    <Layout 
      showCreateButton={true} 
      onCreateClick={handleCreateTask}
      createButtonContent={
        <>
          Create Task
          <Plus />
        </>
      }
    >
      <div className="flex flex-col items-center">
        
        <div className="max-w-2xl w-full mt-14 flex flex-col items-center">
          <div className="flex w-[736px] h-[52px] justify-between text-sm mb-2">
            <span className="flex items-center gap-2">
              <span className="text-blue-400 font-bold">Tasks</span>
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#333] text-xs font-extrabold">{tasks.length}</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="text-purple-400 font-bold">Completed</span>
              <span className="inline-flex items-center justify-center h-6 px-4 rounded-full bg-[#333] text-xs font-extrabold">
                {`${tasks.filter(t => t.completed).length} of ${tasks.length}`}
              </span>
            </span>
          </div>
          <div className="w-[736px] h-px bg-[#222]" />

          {/* Home View */}
          {tasks.length === 0 ? (
            <div className="w-[736px] rounded-md flex flex-col items-center py-16">
              <Clipboard />
              <div className="text-[#52525B] text-center font-semibold mb-1">
                You don't have any tasks registered yet.
              </div>
              <div className="text-[#52525B] text-center text-sm">
                Create tasks and organize your to-do items.
              </div>
            </div>
          ) : (
            <div className="w-[736px] mt-4 space-y-3">
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  color={task.color || "#4F46E5"}
                  completed={task.completed}
                  onDelete={deleteTask}
                  onToggle={toggleComplete}
                  onEdit={handleEditTask}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

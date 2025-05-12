"use client"

import { useState, useEffect } from "react"
import { Task } from "../types/task"
import { Table } from "../components/table"
import { Button } from "../components/button"
import { Modal } from "../components/modal"

export default function Page() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [newTask, setNewTask] = useState<Task>({
    title: "",
    content: "",
  });

  useEffect(() => {
    const tasks = localStorage.getItem("tasks");

    if (tasks) {
      setTasks(JSON.parse(tasks));
    }
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } else {
      localStorage.removeItem("tasks");
    }
  }, [tasks]);

  useEffect(() => {
    const saved = localStorage.getItem("modalOpen");
    if (saved === "true") {
      setIsOpen(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("modalOpen", isOpen.toString());
  }, [isOpen]);

  return (
    <>
      <div className="ml-10 mt-10">
        <h1 className="font-bold text-3xl">タスク一覧</h1>

        <div className="my-5">
          <Table tasks={tasks}></Table>
        </div>

        {isOpen && (
          <Modal onClose={() => setIsOpen(false)}>
            <form>
              <div className="flex flex-col">
                <label htmlFor="taskName">タスク名</label>
                <input 
                  type="text" 
                  id="taskName"
                  className="border p-2"
                  value={newTask.title}
                  onChange={(e) => 
                    setNewTask({ ...newTask, title: e.target.value})
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();

                      setTasks([...tasks, newTask]);
                      setIsOpen(false);
                      setNewTask({ title: "", content: ""});
                    }
                  }}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="taskValue">内容</label>
                <textarea 
                  id="taskValue"
                  className="border p-2"
                  value={newTask.content}
                  onChange={(e) => 
                    setNewTask({ ...newTask, content: e.target.value})
                  }
                />
              </div>

              <div className="flex mt-5 w-[150px] justify-between">
                <Button onClick={() => setIsOpen(false)}>キャンセル</Button>
                <Button onClick={() => {
                  setTasks([...tasks, newTask]);
                  setIsOpen(false);
                  setNewTask({ title: "", content: ""});
                }}
                >
                  追加
                </Button>
              </div>
            </form>
          </Modal>
        )}

        <div>
          <Button onClick={() => setIsOpen(true)}>タスクを追加</Button>
        </div>
      </div>
    </>
  );
}
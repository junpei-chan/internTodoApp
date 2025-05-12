"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/button";
import { Task } from "@/app/types/task";
import { Modal } from "@/app/components/modal";

type Props = {
  params: Promise<{
    index: string;
  }>;
}

export default function Page({ params } : Props) {
  const index = parseInt(use(params).index);
  const router = useRouter();
  const [task, setTask] = useState<Task>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");

    if (storedTasks) {
      const parsedTasks = JSON.parse(storedTasks);
      setTasks(parsedTasks);
      setTask(parsedTasks[index]);
    }
  }, [index]);

  if (!task) {
    return;
  }

  return (
    <>
      <div className="ml-10 mt-10">
        <h1 className="font-bold text-3xl">タスク詳細</h1>

        <div className="my-5">
          <div className="inline-block border w-[200px]">
            <label 
              htmlFor="taskName"
              className="font-bold pl-2"
            >
              タスク名
            </label>
            <p 
              id="taskName"
              className="border-t py-2 pl-2"
            >
              {task.title}
            </p>
          </div>

          <div className="inline-block border-y border-r w-[200px]">
            <label 
              htmlFor="taskContent"
              className="font-bold pl-2"
            >
              内容
            </label>
            <p 
              id="taskContent"
              className="border-t py-2 pl-2"
            >
              {task.content}
            </p>
          </div>
        </div>

        <div className="flex">
          <Button
            onClick={() => {
              router.push("/task");
            }}
          >
            戻る
          </Button>

          <div className="ml-10">
            <Button onClick={() => setIsOpen(true)}>編集</Button>

            <Button
              onClick={() => {
                const newTasks = tasks.filter((_, i) => i !== index);

                localStorage.setItem("tasks", JSON.stringify(newTasks));

                router.push("/task");
              }}
            >
              削除
            </Button>
          </div>
        </div>

        {isOpen && (
          <Modal onClose={() => setIsOpen(false)}>
            <form>
              <div>
                <label 
                  htmlFor="taskName"
                  className="border-r pr-2 mr-2 font-bold"
                >
                  タスク名
                </label>
                <input 
                  type="text" 
                  id="taskName"
                  autoComplete="off"
                  value={task.title}
                  onChange={(e) => setTask({ ...task, title: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="taskContent">内容</label>
                <textarea 
                  id="taskContent"
                  value={task.content}
                  autoComplete="off"
                  onChange={(e) => setTask({ ...task, content: e.target.value })}
                ></textarea>
              </div>

              <div>
                <Button onClick={() => setIsOpen(false)}>キャンセル</Button>

                <Button
                  onClick={() => {
                    const newTasks = tasks.map((t, i) => 
                      i === index ? task : t);
                    
                    localStorage.setItem("tasks", JSON.stringify(newTasks));

                    router.push("/task");
                  }}
                >
                  更新
                </Button>
              </div>
            </form>
          </Modal>
        )}
      </div>
    </>
  )
}
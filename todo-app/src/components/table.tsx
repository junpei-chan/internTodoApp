import { useRouter } from "next/navigation";
import { Task } from "@/app/types/task";
import { Button } from "./button";

type Props = {
  tasks: Task[];
}

export function Table({ tasks } : Props) {
  const router = useRouter();

  return (
    <>
      <table>
        <thead>
          <tr>
            <th className="border px-5 py-1">
              <p>タイトル</p>
            </th>
            <th className="border px-5 py-1">
              <p>内容</p>
            </th>
            <th className="border px-5 py-1">
              {/* ここはボタンのスペースらしい */}
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index}>
              <th className="border px-5 py-1">
                <p>{task.title}</p>
              </th>
              <td className="border px-5 py-1">
                <p>{task.content}</p>
              </td>
              <td className="border px-5 py-1">
                <Button
                  onClick={() => {
                    router.push(`/task/${index}`);
                  }}
                >
                  詳細
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
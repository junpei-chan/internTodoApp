"use client";

import { useState, useEffect } from "react";

export default function Top() {
  const title = "タイトルです";
  const bool = true;

  const users = [
    {name : "西田", age : 20},
    {name : "山田", age : 25},
    {name : "横田", age : 30},
  ];

  const [value, setValue] = useState("ここ注目！");
  const [text, setText] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(text.length);
  });

  return (
    <>
      <div className="text-center">
        <div className="font-bold text-2xl">Next.js</div>
        <div>{title}</div>
        <div>{bool ? "true!!" : "false!!"}</div>
      </div>

      <table className="flex justify-center mt-10">
        <tbody>
          {users.map((user, i) => (
            <tr key={i}>
              <td className="border p-2">{user.name + "氏"}</td>
              <td className="border p-2">{"年齢 : " + user.age}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <form className="flex justify-center mt-10">
        <label htmlFor="inputDesu">入力してね</label>

        <input 
          type="text" 
          className="border mx-5"
          id="inputDesu"
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />

        <div>
          {value}
        </div>
      </form>

      <div className="flex flex-col w-[300px] mt-10 mx-auto">
        <input 
          type="text"
          className="border w-[300px]"
          onChange={(e) => {
            setText(e.target.value);
          }}
        />

        <p className="my-5">入力値 : {text}</p>
        <p>文字数 : {count}</p>
      </div>
    </>
  );
}
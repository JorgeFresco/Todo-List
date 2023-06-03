"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

type TodoItemProps = {
  id: string;
  title: string;
  complete: boolean;
  toggleTodo: (id: string, complete: boolean) => void;
  deleteTodo: (id: string) => void;
};

export default function TodoItem({
  id,
  title,
  complete,
  toggleTodo,
  deleteTodo,
}: TodoItemProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);

  // inline loading UI
  const isMutating = isFetching || isPending;

  async function handleDelete(id: string) {
    setIsFetching(true);
    deleteTodo(id);
    setIsFetching(false);
    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <li
      className="flex gap-2 m-1 items-center"
      style={{ opacity: !isMutating ? 1 : 0.6 }}
    >
      <input
        id={id}
        type="checkbox"
        className="cursor-pointer peer"
        defaultChecked={complete}
        onChange={(e) => toggleTodo(id, e.target.checked)}
      />
      <label
        htmlFor={id}
        className="cursor-pointer peer-checked:line-through peer-checked:text-slate-500"
      >
        {title}
      </label>
      <button
        type="button"
        id={id}
        className="ml-1 border border-red-500 text-red-500 
        rounded px-1 py-0 hover:bg-slate-600 focus-within:bg-slate-700 outline-none"
        onClick={() => handleDelete(id)}
      >
        X
      </button>
    </li>
  );
}

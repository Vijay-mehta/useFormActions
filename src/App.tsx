import { useActionState } from "react";

import "./App.css";

function App() {
  const login = async (_: any, formData: any) => {
    const username = formData.get("username");
    const password = formData.get("password");
    if (!username || !password) {
      return { success: false, message: "Username and password are required" };
    }
    if (password.length < 6) {
      return {
        success: false,
        message: "Password must be at least 6 characters",
      };
    }
    const data = await fetch("https://dummyjson.com/user/login", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await data.json();
    return result;
  };

  const [state, formAction, isPending] = useActionState(login, {
    success: null,
    err: "",
  });

  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen ">
      <form action={formAction} className="bg-gray-500 py-17 px-18">
        <input className="border-2 border-white" name="username" type="text" />
        <input
          className="border-2 border-white"
          name="password"
          type="password"
        />
        <button
          disabled={isPending}
          className="bg-black text-white"
          type="submit"
        >
          {isPending ? "Submitting..." : "Submit"}
        </button>
        {state.success && <p>Login successful</p>}
        {state.success === false && <p>{state.err}</p>}
        {state.message && <p>{state.message}</p>}
      </form>
      <h2>emilys</h2>
      <h2>emilyspass</h2>
    </div>
  );
}

export default App;

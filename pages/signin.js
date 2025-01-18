import { useRouter } from "next/router";
import { useState } from "react";

function signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const signinHandler = async () => {
    const res = await fetch("/api/auth/signin", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data);
    if (data.status === "success") {
      router.push("/dashboard");
    }
  };
  return (
    <div>
      <h3>Signup Form</h3>
      <input
        placeholder="Email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password"
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signinHandler}>Login</button>
    </div>
  );
}

export default signin;

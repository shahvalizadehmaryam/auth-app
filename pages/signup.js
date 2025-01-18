import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") window.location.href = "/dashboard";
      });
  }, []);
  const signupHandler = async () => {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data);
    // if (data.status === "success") {
    //   router.push("/signin");
    // }
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
      <button onClick={signupHandler}>Sign up</button>
    </div>
  );
}

export default signup;

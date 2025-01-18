import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href="/signup">Signup</Link>
      <button>
        <Link href="/signin">Signin</Link>
      </button>
    </div>
  );
}

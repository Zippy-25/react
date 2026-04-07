import { useState } from "react";

export default function LoginPage({setIsLoggedIn}) {
  const [username, setUsername] = useState("")
  const [pass, setPass] = useState("")

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          username: username, 
          password: pass})
      })

      const data = await res.json()
      console.log(data)

      if(res.ok) setIsLoggedIn(true);

    } catch (err) {
      console.log("Error:", err)
    }
  }

  return (
    <div className="LoginPage">
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username" id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)
          } />
        <label htmlFor="password"> password:</label>
        <input type="password" name="password" id="password"
          value={pass}
          onChange={(event) => setPass(event.target.value)} />
        <input type="submit" />
      </form>
    </div>
  )
}




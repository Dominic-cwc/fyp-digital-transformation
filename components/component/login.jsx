import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";

export default function login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginstatus, setLoginstatus] = useState("");
  const [loggingin, setLoggingin] = useState(false);

  const login = () => {
    setLoggingin(true);
    axios
      .post("http://localhost:3000/api/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        if (res.data.message === "Please fill in all fields") {
          setLoginstatus(res.data.message);
        } else if (res.data.message === "Username or password is incorrect") {
          setLoginstatus(res.data.message);
        } else {
          setLoginstatus("");
          setLoggingin(false);
          setUser(res.data);
        }
        setLoggingin(false);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Card
        className="mx-auto max-w-md"
        style={{
          width: "40rem",
        }}
      >
        <CardHeader className="space-y-1">
          <h1 className="text-3xl font-bold mb-4 text-center">
            DECC System V1.0
          </h1>

          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription className="text-gray-500">
            Please enter your username and password to login.
          </CardDescription>
          <CardDescription className="text-red-500">
            {loginstatus}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="font-semibold">
                Username
              </Label>
              <Input
                id="username"
                placeholder="Enter your username"
                required
                type="text"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="font-semibold">
                Password
              </Label>
              <Input
                id="password"
                placeholder="Enter your password"
                required
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button
              id="loginbtn"
              className="w-full bg-gray-950 text-white font-semibold"
              onClick={login}
            >
              {loggingin ? (
                <img src="icons/loading.gif" className="w-7 h-7" />
              ) : (
                "Login"
              )}
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don't have an account?
            <Link className="underline ml-2" href="./register">
              Register
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectGroup,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

export default function register() {
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registerunSuccess, setRegisterunSuccess] = useState("");
  const [resgistering, setResgistering] = useState(false);

  useEffect(() => {
    console.log("hi");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Card
        className="mx-auto max-w-md"
        style={{
          width: "40rem",
        }}
      >
        <CardHeader>
          <CardTitle className="text-2xl font-extrabold">Register</CardTitle>
          <CardDescription className="text-gray-500">
            Please enter your details to create an account.
          </CardDescription>
          {registerunSuccess == "user exist" ? (
            <CardDescription className="text-red-500">
              Username exist
            </CardDescription>
          ) : registerunSuccess == "Please fill in all fields" ? (
            <CardDescription className="text-red-500">
              Please fill in all fields
            </CardDescription>
          ) : null}
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username" className="font-semibold">
              Username
            </Label>
            <Input
              id="username"
              className="focus:ring-gray-400"
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
              className="focus:ring-gray-400"
              required
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role" className="font-semibold">
              Role
            </Label>
            <Select
              onValueChange={(value) => {
                setRole(value);
              }}
            >
              <SelectTrigger className="focus:ring-gray-400">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectGroup>
                  <SelectItem className="hover:bg-gray-200" value="user">
                    User
                  </SelectItem>
                  <SelectItem className="hover:bg-gray-200" value="staff">
                    Staff
                  </SelectItem>
                  <SelectItem className="hover:bg-gray-200" value="manager">
                    Manager
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Button
            className="w-full bg-gray-950 text-white font-semibold"
            onClick={() => {
              console.log(username, password, role);
              setResgistering(true);
              axios
                .post("/api/register", {
                  username: username,
                  password: password,
                  role: role,
                })
                .then((res) => {
                  if (res.data.message == "Username exist") {
                    setRegisterunSuccess("user exist");
                    setResgistering(false);
                  } else if (res.data.message == "Please fill in all fields") {
                    setRegisterunSuccess("Please fill in all fields");
                    setResgistering(false);
                  } else if (res.data.message == "Register success") {
                    setRegisterunSuccess(false);
                    setResgistering(false);
                    window.location.href = "/";
                  }
                });
            }}
          >
            {resgistering ? (
              <img src="icons/loading.gif" className="w-7 h-7" />
            ) : (
              "Register"
            )}
          </Button>
          <div className="mt-4 text-center text-sm">
            Already have an account?
            <Link className="underline ml-2" href="./">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
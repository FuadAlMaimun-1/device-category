
"use client";

import React from "react";

import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";

import { signUp } from "../../../lib/auth-client";

const SignUpPage = () => {
  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    console.log({ name, email, password });

    const { data, error } = await signUp.email({
      name,
      email,
      password,
    });

    console.log(data, error);
  };

  return (
    <div className="flex justify-center mt-5">
      <Form
        className="flex w-96 flex-col gap-4"
        onSubmit={onSubmit}
      >
        <h2 className="text-4xl font-bold flex justify-center items-center">Sign Up</h2>
        {/* Name */}
        <TextField isRequired name="name">
          <Label>Name</Label>
          <Input
            placeholder="John Doe"
            autoComplete="name"
          />
          <FieldError />
        </TextField>

        {/* Email */}
        <TextField
          isRequired
          name="email"
          type="email"
          validate={(value) => {
            if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
            ) {
              return "Please enter a valid email address";
            }

            return null;
          }}
        >
          <Label>Email</Label>
          <Input
            autoComplete="new-email"
            placeholder="john@example.com"
          />
          <FieldError />
        </TextField>

        {/* Password */}
        <TextField
          isRequired
          minLength={8}
          name="password"
          type="password"
          validate={(value) => {
            if (value.length < 8) {
              return "Password must be at least 8 characters";
            }

            if (!/[A-Z]/.test(value)) {
              return "Password must contain at least one uppercase letter";
            }

            if (!/[0-9]/.test(value)) {
              return "Password must contain at least one number";
            }

            return null;
          }}
        >
          <Label>Password</Label>

          <Input
            autoComplete="new-password"
            placeholder="Enter your password"
          />

          <Description>
            Must be at least 8 characters with 1 uppercase and 1 number
          </Description>

          <FieldError />
        </TextField>

        {/* Buttons */}
        <div className="flex gap-2">
          <Button type="submit">
            Submit
          </Button>

          <Button type="reset" variant="secondary">
            Reset
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SignUpPage;


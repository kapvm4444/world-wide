import React from "react";
import Button from "./Button.jsx";
import { useNavigate } from "react-router-dom";

export default function BackButton({ navigateTo }) {
  const navigate = useNavigate();

  return (
    <Button
      type={"back"}
      onClick={(e) => {
        e.preventDefault();
        navigate(navigateTo || -1);
      }}
    >
      &larr; Back
    </Button>
  );
}

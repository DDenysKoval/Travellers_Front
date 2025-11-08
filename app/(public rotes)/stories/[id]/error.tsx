"use client";

interface ErrorProps {
  error: Error;
}

const Error = ({ error }: ErrorProps) => {
  return <p>Could not fetch storie details. {error.message}</p>;
};

export default Error;

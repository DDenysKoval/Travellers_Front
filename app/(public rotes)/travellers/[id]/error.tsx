"use client";

interface ErrorProps {
  error: Error;
}

const Error = ({ error }: ErrorProps) => {
  return <p>Could not fetch traveller details. {error.message}</p>;
};

export default Error;

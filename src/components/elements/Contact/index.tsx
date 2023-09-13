import React from "react";

type Props = {};

const ContactPage = (props: Props) => {
  return (
    <div className="p-2">
      <h1 className="text-2xl font-bold">Contact</h1>
      <p className="text-lg">Email </p>
      <p className="text-lg">LinkedIn </p>
      <p className="text-lg">GitHub </p>
      <p className="text-lg">Twitter </p>
    </div>
  );
};

export default ContactPage;

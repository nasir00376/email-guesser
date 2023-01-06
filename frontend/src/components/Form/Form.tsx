import React from "react";
import { useRequest } from "../../hooks/useRequest";
import { Input, getFieldError } from "../Input/Input";

export interface GuessEmailFrom {
  fullname: string;
  domain: string;
}

export function Form() {
  const [email, setEmail] = React.useState("");
  const [wasSubmitted, setWasSubmitted] = React.useState(false);

  const { doRequest, errors } = useRequest({
    url: "http://localhost:5454/api/guess-email",
    method: "post",
  } as any);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const fieldValues = Object.fromEntries(
      formData.entries()
    ) as unknown as GuessEmailFrom;

    const formIsValid = Object.values(fieldValues).every(
      (value) => !getFieldError(value)
    );

    setWasSubmitted(true);
    if (formIsValid) {
      const { email } = await doRequest<GuessEmailFrom>(fieldValues);
      setEmail(email);
    }
  }

  return (
    <>
      {email && <div className="alert alert-success">{email}</div>}
      {errors && (
        <div className="alert alert-danger">{errors?.[0].message}</div>
      )}

      <form noValidate onSubmit={handleSubmit}>
        {["fullname", "domain"].map((name) => (
          <Input key={name} name={name} wasSubmitted={wasSubmitted} />
        ))}
        <button type="submit">Guess</button>
      </form>
    </>
  );
}

import React from "react";

export function Input({
  name,
  wasSubmitted,
}: {
  name: string;
  wasSubmitted: boolean;
}) {
  const [value, setValue] = React.useState("");
  const [touched, setTouched] = React.useState(false);
  const errorMessage = getFieldError(value);
  const displayErrorMessage = (wasSubmitted || touched) && errorMessage;
  return (
    <div className="field" key={name}>
      <input
        id={`${name}-input`}
        name={name}
        type="text"
        placeholder={name}
        onChange={(event) => setValue(event.currentTarget.value)}
        onBlur={() => setTouched(true)}
        required
        aria-describedby={displayErrorMessage ? `${name}-error` : undefined}
      />
    </div>
  );
}

export function getFieldError(value: FormDataEntryValue) {
  if (!value) return "field is required";

  return null;
}

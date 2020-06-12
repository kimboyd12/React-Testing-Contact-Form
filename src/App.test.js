import React from "react";
import { render, fireEvent, getByText, waitFor } from "@testing-library/react";
import App from "./App";
import  ContactForm  from "./components/ContactForm";
import { Simulate } from "react-dom/test-utils";

test("renders App without crashing", () => {
  render(<App />);
});

//  test 1 first name
test("checks to see if first name field is functional", () => {
  const { getByTestId } = render(<ContactForm />);
  const input = getByTestId(/firstname/i);
  fireEvent.change(input, { target: {value: "Ed"} });
  expect(input.value).toBe("Ed");
});

//  test 2 last name
test("checks to see if last name field is functional", () => {
  const { getByTestId } = render(<ContactForm />);
  const input = getByTestId(/lastname/i);
  fireEvent.change(input, { target: {value: "Burke"} });
  expect(input.value).toBe("Burke");
});

// test 3 email
test("check to see if email field is functional", () => {
  const { getByTestId } = render(<ContactForm />);
  const emailInput = getByTestId(/email/i);
  fireEvent.change(emailInput, {target: {value: "test@test.com"} });
  expect(emailInput.value).toBe("test@test.com");
})

// test 4 message 
test("check message field functional", () => {
  const { getByTestId } = render(<ContactForm />);
  const message = getByTestId(/message/i);
  fireEvent.change(message, {target: {value: "this is a message"} });
  expect(message.value).toBe("this is a message");
})

// test 5 submit button
test("check submit button function", () => {
  const { getByTestId, getByRole } = render(<ContactForm />);
  const onSubmit = getByTestId(/submit/i);
  fireEvent.click(getByRole('submit'), onSubmit)
})

// this test will fail now because bug is fixed

// test 6 input only allows 3 characters for name, error shows
test("check maxlength on name", async () => {
  const { getByTestId,queryByText } = render(<ContactForm />);
  const fname = getByTestId(/firstname/i);
  const lname = getByTestId(/lastname/i);
  const error = queryByText(/looks/i)

  fireEvent.change(fname, { target: {value: "Kimberly"} });
  fireEvent.change(lname, { target: {value: "Boyd"} });

  await waitFor( () => {
    expect(queryByText(/looks/i));
  })
});


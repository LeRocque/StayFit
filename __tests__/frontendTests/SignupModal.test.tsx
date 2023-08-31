import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import { SignupModal } from "../../src/components/SignupModal";

const modalProp = (): void => {
  throw new Error("Function not implemented.");
};

test("displays a signup form", async () => {
  const signupModal = render(<SignupModal handleModal={modalProp} />);
  const signupForm = await signupModal.findByTestId("signup-form");
  expect(signupForm).toBeDefined();
});

test("Should match its snapshot", () => {
  const signupModal = render(<SignupModal handleModal={modalProp} />);
  expect(signupModal).toMatchSnapshot();
});

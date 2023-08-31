import { expect, test } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../src/store";
import LoginPage from "../../src/pages/LoginPage";
import { BrowserRouter } from "react-router-dom";

test("LoginPage should match it's snapshot", () => {
  const loginPage = render(
    <Provider store={store}>
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    </Provider>,
  );

  expect(loginPage).toMatchSnapshot();
  loginPage.unmount();
});

test("LoginPage should show signup modal form when signup button clicked", () => {
  const loginPage = render(
    <Provider store={store}>
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    </Provider>,
  );
  const notClicked = loginPage.queryByTestId("signup-form");
  expect(notClicked).toBeNull();
  const signupButton = loginPage.getByTestId("signup-button");
  fireEvent.click(signupButton);
  const signupForm = loginPage.getByTestId("signup-form");
  expect(signupForm).toBeDefined();
});

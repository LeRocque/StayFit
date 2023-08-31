import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../src/store";
import LoginPage from "../../src/pages/LoginPage";
import { BrowserRouter } from "react-router-dom";

test("LoginPage should match it's snapshot", () => {
  const homePage = render(
    <Provider store={store}>
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    </Provider>,
  );
  screen.debug();
  expect(homePage).toMatchSnapshot();
});

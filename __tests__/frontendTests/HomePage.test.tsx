import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import HomePage from "../../src/pages/HomePage";
import { Provider } from "react-redux";
import { store } from "../../src/store";

test("displays a signup form", async () => {
  const homePage = render(
    <Provider store={store}>
      <HomePage />
    </Provider>,
  );
  screen.debug();
  const noWorkouts = await homePage.findByTestId("no-workouts");
  expect(noWorkouts).toBeDefined();
});

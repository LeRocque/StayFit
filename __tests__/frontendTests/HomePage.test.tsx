import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import HomePage from "../../src/pages/HomePage";
import { Provider } from "react-redux";
import { store } from "../../src/store";

test("No workouts div when userWorkouts is empty", async () => {
  const homePage = render(
    <Provider store={store}>
      <HomePage />
    </Provider>,
  );
  const noWorkouts = await homePage.findByTestId("no-workouts");
  expect(noWorkouts).toBeDefined();
});

test("Homepage should match it's snapshot", () => {
  const homePage = render(
    <Provider store={store}>
      <HomePage />
    </Provider>,
  );
  expect(homePage).toMatchSnapshot();
});

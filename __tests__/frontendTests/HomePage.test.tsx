import { expect, test } from "vitest";
import { fireEvent, render } from "@testing-library/react";
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
  homePage.unmount();
});

test("Homepage should match it's snapshot", () => {
  const homePage = render(
    <Provider store={store}>
      <HomePage />
    </Provider>,
  );
  expect(homePage).toMatchSnapshot();
  homePage.unmount();
});

test("Add workout modal should appear when button is clicked", () => {
  const homePage = render(
    <Provider store={store}>
      <HomePage />
    </Provider>,
  );
  const notClicked = homePage.queryByTestId("addWorkoutForm");
  expect(notClicked).toBeNull();
  const addWorkoutButton = homePage.getByTestId("add-workout-button");
  fireEvent.click(addWorkoutButton);
  const addWorkoutForm = homePage.getByTestId("addWorkoutForm");
  expect(addWorkoutForm).toBeDefined();
});

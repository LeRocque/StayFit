import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import { AddWorkoutModal } from "../../src/components/AddWorkoutModal";

const userId = "1";
const handleWorkoutModal = () => null;

test("It should render an add workout form", () => {
  const addModal = render(
    <AddWorkoutModal userId={userId} handleWorkoutModal={handleWorkoutModal} />,
  );
  const addForm = addModal.getByTestId("addWorkoutForm");
  expect(addForm).toBeDefined();
  addModal.unmount();
});

test("It should match its snapshot", () => {
  const addModal = render(
    <AddWorkoutModal userId={userId} handleWorkoutModal={handleWorkoutModal} />,
  );
  expect(addModal).toMatchSnapshot();
});

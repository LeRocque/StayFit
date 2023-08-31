import { expect, test } from "vitest";
import { GetWorkoutImages } from "../../src/components/WorkoutImages";

const workoutImages = {
  images: {
    count: 1,
    next: null,
    previous: null,
    results: [
      {
        id: 1,
        uuid: "",
        exercise_base: 1,
        exercise_base_uuid: "",
        image: "https://wger.de/media/exercise-images/91/Crunches-1.png",
        is_main: true,
        style: "1",
        license: 1,
        license_title: "",
        license_object_url: "",
        license_author: "",
        license_author_url: "",
        license_derivative_source_url: "",
        author_history: [],
      },
      {
        id: 1,
        uuid: "",
        exercise_base: 1,
        exercise_base_uuid: "",
        image: "https://wger.de/media/exercise-images/93/Decline-crunch-1.png",
        is_main: true,
        style: "1",
        license: 1,
        license_title: "",
        license_object_url: "",
        license_author: "",
        license_author_url: "",
        license_derivative_source_url: "",
        author_history: [],
      },
      {
        id: 1,
        uuid: "",
        exercise_base: 1,
        exercise_base_uuid: "",
        image:
          "https://wger.de/media/exercise-images/128/Hyperextensions-1.png",
        is_main: true,
        style: "1",
        license: 1,
        license_title: "",
        license_object_url: "",
        license_author: "",
        license_author_url: "",
        license_derivative_source_url: "",
        author_history: [],
      },
      {
        id: 1,
        uuid: "",
        exercise_base: 1,
        exercise_base_uuid: "",
        image:
          "https://wger.de/media/exercise-images/88/Narrow-grip-bench-press-1.png",
        is_main: true,
        style: "1",
        license: 1,
        license_title: "",
        license_object_url: "",
        license_author: "",
        license_author_url: "",
        license_derivative_source_url: "",
        author_history: [],
      },
      {
        id: 1,
        uuid: "",
        exercise_base: 95,
        exercise_base_uuid: "",
        image:
          "https://wger.de/media/exercise-images/129/Standing-biceps-curl-1.png",
        is_main: true,
        style: "1",
        license: 1,
        license_title: "",
        license_object_url: "",
        license_author: "",
        license_author_url: "",
        license_derivative_source_url: "",
        author_history: [],
      },
    ],
  },
};

test("Passing in string of situps should return image 0", () => {
  const getWorkoutImages = GetWorkoutImages("situps", workoutImages);
  expect(getWorkoutImages).toEqual(workoutImages.images.results[0].image);
});

test("Passing in string of closegripbenchpress should return image 3", () => {
  const getWorkoutImages = GetWorkoutImages(
    "closegripbenchpress",
    workoutImages,
  );
  expect(getWorkoutImages).toEqual(workoutImages.images.results[3].image);
});

test("Passing in string of bicepcurlpulley should return image 4", () => {
  const getWorkoutImages = GetWorkoutImages("bicepcurlpulley", workoutImages);
  expect(getWorkoutImages).toEqual(workoutImages.images.results[4].image);
});

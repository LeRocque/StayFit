import { WorkoutImages } from "../frontendTypes";

const GetWorkoutImages = (
  workoutName: string,
  workoutImages: WorkoutImages,
): string | undefined => {
  let imageResult;
  console.log("workoutImages are:", workoutImages);
  const cleanName = workoutName.replace(/[^a-zA-Z]/g, "").toLowerCase();
  if (cleanName === "situps") {
    imageResult = workoutImages.images.results[0].image;
  } else if (cleanName === "closegripbenchpress") {
    imageResult = workoutImages.images.results[3].image;
  } else if (cleanName === "bicepcurlpulley") {
    imageResult = workoutImages.images.results[4].image;
  } else if (cleanName === "bicepcurldumbbells") {
    imageResult = workoutImages.images.results[128].image;
  } else if (cleanName === "bicepcurlbarbell") {
    imageResult = workoutImages.images.results[6].image;
  } else if (cleanName === "benchdips") {
    imageResult = workoutImages.images.results[7].image;
  } else if (cleanName === "dumbbellshrugs") {
    imageResult = workoutImages.images.results[8].image;
  } else if (cleanName === "barbellshrugs") {
    imageResult = workoutImages.images.results[9].image;
  } else if (cleanName === "hammercurls") {
    imageResult = workoutImages.images.results[10].image;
  } else if (cleanName === "pushups") {
    imageResult = workoutImages.images.results[12].image;
  } else if (cleanName === "skullcrushers") {
    imageResult = workoutImages.images.results[13].image;
  } else if (cleanName === "benchpress") {
    imageResult = workoutImages.images.results[15].image;
  } else if (cleanName === "pullups") {
    imageResult = workoutImages.images.results[16].image;
  } else if (cleanName === "dumbbellbenchpress") {
    imageResult = workoutImages.images.results[25].image;
  } else if (cleanName === "declinebenchpress") {
    imageResult = workoutImages.images.results[26].image;
  } else if (cleanName === "cableflys") {
    imageResult = workoutImages.images.results[30].image;
  } else if (cleanName === "leglifts") {
    imageResult = workoutImages.images.results[33].image;
  } else if (cleanName === "squats") {
    imageResult = workoutImages.images.results[38].image;
  } else if (cleanName === "dumbbellshoulderpress") {
    imageResult = workoutImages.images.results[40].image;
  } else if (cleanName === "dips") {
    imageResult = workoutImages.images.results[46].image;
  } else if (cleanName === "dumbbellflys") {
    imageResult = workoutImages.images.results[47].image;
  } else if (cleanName === "squatstwo") {
    imageResult = workoutImages.images.results[52].image;
  } else if (cleanName === "frontdeltraises") {
    imageResult = workoutImages.images.results[74].image;
  } else if (cleanName === "pushupstwo") {
    imageResult = workoutImages.images.results[81].image;
  } else if (cleanName === "triceppulldown") {
    imageResult = workoutImages.images.results[86].image;
  } else if (cleanName === "lunges") {
    imageResult = workoutImages.images.results[106].image;
  } else if (cleanName === "legpress") {
    imageResult = workoutImages.images.results[107].image;
  } else if (cleanName === "dumbbellbenchpresstwo") {
    imageResult = workoutImages.images.results[92].image;
  } else if (cleanName === "calfraises") {
    imageResult = workoutImages.images.results[104].image;
  } else if (cleanName === "dumbbellrow") {
    imageResult = workoutImages.images.results[132].image;
  } else if (cleanName === "deadlifts") {
    imageResult = workoutImages.images.results[35].image;
  } else {
    imageResult = workoutImages.images.results[22].image;
  }
  return imageResult;
};

export default GetWorkoutImages;

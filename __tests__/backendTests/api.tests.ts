/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import request, { Response } from "supertest";
import { describe, expect, test } from "vitest";

const server = request("http://localhost:3000");
let ssidCookie: string;
let token: string;
let userId: number;
let workoutId: number;

describe("User should be able signup, login, create a workout, get their workout, edit their workout, delete their workout, logout, then be deleted", () => {
  test("User should be able to signup, receive a 201 status code, and a JSON containing a userId", async () => {
    const response: Response = await server.post("/user/signup").send({
      username: "testUser",
      password: "testUser",
      email: "testUser",
      firstName: "testUser",
      lastName: "testUser",
      address: "testUser",
    });
    expect(response.statusCode).toBe(201);
    expect(response.headers["content-type"]).toMatch(/application\/json/);
  });
  test("User should be able to login, receive a 200 status code, a userId, a ssid cookie, and jwt", async () => {
    const response: Response = await server.post("/user/login").send({
      username: "testUser",
      password: "testUser",
    });
    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toMatch(/application\/json/);
    token = response.headers["set-cookie"][1].split(";")[0];
    ssidCookie = response.headers["set-cookie"][0].split(";")[0];
    userId = await JSON.parse(response.text).user_id;
    expect(ssidCookie).toBeDefined();
    expect(token).toBeDefined();
    expect(userId).toBeDefined();
  });
  test("User should be able to create a workout, receieve a 201 status code, and a json response", async () => {
    const response: Response = await server
      .post("/workout/add")
      .send({
        user_id: userId,
        muscleTarget: "test",
        workoutName: "test",
        weight: "test",
        reps: "test",
      })
      .set("Cookie", [token, ssidCookie]);
    expect(response.statusCode).toBe(201);
    expect(response.headers["content-type"]).toMatch(/application\/json/);
    workoutId = await JSON.parse(response.text).workout_id;
    expect(workoutId).toBeDefined();
  });
  test("User should be able to get all their workouts as a JSON and receieve a status code of 200", async () => {
    const response: Response = await server
      .get(`/workout/${userId}`)
      .set("Cookie", [token, ssidCookie]);
    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toMatch(/application\/json/);
  });
  test("User should be able to update their workout and receive the updated workout along with a 202 status code", async () => {
    const response: Response = await server
      .put("/workout/edit")
      .send({
        workout_id: workoutId,
        muscleTarget: "testUpdate",
        workoutName: "testUpdate",
        weight: "testUpdate",
        reps: "testUpdate",
      })
      .set("Cookie", [token, ssidCookie]);
    expect(response.statusCode).toBe(202);
    expect(response.headers["content-type"]).toMatch(/application\/json/);
  });
  test("User should be able to delete their workout and receive the deleted workout along with a 202 status code", async () => {
    const response: Response = await server
      .delete(`/workout/remove/${workoutId}`)
      .set("Cookie", [token, ssidCookie]);
    expect(response.statusCode).toBe(202);
    expect(response.headers["content-type"]).toMatch(/application\/json/);
    console.log(token);
  });
  test("User should be able to logout, clear their cookies, and receive a 202 status code", async () => {
    const response: Response = await server.get("/user/logout");
    expect(response.statusCode).toBe(202);
    expect(response.headers["content-type"]).toMatch(/application\/json/);
    token = response.headers["set-cookie"][1].split(";")[0];
    ssidCookie = response.headers["set-cookie"][0].split(";")[0];
    expect(token).toMatch("token=");
    expect(ssidCookie).toMatch("ssid=");
  });
  test("We should be able to delete the user after testing, receive a status code of 202, and the deleted user as a JSON", async () => {
    const response: Response = await server.delete(`/user/remove/${userId}`);
    expect(response.statusCode).toBe(202);
    expect(response.headers["content-type"]).toMatch(/application\/json/);
  });
});

import User from "./../src/js/user.js";

describe("user", () => {
  let user;

  beforeEach(() => {
    user = new User("Mike", 32, "male", "beginner", 318, "lose weight");
  });

  test("should create a user object with the specified properties", () => {
    expect(user.name).toEqual("Mike");
    expect(user.age).toEqual(32);
    expect(user.gender).toEqual("male");
    expect(user.experience).toEqual("beginner");
    expect(user.weight).toEqual(318);
    expect(user.focus).toEqual("lose weight");
  });
});
import { mergeAccounts } from "./challenge";

describe("test", () => {
  it("should pass example case", () => {
    const result = mergeAccounts([
      {
        application: "x",
        emails: ["a", "b", "c"],
        name: "Person 1",
      },
      {
        application: "y",
        emails: ["c", "d"],
        name: "Person 1",
      },
    ]);

    expect(result[0].applications).toHaveLength(2);
    expect(result[0].emails).toHaveLength(4);
    expect(result).toEqual([
      {
        applications: expect.arrayContaining(["x", "y"]),
        emails: expect.arrayContaining(["a", "b", "c", "d"]),
        name: "Person 1",
      },
    ]);
  });

  it("should pass tricky case", () => {
    const result = mergeAccounts([
      {
        application: "x",
        emails: ["a", "b", "c"],
        name: "Person 1",
      },
      {
        application: "y",
        emails: ["d"],
        name: "Person 1",
      },
      {
        application: "z",
        emails: ["c", "d"],
        name: "Person 1",
      },
    ]);

    expect(result[0].applications).toHaveLength(3);
    expect(result[0].emails).toHaveLength(4);
    expect(result).toEqual([
      {
        applications: expect.arrayContaining(["x", "y", "z"]),
        emails: expect.arrayContaining(["a", "b", "c", "d"]),
        name: "Person 1",
      },
    ]);
  });
});

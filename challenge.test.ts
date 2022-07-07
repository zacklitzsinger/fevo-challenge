import { mergeAccounts } from "./challenge";

describe("test", () => {
  it("should pass empty case", () => {
    const result = mergeAccounts([]);

    expect(result).toHaveLength(0);
  });

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

  it("should pass long case", () => {
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
        emails: ["d", "f"],
        name: "Person 1",
      },
      {
        application: "a",
        emails: ["a", "f"],
        name: "Person 2",
      },
      {
        application: "b",
        emails: ["e", "e2", "e3"],
        name: "Person 3",
      },
    ]);

    expect(result).toEqual(
      expect.arrayContaining([
        {
          applications: expect.arrayContaining(["a", "x", "y", "z"]),
          emails: expect.arrayContaining(["a", "b", "c", "d", "f"]),
          name: "Person 2",
        },
        {
          applications: expect.arrayContaining(["b"]),
          emails: expect.arrayContaining(["e", "e2", "e3"]),
          name: "Person 3",
        },
      ])
    );
  });
});

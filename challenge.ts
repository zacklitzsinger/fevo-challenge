import type { Account, Person } from "./types";
import * as readline from "readline";

/** Returns an array with duplicates removed */
const uniq = <T>(items: T[]): T[] => {
  return Array.from(new Set(items));
};

/**
 * Splits an array into a tuple of two arrays based on
 * whether it passes or fails the given function
 */
const split = <T>(
  items: T[],
  predicate: (item: T) => boolean
): readonly [T[], T[]] => {
  const passingItems: T[] = [];
  const failingItems: T[] = [];
  items.forEach((item) => {
    if (predicate(item)) {
      passingItems.push(item);
    } else {
      failingItems.push(item);
    }
  });
  return [passingItems, failingItems] as const;
};

const mergeAccountWithPeople = (
  account: Account,
  ...people: Person[]
): Person => {
  return {
    applications: uniq([
      account.application,
      ...people.flatMap((o) => o.applications),
    ]),
    emails: uniq([...account.emails, ...people.flatMap((o) => o.emails)]),
    name: account.name,
  };
};

export const mergeAccounts = (data: Account[]): Person[] => {
  let personList: Person[] = [];
  data.forEach((account) => {
    const [matchingPeople, notMatchingPeople] = split(personList, (p) =>
      p.emails.some((e) => account.emails.includes(e))
    );
    if (matchingPeople.length === 0) {
      personList.push({
        applications: [account.application],
        emails: account.emails,
        name: account.name,
      });
    } else {
      personList = [
        ...notMatchingPeople,
        mergeAccountWithPeople(account, ...matchingPeople),
      ];
    }
  });
  return personList;
};

const main = (): void => {
  const rl = readline.createInterface({
    input: process.stdin,
  });
  let text = "";
  rl.on("line", (line) => {
    text += line;
  });
  rl.on("close", () => {
    let data: Account[] = [];
    try {
      data = JSON.parse(text);
    } catch (err) {
      console.error("Failed to parse JSON");
      console.error(err);
    }
    console.log(mergeAccounts(data));
  });
};

main();

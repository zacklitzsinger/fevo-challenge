import * as fs from "fs";
import * as path from "path";
import { Account, Person } from "./types";

const file = fs.readFileSync(path.join(__dirname, "accounts.json"), "utf-8");
const data = JSON.parse(file) as Account[];

const uniq = <T>(items: T[]): T[] => {
  return Array.from(new Set(items));
};

const split = <T>(items: T[], f: (item: T) => boolean) => {
  const passingItems: T[] = [];
  const failingItems: T[] = [];
  items.forEach((item) => {
    if (f(item)) {
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

console.log(mergeAccounts(data));

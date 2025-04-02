import React, { useState } from "react";
import DataTable from "..";
import { render, screen } from "@testing-library/react";

type UserType = {
  name: string;
  age: number;
  email: string;
  address?: string;
};

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));

const headers = {
  user: {
    value: "email",
    exec() {
      return (
        <div>
          <p>this is returned from exec</p>
        </div>
      );
    },
  },
  name: {
    value: "name",
  },
  age: {
    value: "age",
  },
  email: {
    value: "email",
  },
  address: {
    value: "address",
  },
};

const data: Array<UserType> = [
  {
    name: "Oussama Tailba",
    age: 27,
    email: "otailaba98@gmail.com",
    address: "Bab ghmat syba 37",
  },
  {
    name: "kaoutar Taki",
    age: 22,
    email: "ktaki@gmail.com",
  },
];

beforeEach(() => {
  const setHeaders = jest.fn();
  (useState as jest.Mock).mockImplementation((init) => [init, setHeaders]);
  render(
    <DataTable
      data={data}
      headers={{
        data: headers,
        setHeaders: setHeaders,
      }}
      loading={false}
      title="this is a title"
    />,
  );
});

describe("DataTable basic tests", () => {
  it("should render a table", () => {
    const tableElement = screen.getByRole("table");

    expect(tableElement).toBeTruthy();
  });
  it("should render the table headers", () => {
    const headerElements = screen.getAllByRole("th");

    expect(headerElements.length).toBe(5);
  });
  it("should render correct values by value", () => {
    const nameElement = screen.getByText(/Oussama Tailba/i);
    expect(nameElement).toBeTruthy();

    const email = screen.getByText(/otailaba98@gmail.com/i);
    expect(email).toBeTruthy();
  });
  it("should render correct values by exec function", () => {
    const nameElement = screen.getAllByText(/this is returned from exec/i);
    expect(nameElement.length).toBe(2);
  });
});

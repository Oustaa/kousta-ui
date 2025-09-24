import { THeader } from "../@types/props";

export type UserType = {
  name: string;
  age: number;
  email: string;
  address?: string;
};

export const headers: THeader = {
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

export const data: Array<UserType> = [
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

import type { Meta, StoryObj } from "@storybook/react";

import Table from ".";

const meta = {
  title: "Table/Table",
  component: Table,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ggg: Story = {
  args: {
    data: [{ id: 12, name: "hello " }],
  },
};

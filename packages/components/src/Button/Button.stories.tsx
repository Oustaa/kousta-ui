import type { Meta, StoryObj } from "@storybook/react";

import Button from ".";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
    },
    loading: {
      control: "boolean",
    },
    children: {
      control: "text",
    },
    onClick: {
      action: "clicked",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Click me",
    disabled: false,
    loading: false,
  },
};

export const PrimaryLoading: Story = {
  args: {
    children: "Click me",
    disabled: false,
    loading: true,
  },
};

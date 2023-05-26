/* eslint-disable react/jsx-props-no-spreading */
import { zodResolver } from '@hookform/resolvers/zod';
import type { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';

import { LoginInput, loginSchema } from '../../schemas/auth';
import FormInput, { FormInputProps } from './FormInput';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Example/FormInput',
  component: FormInput,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof FormInput>;

export default meta;
type Story = StoryObj<typeof meta>;

function ComponentWithHooks(args: FormInputProps) {
  const methods = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <FormProvider {...methods}>
      <FormInput {...args} />
    </FormProvider>
  );
}

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const TextEmail: Story = {
  args: {
    name: 'email',
    label: 'Email address',
    type: 'email',
  },
  render: (args) => <ComponentWithHooks {...args} />,
};

export const Password: Story = {
  args: {
    name: 'password',
    label: 'Password',
    type: 'password',
  },
  render: (args) => <ComponentWithHooks {...args} />,
};

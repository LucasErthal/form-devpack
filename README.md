# Form DevPack

## Overview

Form DevPack is a streamlined toolkit for setting up form handling in React and React Native projects. It provides a pre-configured setup with best practices for form validation, state management, and typed form controls.

## Features

- 🚀 Quick setup for both React and React Native projects
- 📋 Pre-configured form validation using Zod schemas
- 🔄 Controlled form components with React Hook Form
- 🧩 Type-safe form handling with TypeScript
- 🎨 Customizable input components

## Installation

### !!!WARNING!!! 
This package will override your existing .vscode/project-snippets.code-snippets file. Make sure to back it up if you have any custom snippets.

```bash
npx form-devpack
```

Follow the interactive prompts to select:
1. Your preferred package manager (npm or yarn)
2. Your project type (React or React Native)

## What's Included

Form DevPack automatically installs and configures:

- `react-hook-form`: For efficient form state management
- `zod`: For schema validation
- `@hookform/resolvers`: For connecting Zod with React Hook Form

### Components

- **ControlledInput**: A wrapper component that connects your input fields to React Hook Form
- **CustomInput**: A base input component that can be styled according to your needs
- **Form schemas**: Pre-configured form using Zod schemas and React Hook Form as 'form-hook' snippet

## Usage Example

#### Generate a form hook using 'form-hook' snippet and edit as you wish 
```tsx
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const defaultSchema = z.object({
  name: z.string().min(3).max(20),
  email: z.string(),
});

type DefaultSchema = z.infer<typeof defaultSchema>;

export function defaultForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver<DefaultSchema>(defaultSchema) });

  return {
    control,
    handleSubmit,
    errors,
  };
}
```

#### Use it with ControlledInput component
```tsx
import { DefaultSchema, useDefaultForm } from '../hooks/form';
import { ControlledInput } from './shared/controlled-input.component';

export function LoginScreen() {
  const form = useDefaultForm();

  function onSubmit(data: DefaultSchema) {
    console.log(data);
    // Handle form submission
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <ControlledInput
        control={form.control}
        name="email"
        label="Email"
        errors={form.errors}
      />
      <ControlledInput
        control={form.control}
        name="password"
        label="Password"
        type="password"
        errors={form.errors}
      />
      <button type="submit">Login</button>
    </form>
  );
}
```

## Customization

You can easily extend the provided components and schemas to fit your project's specific needs. The toolkit is designed to be a starting point that follows best practices while remaining flexible.

## Requirements

- Node.js 18 or higher
- React or React Native project

## License

ISC

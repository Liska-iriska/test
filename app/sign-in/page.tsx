// app/(public routes)/sign-in/page.tsx

'use client';

import css from './SignInPage.module.css';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login, LoginRequest } from '@/src/lib/api/clientApi';
import { useAuthStore } from '@/src/lib/stores/authStore';
import { ApiError } from '@/app/api/api';

const SignIn = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  // Отримуємо метод із стора
  const setUser = useAuthStore(state => state.setUser);

  const handleSubmit = async (formData: FormData) => {
    try {
      const formValues = Object.fromEntries(formData) as LoginRequest;
      const res = await login(formValues);
      if (res) {
        // Записуємо користувача у глобальний стан
        setUser(res);
        router.push('/profile');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError(
        (error as ApiError).response?.data?.error ??
          (error as ApiError).message ??
          'Oops... some error'
      );
    }
  };

  return (
    <form className={css.form} action={handleSubmit}>
      <h1 className={css.formTitle}>Sign in</h1>
      <label className={css.formGroup}>
        Email
        <input className={css.input} type="email" name="email" required />
      </label>
      <label className={css.formGroup}>
        Password
        <input className={css.input} type="password" name="password" required />
      </label>
      <button className={css.submitButton} type="submit">
        Log in
      </button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default SignIn;

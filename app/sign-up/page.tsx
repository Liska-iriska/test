// app/(public routes)/sign-up/page.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register, RegisterRequest } from '@/src/lib/api/clientApi';
import { ApiError } from '@/app/api/api';
import { useAuthStore } from '@/src/lib/stores/authStore';
import css from './SignUpPage.module.css';

const SignUp = () => {
  const router = useRouter();
  const [error, setError] = useState('');

  const setUser = useAuthStore(state => state.setUser);

  const handleSubmit = async (formData: FormData) => {
    try {
      // Типізуємо дані форми
      const formValues = Object.fromEntries(formData) as RegisterRequest;
      // Виконуємо запит
      const res = await register(formValues);
      // Виконуємо редірект або відображаємо помилку
      if (res) {
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
    <section className={css.mainContent}>
      <form className={css.form} action={handleSubmit}>
        <h1 className={css.formTitle}>Sign up</h1>
        <label className={css.formGroup}>
          Username
          <input className={css.input} type="text" name="userName" required />
        </label>
        <label className={css.formGroup}>
          Email
          <input className={css.input} type="email" name="email" required />
        </label>
        <label className={css.formGroup}>
          Password
          <input className={css.input} type="password" name="password" required />
        </label>
        <button className={css.submitButton} type="submit">
          Register
        </button>
      </form>
      {error && <p>{error}</p>}
    </section>
  );
};

export default SignUp;

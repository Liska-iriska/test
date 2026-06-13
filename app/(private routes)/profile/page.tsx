// app/profile/page.tsx

import Link from 'next/link';
import { getServerMe } from '@/src/lib/api/serverApi';
import css from '../profile/edit/Profile.module.css';

const Profile = async () => {
  const user = await getServerMe();
  return (
    <section className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>My Profile</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit profile
          </Link>
        </div>
        <div className={css.profileInfo}>
          <h2>Name: {user.userName}</h2>
          <h2>Email: {user.email}</h2>
          <p>Some description: Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
        </div>
      </div>
    </section>
  );
};

export default Profile;

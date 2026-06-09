// app/page.tsx

import Image from 'next/image';

const Home = () => {
  return (
    <section>
      <h1>Welcome to Home</h1>
      <p>This is the home page.</p>
      <Image
        src="https://picsum.photos/seed/picsum/300/300"
        alt="test"
        width={1200}
        height={800}
        sizes="(max-width: 768px) 100vw, 50vw"
        priority
      />
    </section>
  );
};

export default Home;

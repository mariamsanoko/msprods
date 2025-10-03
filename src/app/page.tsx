import Image from 'next/image'

export default function Page() {
  return (
    <>
      <h1>Hello, Bienvenue sur MS French Academy !</h1>
      <Image src="/profile.png" alt="Profile" width={100} height={100} />
    </>
  );
}
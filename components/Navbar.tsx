import { NavLinks } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import AuthProviders from './AuthProviders'

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  const session = {}
  return (
    <nav className="flexBetween navbar">
      <div className="flex-1 gap-10 flexStart">
        <Link href="/">
          <Image src="/logo.svg" width={115} height={43} alt="Flexibble logo" />
        </Link>
        <ul className="hidden xl:flex gap-7 text-small">
          {NavLinks.map((link) => (
            <Link href={link.href} key={link.key}>
              {link.text}
            </Link>
          ))}
        </ul>
      </div>
      <div className="gap-4 flexCenter">
        {session ? (
          <>
            UserPhoto
            <Link href="/create-project"> Share Work</Link>
          </>
        ) : (
          <AuthProviders />
        )}
      </div>
    </nav>
  )
}

export default Navbar

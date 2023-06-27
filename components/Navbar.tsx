import { NavLinks } from '@/constants'
import { getCurrentUser } from '@/lib/session'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import AuthProviders from './AuthProviders'
import ProfileMenu from './ProfileMenu'
import Button from './Button'

interface NavbarProps {}

const Navbar: FC<NavbarProps> = async ({}) => {
  const session = await getCurrentUser()
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
        {session?.user ? (
          <>
            <ProfileMenu session={session} />
            <Link href="/create-project">
              {' '}
              <Button title="Share work" />
            </Link>
          </>
        ) : (
          <AuthProviders />
        )}
      </div>
    </nav>
  )
}

export default Navbar

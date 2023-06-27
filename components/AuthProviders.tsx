'use client'
import { FC, useEffect, useState } from 'react'
import { getProviders, signIn } from 'next-auth/react'
import Button from './Button'
interface AuthProvidersProps {}
type Provider = {
  id: string
  name: string
  signinUrl: string
  callbackUrl: string
  signinUrlParams?: Record<string, string> | null
}
type Providers = Record<string, Provider>

const AuthProviders: FC<AuthProvidersProps> = ({}) => {
  const [providers, setProviders] = useState<Providers | null>(null)
  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders()
      setProviders(res)
    }
    fetchProviders()
  }, [])
  if (providers)
    return (
      <div>
        {Object.values(providers).map((provider: Provider, i: number) => (
          <Button
            key={i}
            handleClick={() => signIn(provider.id)}
            title="Sign in"
          />
        ))}
      </div>
    )
}

export default AuthProviders

"use client"

import { getProviders, signIn } from 'next-auth/react'
import { useState, useEffect } from 'react'

type Provider = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
  signinUrlParams?: Record<string, string> | null;
}

type Providers = Record <string, Provider>;

function AuthProviders() {

  const [providers, setProviders] = useState<Providers | null>(null);

  return (
    <div>AuthProviders</div>
  )
}

export default AuthProviders
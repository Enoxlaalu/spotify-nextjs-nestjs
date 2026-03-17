import React, { FC } from 'react'
import { Provider } from 'react-redux'
import { AppProps } from 'next/app'
import { wrapper } from '@/store'
import { Inter } from 'next/font/google'
import '@/styles/globals.scss'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

const MyApp: FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest)
  return (
    <Provider store={store}>
      <div className={inter.className}>
        <Component {...props.pageProps} />
      </div>
    </Provider>
  )
}

export default MyApp

import React from 'react'
import { ExternalLink } from '../components/ExternalLink'
import { Page } from '../components/Page'
import { Section } from '../components/Section'

interface P {
  children?: never
}

const PageInfo: React.FC<P> = () => {
  return (
    <Page canonical='/info' title='このサイトについて'>
      <Section title='現在および過去の版の概要'>
        <p>括弧の中はコードネームです</p>

        <Section title={(
          <>
            akouryy.net v8.x.x (
            <code>Shamiko</code>
            )
          </>
        )}
        >
          <p>使用時期: 2019/9/16 -</p>
          <p>
            主な使用技術:
            {' '}
            <ExternalLink href='https://reactjs.org'>
              React
            </ExternalLink>
            ,
            {' '}
            <ExternalLink href='https://nextjs.org'>
              Next.js
            </ExternalLink>
            ,
            {' '}
            <ExternalLink href='http://typescriptlang.org'>
              TypeScript
            </ExternalLink>
          </p>
          <p>
            その他の使用技術:
            {' '}
            <ExternalLink href='http://lesscss.org'>
              Less
            </ExternalLink>
            ,
            {' '}
            <ExternalLink href='https://eslint.org'>
              ESLint
            </ExternalLink>
          </p>
          <p>
            サーバー:
            {' '}
            <ExternalLink href='https://zeit.co'>
              <ruby>
                Zeit
                <rp>[tsaɪ̯t]</rp>
              </ruby>
              {' '}
              Now
            </ExternalLink>
          </p>
        </Section>

        <Section title={(
          <>
            akouryy.net v7.x.x (
            <code>Itsuki</code>
            )
          </>
        )}
        >
          <p>使用時期: ?? - 2019/7/??</p>
          <p>
            主な使用技術:
            {' '}
            <ExternalLink href='https://www.ruby-lang.org'>
              Ruby
            </ExternalLink>
            ,
            {' '}
            <ExternalLink href='http://sinatrarb.com'>
              Sinatra
            </ExternalLink>
          </p>
          <p>
            その他の使用技術:
            {' '}
            <ExternalLink href='https://nginx.org/'>nginx</ExternalLink>
            , 生のCSS
          </p>
          <p>
            サーバー:
            {' '}
            <ExternalLink href='https://conoha.jp'>
              ConoHa
            </ExternalLink>
            {' '}
            (CentOS)
          </p>
        </Section>

        <Section title='akouryy.net v1.x.x - v6.x.x'>
          <p>略</p>
        </Section>
      </Section>
    </Page>
  )
}

export default PageInfo

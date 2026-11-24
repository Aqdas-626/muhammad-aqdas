import { ImageResponse } from 'next/og'

export const alt = 'Muhammad Aqdas | Frontend Developer – React, Next.js & Three.js'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#030712',
          backgroundImage:
            'radial-gradient(circle at 50% 35%, rgba(56, 189, 248, 0.24) 0%, transparent 65%)',
          color: '#f8fafc',
          padding: '60px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '28px',
            padding: '10px 24px',
            borderRadius: '9999px',
            border: '1px solid rgba(56, 189, 248, 0.35)',
            backgroundColor: 'rgba(3, 7, 18, 0.75)',
          }}
        >
          <div
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: '#38bdf8',
            }}
          />
          <span
            style={{
              fontSize: '18px',
              color: '#7dd3fc',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              fontFamily: 'monospace',
            }}
          >
            Open to internships &amp; junior roles
          </span>
        </div>
        <h1
          style={{
            fontSize: '76px',
            fontWeight: 800,
            margin: '0 0 16px 0',
            letterSpacing: '-1.5px',
            color: '#ffffff',
          }}
        >
          Muhammad Aqdas
        </h1>
        <p
          style={{
            fontSize: '34px',
            fontWeight: 500,
            color: '#94a3b8',
            margin: 0,
            letterSpacing: '-0.5px',
          }}
        >
          Frontend Developer – React, Next.js &amp; Three.js
        </p>
      </div>
    ),
    {
      ...size,
    }
  )
}

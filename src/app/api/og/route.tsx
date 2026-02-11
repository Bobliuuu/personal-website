import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui',
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 'bold',
            color: 'white',
            marginBottom: 20,
          }}
        >
          Jerry Zhu
        </div>
        <div
          style={{
            fontSize: 36,
            color: '#a0a0a0',
            marginBottom: 40,
          }}
        >
          Software Engineer @StackAdapt
        </div>
        <div
          style={{
            fontSize: 28,
            color: '#60a5fa',
          }}
        >
          CS @UWaterloo | 19+ Hackathon Winner
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}

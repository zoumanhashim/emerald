import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { polygon, polygonMumbai } from 'wagmi/chains'

export const config = getDefaultConfig({
  appName: 'The Emerald Standard',
  projectId: 'b036143d61c3b05053d7a00e5037d6de',
  chains: [polygon, polygonMumbai],
  ssr: true,
})
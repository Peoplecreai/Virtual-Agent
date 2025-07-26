import 'dotenv/config'
import TravelAgent from './agent'
import { setupSlack } from './slack'

async function main() {
  const agent = new TravelAgent()
  setupSlack(agent)
}

main().catch(err => {
  console.error('Error starting agent:', err)
  process.exit(1)
})

SAD

After cloning
1. cd docker -> docker compose up -d
2. touch .env and add DATABASE_URL=CONNECTION_URL
3. npx prisma migrate dev --name init
4. node setup.js
5. node main.js | npm run dev
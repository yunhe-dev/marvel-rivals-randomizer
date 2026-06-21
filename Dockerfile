FROM node:22-alpine AS builder

RUN apk add --no-cache git
RUN corepack enable && corepack prepare pnpm@10.30.3 --activate

WORKDIR /app

COPY wrangler.jsonc package.json pnpm-lock.yaml ./
COPY project.inlang ./project.inlang/
COPY scripts ./scripts/
COPY tsconfig.json worker-configuration.d.ts ./

RUN pnpm install --frozen-lockfile || pnpm install

COPY . .
RUN pnpm run locale:compile
RUN pnpm run build

# Show what's in the output
RUN find /app/dist -type f -maxdepth 4 | head -60

# Check if there's an index.html in server output
RUN if [ -f /app/dist/server/public/index.html ]; then echo "FOUND index.html in server/public"; cp /app/dist/server/public/index.html /app/dist/client/index.html; echo "index.html size:"; wc -c /app/dist/client/index.html; fi

# Production stage
FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app/dist/client /app/app
EXPOSE 8080
CMD ["node", "-e", "const{createServer}=require('http'),{readFileSync,existsSync}=require('fs'),{join}=require('path');const root='/app/app',types={'js':'application/javascript','css':'text/css','html':'text/html','png':'image/png','svg':'image/svg+xml','ico':'image/x-icon','json':'application/json','xml':'text/xml'};createServer((r,s)=>{let p=join(root,r.url==='/'?'/index.html':r.url);try{if(!existsSync(p)){p=join(root,'/index.html');if(!existsSync(p)){s.writeHead(502,{'Content-Type':'text/plain'});s.end('No index.html found in '+root);return}}const c=readFileSync(p);const ext=p.split('.').pop();s.writeHead(200,{'Content-Type':types[ext]||'text/plain','Cache-Control':'public,max-age=3600'});s.end(c)}catch(e){s.writeHead(502,{'Content-Type':'text/plain'});s.end('Error: '+e.message)}}).listen(8080);console.log('Static SPA on :8080')"]

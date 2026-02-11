# Self-hosted deployment (Gitea + Caddy)

Deploy this Next.js app on your own server with Caddy as the reverse proxy.

## Prerequisites

- Node.js 20+ (or Docker)
- Caddy
- Git (to pull from your Gitea)

## 1. Build and run (Node, no Docker)

```bash
git clone https://your-gitea/path/personal-website.git
cd personal-website

npm ci --legacy-peer-deps
npm run build
```

Run the standalone server (it listens on port 3000):

```bash
cd .next/standalone
cp -r ../../.next/static .next/
cp -r ../../public .
node server.js
```

Optional: set a build id for the status bar (e.g. from git):

```bash
export NEXT_PUBLIC_BUILD_ID=$(git rev-parse --short HEAD)
# then run build
```

## 2. Caddy

1. Edit `Caddyfile`: replace `yourdomain.com` with your domain (or use `:80` for HTTP only).
2. Run Caddy in the repo directory (so it finds the Caddyfile):

   ```bash
   caddy run
   # Or with config file: caddy run --config Caddyfile
   ```

3. Ensure the Next.js app is running on `127.0.0.1:3000` (see above or use Docker).

Caddy will proxy requests to the app and handle TLS if you use a public hostname.

## 3. Optional: run via Docker

```bash
docker build -t personal-website .
docker run -p 3000:3000 -e NEXT_PUBLIC_SITE_URL=https://yourdomain.com personal-website
```

Then point the Caddyfile at `127.0.0.1:3000`.

## 4. Kubernetes

You can deploy the app to Kubernetes using the manifests in `k8s/`.

**What’s in `k8s/`:**
- `deployment.yaml` – Deployment (2 replicas), Service (ClusterIP), and Ingress (nginx + TLS)
- `config.yaml` – ConfigMap and Secret for env vars
- `hpa.yaml` – HorizontalPodAutoscaler (2–10 replicas)

**Steps:**

1. **Build and push the image** to a registry your cluster can pull from, e.g.:

   ```bash
   docker build -t your-registry/personal-website:latest .
   docker push your-registry/personal-website:latest
   ```

   Replace `your-registry` with your registry (e.g. `ghcr.io/your-org/personal-website`, or a Gitea / private registry URL).

2. **Edit `k8s/deployment.yaml`:**
   - Set `image` to your image (e.g. `your-registry/personal-website:latest`).
   - Set `NEXT_PUBLIC_SITE_URL` to your public URL (e.g. `https://yourdomain.com`).
   - If the registry is private, ensure the Deployment’s `imagePullSecrets` points to a secret that exists in the namespace (see below).

3. **Edit `k8s/deployment.yaml` Ingress** (and optional TLS):
   - Replace `jerryzhu.org` / `www.jerryzhu.org` with your domain(s), or switch to your ingress class (e.g. Caddy ingress) if you’re not using nginx + cert-manager.

4. **Create namespace and optional image-pull secret** (for a private registry):

   ```bash
   kubectl create namespace production
   kubectl create secret docker-registry registry-credentials \
     --docker-server=your-registry \
     --docker-username=... \
     --docker-password=... \
     -n production
   ```

5. **Apply manifests:**

   ```bash
   kubectl apply -f k8s/config.yaml -n production
   kubectl apply -f k8s/deployment.yaml -n production
   kubectl apply -f k8s/hpa.yaml -n production
   ```

6. **Rollout a new image** (after pushing a new tag):

   ```bash
   kubectl set image deployment/personal-website \
     personal-website=your-registry/personal-website:latest \
     -n production
   kubectl rollout status deployment/personal-website -n production
   ```

**CI (e.g. Gitea Actions):** Run `docker build` and `docker push` to your registry, then run the `kubectl set image` (and optionally `rollout status`) from a runner that has `kubeconfig` (or `KUBE_CONFIG` base64 secret) and `kubectl` configured. The existing `.github/workflows/ci-cd.yml` already has a `build-and-push` (to ghcr.io) and `deploy-k8s` job you can mirror for Gitea + your registry.

## 5. Gitea

- Push your repo to Gitea as usual. No Vercel-specific config is required.
- CI in `.github/workflows/ci-cd.yml` runs on push (lint + build). If you use Gitea Actions or another runner, adjust the workflow or run the same steps in your deploy pipeline.
- To deploy on push from Gitea, use a webhook or runner that builds the image, pushes to your registry, and runs `kubectl set image` (or `kubectl apply`) as above.
</think>
Checking how Next.js standalone is meant to be run:
<｜tool▁calls▁begin｜><｜tool▁call▁begin｜>
WebSearch
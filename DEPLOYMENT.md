# Deployment Guide

This guide covers multiple deployment strategies for your personal website.

## Table of Contents

- [Vercel Deployment](#vercel-deployment)
- [Docker Deployment](#docker-deployment)
- [Kubernetes Deployment](#kubernetes-deployment)
- [VM Deployment](#vm-deployment)
- [CI/CD Setup](#cicd-setup)

---

## Vercel Deployment

### Automatic Deployment (Recommended)

1. **Connect to GitHub**
   ```bash
   # Push your code to GitHub
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Configure build settings (auto-detected for Next.js)
   - Click "Deploy"

3. **Environment Variables**
   Add these in Vercel Dashboard → Settings → Environment Variables:
   ```
   NEXT_PUBLIC_SITE_URL=https://jerryzhu.org
   ```

### Manual Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

---

## Docker Deployment

### Prerequisites
- Docker installed
- Docker Compose installed (optional)

### Build and Run

```bash
# Build the Docker image
docker build -t personal-website:latest .

# Run the container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SITE_URL=https://jerryzhu.org \
  personal-website:latest
```

### Using Docker Compose

```bash
# Create .env file
cat > .env << EOF
NEXT_PUBLIC_SITE_URL=https://jerryzhu.org
EOF

# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Docker Hub Deployment

```bash
# Login to Docker Hub
docker login

# Tag the image
docker tag personal-website:latest your-username/personal-website:latest

# Push to Docker Hub
docker push your-username/personal-website:latest
```

---

## Kubernetes Deployment

### Prerequisites
- Kubernetes cluster (GKE, EKS, AKS, or local with minikube)
- kubectl installed and configured
- Container registry access

### Setup

1. **Push Docker Image to Registry**
   ```bash
   # Tag for your registry
   docker tag personal-website:latest ghcr.io/your-username/personal-website:latest
   
   # Login to GitHub Container Registry
   echo $GITHUB_TOKEN | docker login ghcr.io -u USERNAME --password-stdin
   
   # Push image
   docker push ghcr.io/your-username/personal-website:latest
   ```

2. **Update Kubernetes Manifests**
   Edit `k8s/deployment.yaml` and replace:
   - `YOUR_REGISTRY` with your container registry
   - Domain names with your actual domains

3. **Create Namespace**
   ```bash
   kubectl create namespace production
   ```

4. **Apply Configurations**
   ```bash
   # Apply all configurations
   kubectl apply -f k8s/ -n production
   
   # Or apply individually
   kubectl apply -f k8s/config.yaml -n production
   kubectl apply -f k8s/deployment.yaml -n production
   kubectl apply -f k8s/hpa.yaml -n production
   ```

5. **Verify Deployment**
   ```bash
   # Check pods
   kubectl get pods -n production
   
   # Check service
   kubectl get svc -n production
   
   # Check ingress
   kubectl get ingress -n production
   
   # View logs
   kubectl logs -f deployment/personal-website -n production
   ```

### SSL/TLS with cert-manager

```bash
# Install cert-manager
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.13.0/cert-manager.yaml

# Create ClusterIssuer
cat <<EOF | kubectl apply -f -
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: your-email@example.com
    privateKeySecretRef:
      name: letsencrypt-prod
    solvers:
    - http01:
        ingress:
          class: nginx
EOF
```

### Scaling

```bash
# Manual scaling
kubectl scale deployment personal-website --replicas=5 -n production

# Auto-scaling (already configured in hpa.yaml)
kubectl get hpa -n production
```

---

## VM Deployment

### Option 1: Direct Node.js Deployment

#### Prerequisites
- Ubuntu 20.04+ or similar Linux distribution
- SSH access to VM
- Domain name pointed to VM IP

#### Setup

1. **Connect to VM**
   ```bash
   ssh user@your-vm-ip
   ```

2. **Install Dependencies**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install Node.js 20
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt install -y nodejs
   
   # Install PM2 (process manager)
   sudo npm install -g pm2
   
   # Install Nginx
   sudo apt install -y nginx
   ```

3. **Clone and Build**
   ```bash
   # Clone repository
   git clone https://github.com/your-username/personal-website.git
   cd personal-website
   
   # Install dependencies
   npm install
   
   # Build application
   npm run build
   ```

4. **Start with PM2**
   ```bash
   # Start application
   pm2 start npm --name "personal-website" -- start
   
   # Save PM2 configuration
   pm2 save
   
   # Setup PM2 to start on boot
   pm2 startup
   sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u $USER --hp $HOME
   ```

5. **Configure Nginx**
   ```bash
   sudo nano /etc/nginx/sites-available/personal-website
   ```
   
   Add:
   ```nginx
   server {
       listen 80;
       server_name jerryzhu.org www.jerryzhu.org;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```
   
   Enable site:
   ```bash
   sudo ln -s /etc/nginx/sites-available/personal-website /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

6. **Setup SSL with Let's Encrypt**
   ```bash
   # Install Certbot
   sudo apt install -y certbot python3-certbot-nginx
   
   # Obtain certificate
   sudo certbot --nginx -d jerryzhu.org -d www.jerryzhu.org
   
   # Auto-renewal is configured automatically
   ```

### Option 2: Docker on VM

1. **Install Docker**
   ```bash
   # Install Docker
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   
   # Add user to docker group
   sudo usermod -aG docker $USER
   newgrp docker
   
   # Install Docker Compose
   sudo apt install -y docker-compose
   ```

2. **Deploy with Docker Compose**
   ```bash
   # Clone repository
   git clone https://github.com/your-username/personal-website.git
   cd personal-website
   
   # Create .env file
   cat > .env << EOF
   NEXT_PUBLIC_SITE_URL=https://jerryzhu.org
   EOF
   
   # Start services
   docker-compose up -d
   ```

3. **Setup SSL**
   - Copy SSL certificates to `./ssl/` directory
   - Or use the nginx.conf with Let's Encrypt

### Maintenance Commands

```bash
# PM2 Management
pm2 list                    # List all processes
pm2 logs personal-website   # View logs
pm2 restart personal-website # Restart app
pm2 stop personal-website   # Stop app
pm2 delete personal-website # Remove app

# Docker Management
docker-compose logs -f      # View logs
docker-compose restart      # Restart services
docker-compose down         # Stop services
docker-compose pull && docker-compose up -d  # Update

# System Management
sudo systemctl status nginx # Check Nginx status
sudo systemctl restart nginx # Restart Nginx
sudo certbot renew --dry-run # Test SSL renewal
```

---

## CI/CD Setup

### GitHub Actions (Automated)

The repository includes a `.github/workflows/ci-cd.yml` file that automatically:
- Runs tests on pull requests
- Builds Docker images on push to main
- Deploys to Vercel
- Deploys to Kubernetes

### Required Secrets

Add these secrets in GitHub: Settings → Secrets → Actions:

```
GITHUB_TOKEN              # Automatically provided
VERCEL_TOKEN             # From vercel.com/account/tokens
VERCEL_ORG_ID            # From vercel.com/[org]/settings
VERCEL_PROJECT_ID        # From project settings
KUBE_CONFIG              # Base64 encoded kubeconfig
NEXT_PUBLIC_SITE_URL     # Your site URL
```

### Manual Deployment Trigger

```bash
# Trigger deployment by pushing to main
git push origin main

# Or create a tag
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0
```

---

## Monitoring and Logging

### PM2 Monitoring

```bash
# Monitor in real-time
pm2 monit

# Web-based monitoring
pm2 plus
```

### Kubernetes Monitoring

```bash
# Install metrics server
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml

# View resource usage
kubectl top nodes
kubectl top pods -n production
```

### Log Aggregation

Consider setting up:
- **ELK Stack** (Elasticsearch, Logstash, Kibana)
- **Grafana + Prometheus** for metrics
- **Datadog** or **New Relic** for APM

---

## Rollback Procedures

### Vercel
```bash
# List deployments
vercel list

# Rollback to previous deployment
vercel rollback [deployment-url]
```

### Kubernetes
```bash
# View rollout history
kubectl rollout history deployment/personal-website -n production

# Rollback to previous version
kubectl rollout undo deployment/personal-website -n production

# Rollback to specific revision
kubectl rollout undo deployment/personal-website --to-revision=2 -n production
```

### Docker
```bash
# Pull previous image version
docker pull your-username/personal-website:previous-tag

# Update docker-compose.yml with previous tag
# Then restart
docker-compose up -d
```

---

## Troubleshooting

### Build Issues
```bash
# Clear Next.js cache
rm -rf .next

# Clear node_modules
rm -rf node_modules package-lock.json
npm install
```

### Port Already in Use
```bash
# Find process using port 3000
lsof -ti:3000

# Kill the process
kill -9 $(lsof -ti:3000)
```

### Docker Issues
```bash
# Remove all containers and images
docker system prune -a

# Rebuild without cache
docker build --no-cache -t personal-website:latest .
```

### Kubernetes Issues
```bash
# Describe pod to see errors
kubectl describe pod [pod-name] -n production

# View logs
kubectl logs -f [pod-name] -n production

# Force delete stuck pod
kubectl delete pod [pod-name] --grace-period=0 --force -n production
```

---

## Performance Optimization

### Next.js Configuration

Add to `next.config.js`:
```javascript
module.exports = {
  output: 'standalone',
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
}
```

### CDN Setup

Consider using:
- **Cloudflare** (free tier available)
- **AWS CloudFront**
- **Vercel Edge Network** (automatic)

---

## Security Best Practices

1. **Keep dependencies updated**
   ```bash
   npm audit
   npm audit fix
   ```

2. **Use environment variables for secrets**
   - Never commit `.env` files
   - Use Kubernetes secrets for sensitive data

3. **Enable HTTPS everywhere**
   - Use Let's Encrypt certificates
   - Configure HSTS headers

4. **Set up firewall rules**
   ```bash
   # Allow only necessary ports
   sudo ufw allow 22/tcp
   sudo ufw allow 80/tcp
   sudo ufw allow 443/tcp
   sudo ufw enable
   ```

5. **Regular backups**
   - Backup database (if applicable)
   - Backup configuration files
   - Store backups offsite

---

## Support

For issues or questions:
- Check logs first
- Review error messages
- Consult Next.js documentation
- Check deployment platform status pages

---

## License

This deployment guide is part of the personal-website project.

# AWS MERN Deployment Steps

## 1. **Create Free AWS Account**

Create free AWS Account at https://aws.amazon.com/

## 2. Create an Launch an EC2 instance and SSH into machine

I would be creating a t2.micro ubuntu machine for this demo.

## 3. Setup GitHub SSH Access

```jsx
ssh-keygen -t ed25519 -C "your_email@example.com"
```

## 4. Copy the SSH key

```jsx
cat ~/.ssh/id_ed25519.pub
```

Copy the output and add it to your GitHub account:

- Go to GitHub > Settings > SSH and GPG Keys > **New SSH Key**

Now test:

```jsx
ssh -T git@github.com
```

## 5. Clone Your Repositories

```jsx
git clone git@github.com:your-username/frontend-repo.git
git clone git@github.com:your-username/backend-repo.git
```

## 6. Install Node Js

```jsx
curl -fsSL https://deb.nodesource.com/setup_current.x | sudo -E bash -
sudo apt install -y nodejs
```

## 7. Install Mongo DB

```jsx
sudo apt-get install gnupg
curl -fsSL https://www.mongodb.org/static/pgp/server-8.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-8.0.gpg \
   --dearmor
   
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg ] https://repo.mongodb.org/apt/ubuntu noble/mongodb-org/8.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-8.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
```

## 8.Start mongodb

```jsx
sudo systemctl start mongod
sudo systemctl enable mongod
```

## 9. Install Nginx

```jsx
sudo apt update
sudo apt install -y nginx
```

## 10. Setup Front End

```jsx
cd frontend-repo
npm install
npm run build
```

Move the build to a location like `/var/www/frontend`:

```jsx
sudo mkdir -p /var/www/frontend
sudo cp -r dist/* /var/www/frontend/
```

## 11. Setup Backend

Create .env file and update the environment variable in it

```jsx
cd backend-repo
npm install
npm run start
```

## 12. Install pm2

```jsx
sudo npm install -g pm2
```

Run the backend using pm2

```jsx
pm2 start index.js --name backend
pm2 save
```

## 13. Configure Nginx

```jsx
sudo vim /etc/nginx/sites-available/default
```

Add the following to the location part of the server block

```jsx
server_name example.com www.example.com;

    location /api/ {
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location / {
        root /var/www/frontend;
        index index.html;
        try_files $uri /index.html;
    }
```

```jsx
# Check NGINX config
sudo nginx -t

# Restart NGINX
sudo nginx -s reload
```

## 14.Setup firewall

```jsx
sudo ufw enable
sudo ufw status
sudo ufw allow ssh (Port 22)
sudo ufw allow http (Port 80)
sudo ufw allow https (Port 443)
```

## 15.Enable SSL with Let’s Encrypt

Install Certbot:

```jsx
sudo apt install certbot python3-certbot-nginx -y
```

Run Certbot:

```jsx
sudo certbot --nginx

```

ssh -i 'your .pem file' ubuntu@your_public_ip_address
2.To Update your ubuntu
//First run this => sudo apt update
//And then run this
sudo apt upgrade

3.Install Node.js in your ubuntu machine
//First run this

curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
//And then run this
sudo apt-get install -y nodejs
4. To Create .env file
vim .env
// After this
Copy everything from your .env file, paste it into the Ubuntu terminal, then press Ctrl + C.
After that, type :wq to save the file.

5. To Edit any file
6.
vim filename

7.

6. Setup to run ec2 instance after closing terminal
sudo npm install -g pm2
// and after this run
pm2 start "your file path" --name "my-node-app"
7. For Frontend
sudo npm install -g serve
// And after this run
pm2 start "serve -s dist -l 3000" --name "vite-app"

Thank you for following this comprehensive AWS MERN deployment guide! If you found this tutorial helpful like, share & subscribe.

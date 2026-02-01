# Setting Up Git Repository on DreamHost

The git push failed because the repository doesn't exist on DreamHost yet. Follow these steps:

## Step 1: SSH into DreamHost

```bash
ssh delalb@iad1-shared-b7-46.dreamhost.com
```

(Enter your SSH password when prompted)

## Step 2: Create the Repository Directory

```bash
mkdir -p ~/repos/deltachi.git
cd ~/repos/deltachi.git
git init --bare
```

## Step 3: Set Up Post-Receive Hook (Optional - Auto Deploy)

Create a post-receive hook to automatically deploy when you push:

```bash
cd ~/repos/deltachi.git/hooks
nano post-receive
```

Add this content:

```bash
#!/bin/bash
cd ~/deltachi.ca || exit
unset GIT_DIR
git pull dreamhost master
npm install --production
npm run build
touch tmp/restart.txt
```

Make it executable:

```bash
chmod +x post-receive
```

## Step 4: Clone to Your Domain Directory

```bash
cd ~/deltachi.ca
git clone ~/repos/deltachi.git .
```

## Step 5: Now Push from Your Local Machine

Back on your local machine, run:

```bash
git push dreamhost master
```

## Alternative: Direct Deployment Without Git Hook

If you don't want the auto-deploy hook, you can manually deploy after pushing:

1. Push to repository: `git push dreamhost master`
2. SSH into server: `ssh delalb@iad1-shared-b7-46.dreamhost.com`
3. Pull in domain directory:
   ```bash
   cd ~/deltachi.ca
   git pull ~/repos/deltachi.git master
   npm install --production
   npm run build
   ```
4. Restart Passenger in DreamHost panel



# My React App

A simple React application displaying current time, location, weather, and Namaste greeting.

## Features

- 🕐 Real-time clock with current date and time
- 📍 User's current location (latitude, longitude)
- 🌤️ Simulated weather data
- 🙏 Namaste greeting with beautiful UI
- 📱 Responsive design

## Local Development

### Prerequisites
- Node.js (v18 or higher)
- npm

### Setup
1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm start
   ```

3. Open [http://localhost:8001](http://localhost:8001) in your browser

### Build for Production
```bash
npm run build
```

### Serve Production Build Locally
```bash
npm run serve
```

## Deployment

This project uses GitHub Actions for automated deployment to a remote server.

### Prerequisites
1. A remote server with SSH access
2. The following GitHub Secrets configured:
   - `SSH_PRIVATE_KEY`: Your SSH private key
   - `SSH_HOST`: Your server's IP address or hostname
   - `SSH_PORT`: SSH port (usually 22)
   - `SSH_USER`: SSH username

### Deployment Process

The GitHub Actions workflow automatically:

1. **Connects to your server** and verifies connectivity
2. **Copies project files** using rsync (excluding unnecessary files)
3. **Installs dependencies** including Node.js and PM2 if needed
4. **Builds the React application** for production
5. **Deploys using PM2** for process management
6. **Verifies deployment** by checking if the app responds
7. **Provides deployment summary** with management commands

### Manual Server Management

Once deployed, you can manage the application on your server:

```bash
# Check PM2 status
pm2 status

# View logs
pm2 logs my-react-app

# Restart application
pm2 restart my-react-app

# Stop application
pm2 stop my-react-app

# Delete application from PM2
pm2 delete my-react-app

# View real-time logs
pm2 logs my-react-app --follow
```

### Log Files

Application logs are stored in:
- Error logs: `~/my-app-deployment/logs/err.log`
- Output logs: `~/my-app-deployment/logs/out.log`
- Combined logs: `~/my-app-deployment/logs/combined.log`

### Troubleshooting

1. **Application not starting:**
   ```bash
   pm2 logs my-react-app
   cd ~/my-app-deployment && npm run build
   ```

2. **Port already in use:**
   ```bash
   sudo netstat -tlnp | grep :8001
   pm2 restart my-react-app
   ```

3. **Dependencies issues:**
   ```bash
   cd ~/my-app-deployment
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   pm2 restart my-react-app
   ```

## Project Structure

```
my-app/
├── public/
│   └── index.html
├── src/
│   ├── App.js          # Main component
│   ├── App.css         # Styles
│   └── index.js        # Entry point
├── .github/
│   └── workflows/
│       └── deploy.yml  # Deployment workflow
├── package.json
├── .env               # Environment variables
└── README.md
```

## Environment Variables

- `PORT=8001`: Application port (default: 8001)

## Technology Stack

- **Frontend**: React 18
- **Build Tool**: Create React App
- **Process Manager**: PM2
- **Server**: serve (for production)
- **Deployment**: GitHub Actions
- **Styling**: CSS3 with Flexbox/Grid

## License

This project is open source and available under the [MIT License](LICENSE).

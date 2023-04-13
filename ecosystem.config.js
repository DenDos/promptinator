module.exports = {
  apps: [
    {
      name: 'promptinator', // Name of the application
      script: 'dist/src/server.js', // Entry point (script) of the application
      instances: 1, // Number of instances to run
      autorestart: true, // Automatically restart the application if it crashes
      watch: false, // Watch for file changes and restart the application if necessary
      max_memory_restart: '450M', // Maximum memory allowed before restarting the application
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      max_size: '100M',
      env: {
        NODE_ENV: 'development', // Environment variables for the development environment
      },
      env_production: {
        NODE_ENV: 'production', // Environment variables for the production environment
      },
    },
  ],
}

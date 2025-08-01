# Use a lightweight Alpine-based Nginx image as the base image
FROM nginx:alpine

# Copy the built frontend application files to the Nginx webroot directory inside the container
# Replace 'dist' with the actual directory containing your built frontend files
COPY dist /usr/share/nginx/html

# Optional: Copy a custom Nginx configuration file if needed
# For single-page applications, you might need to configure Nginx to serve index.html for all paths
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80, the default HTTP port
EXPOSE 80

# Run Nginx as a non-root user
USER nginx

# Command to run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
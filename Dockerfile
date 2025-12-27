# First build stage
FROM node:20-slim AS build
# Install pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app
# Copy configuration file first to cache dependencies
COPY pnpm-lock.yaml package.json ./
# Install dependencies
RUN pnpm install --frozen-lockfile
# Copy rest of the files
COPY . .
# Build the application
RUN pnpm run build

# Second stage serve with Nginx
FROM nginx:alpine
# Copy the static files from the build stage to Nginx
COPY --from=build /app/dist /usr/share/nginx/html
# Expose port 80
EXPOSE 80
# Command for running the image
CMD ["nginx", "-g", "daemon off;"]
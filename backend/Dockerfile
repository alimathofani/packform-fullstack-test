# Use an official Go runtime as a parent image
FROM golang:1.21.6

# Set the working directory to /usr/src/app
WORKDIR /usr/src/app

# Copy go.mod and go.sum to download dependencies
COPY go.mod go.sum ./

# Download and install dependencies
RUN go mod download

# Copy the local package files to the container's working directory
COPY . .

# Build the Go application
RUN go build -o myapp

# Expose port 8080 to the outside world
EXPOSE 8080

# Command to run the executable
CMD ["./myapp"]
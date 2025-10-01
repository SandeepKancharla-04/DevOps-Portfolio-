// Source Code Modal Functions
function showSourceCode(projectId) {
    const modal = document.getElementById('sourceModal');
    const modalTitle = document.getElementById('modalTitle');
    const codeDisplay = document.getElementById('codeDisplay');
    
    // Set project-specific title
    const projectTitles = {
        'multi-cloud': 'Multi-Cloud Infrastructure',
        'cicd-pipeline': 'CI/CD Pipeline',
        'container-orchestration': 'Container Orchestration',
        'monitoring-solution': 'Monitoring Solution'
    };
    
    modalTitle.textContent = `${projectTitles[projectId] || 'Project'} - Source Code`;
    
    // Show Terraform code by default
    showTab('terraform');
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeSourceModal() {
    const modal = document.getElementById('sourceModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function showTab(tabName) {
    // Remove active class from all tabs
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked tab
    event.target.classList.add('active');
    
    // Show corresponding code
    const codeDisplay = document.getElementById('codeDisplay');
    
    const codeSamples = {
        terraform: `# main.tf - Multi-Cloud Infrastructure
provider "aws" {
  region = "us-east-1"
}

# VPC Configuration
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true
  
  tags = {
    Name = "multi-cloud-vpc"
    Environment = "production"
  }
}

# Security Groups
resource "aws_security_group" "web" {
  name_prefix = "web-sg-"
  vpc_id      = aws_vpc.main.id
  
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# EC2 Instance
resource "aws_instance" "web" {
  ami           = "ami-0c02fb55956c7d3"
  instance_type = "t3.micro"
  vpc_security_group_ids = [aws_security_group.web.id]
  
  tags = {
    Name = "multi-cloud-web-server"
    Environment = "production"
  }
}`,
        
        docker: `# Dockerfile - Multi-Cloud Application
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS runtime

# Install security updates
RUN apk update && apk upgrade

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

WORKDIR /app

# Copy application files
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --chown=nextjs:nodejs . .

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD curl -f http://localhost:3000/health || exit 1

USER nextjs

EXPOSE 3000

CMD ["npm", "start"]`,
        
        jenkins: `# Jenkinsfile - CI/CD Pipeline
pipeline {
    agent any
    
    environment {
        AWS_REGION = 'us-east-1'
        ECR_REPOSITORY = 'multi-cloud-app'
        EKS_CLUSTER = 'multi-cloud-eks'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build') {
            steps {
                script {
                    def image = docker.build("${ECR_REPOSITORY}:${BUILD_NUMBER}")
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    }
});

// Contact form handling
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    // Simulate form submission
    alert('Thank you for your message! I\'ll get back to you soon.');
    this.reset();
});

// Add scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.skill-category, .project-card, .timeline-item, .highlight-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

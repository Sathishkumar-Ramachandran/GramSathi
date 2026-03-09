provider "aws" {
  region = "ap-south-1"
}

# 1. Create the Instance Role for App Runner
resource "aws_iam_role" "apprunner_instance_role" {
  name = "GramSathiAppRunnerInstanceRole"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "tasks.apprunner.amazonaws.com"
        }
      }
    ]
  })
}

# 2. Attach Bedrock permissions to the Instance Role
resource "aws_iam_role_policy_attachment" "bedrock_access" {
  role       = aws_iam_role.apprunner_instance_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonBedrockFullAccess"
}

# 3. Create the App Runner Service
resource "aws_apprunner_service" "gramsathi_backend" {
  service_name = "gramsathi-backend"

  source_configuration {
    authentication_configuration {
      connection_arn = var.github_connection_arn
    }
    code_repository {
      code_configuration {
        configuration_source = "API"
        code_configuration_values {
          build_command = "pip install -r requirements.txt"
          port          = "8080"
          runtime       = "PYTHON_311"
          start_command = "uvicorn app:app --host 0.0.0.0 --port 8080"
        }
      }
      repository_url = var.github_repository_url
      source_code_version {
        type  = "BRANCH"
        value = "main"
      }
    }
  }

  instance_configuration {
    instance_role_arn = aws_iam_role.apprunner_instance_role.arn
  }
}

# --- Variables ---

variable "github_connection_arn" {
  type        = string
  description = "The ARN of the App Runner connection to GitHub (Create this in the AWS Console first)"
}

variable "github_repository_url" {
  type        = string
  description = "The URL of your GitHub repository (e.g. https://github.com/username/gramsathi-backend)"
}

# --- Outputs ---

output "apprunner_service_url" {
  value = "https://${aws_apprunner_service.gramsathi_backend.service_url}"
  description = "The deployed GramSathi backend URL"
}

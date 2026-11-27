# Contributing to Student Assignment Tracker

Thank you for wanting to contribute! Here's how to get started:

## Development Workflow

### 1. Fork and Branch
- Fork the repository on GitHub
- Create a new branch from `main`: `git checkout -b feature/<your-feature-name>`

### 2. Local Development
```bash
# Install dependencies
npm ci

# Run the development server
npm run dev
# App runs at http://localhost:3000
```

### 3. Code Standards
- **TypeScript**: Ensure type checking passes (`npx tsc --noEmit`)
- **Linting**: Run `npm run lint` to check for code style issues
- **Tests**: Add tests for new functionality in `lib/__tests__/`

### 4. GitHub Actions CI/CD
Every push and pull request triggers the following checks:

| Job | Description |
|-----|-------------|
| `test` | Type checks, installs dependencies, builds Next.js |
| `lint` | Runs ESLint to validate code style |
| `docker` | Builds and pushes Docker image to Docker Hub (on merge to main) |

### 5. Pull Request Process
1. Push your branch to your fork
2. Open a Pull Request against `nadeemsahu:main`
3. Ensure all CI checks pass (check the "Checks" tab)
4. Address any feedback from maintainers
5. Once approved, maintainers will merge the PR

### 6. Docker Image Releases
When merging to `main`, the GitHub Actions workflow automatically:
- Builds a Docker image tagged with the commit SHA
- Also tags as `stable-<short-sha>`
- Pushes to Docker Hub (requires `DOCKERHUB_USERNAME` and `DOCKERHUB_TOKEN` secrets)

### 7. Adding New Features
1. Create a new branch from `main`
2. Implement your feature following the existing patterns
3. Add appropriate tests
4. Ensure `npm run build` succeeds
5. Submit a Pull Request

### 6. License
This project is licensed under the MIT License. See `LICENSE` for details.
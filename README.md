<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# KRACKEDREPO

<div align="center">
  <p><strong>Created by ctaxnagomi</strong></p>
  <p><strong>Transform raw codebases into investor-ready MVP showcases using AI-powered analysis</strong></p>
  <p>
    <a href="#features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#installation">Installation</a> •
    <a href="#usage">Usage</a> •
    <a href="#contributing">Contributing</a> •
    <a href="#license">License</a>
  </p>
</div>

---

## 🚀 What is KRACKEDREPO?

KRACKEDREPO is a cutting-edge tool that leverages AI-powered analysis to transform code repositories into comprehensive MVP (Minimum Viable Product) presentations. Currently using Google Gemini 3 Pro, it can be adapted to work with other large language models like OpenAI GPT-4, Anthropic Claude 3, or similar AI services. Whether you're a developer looking to pitch your project or an investor evaluating opportunities, KRACKEDREPO provides deep insights into:

- **Core Value Proposition**: Identifies the fundamental problem your code solves
- **Technology Stack**: Analyzes and suggests optimal tech choices with detailed roles
- **Launch Roadmap**: Creates structured development timelines
- **Market Valuation**: Estimates Seed/Pre-seed stage valuations in USD and MYR
- **Feature Extraction**: Pulls out key functionalities from your codebase

The tool offers both a sleek web interface for interactive analysis and a powerful CLI worker for batch processing repositories.

## ✨ Features

### Web Dashboard
- **File Upload Interface**: Drag-and-drop repository files for instant analysis
- **Interactive Dashboard**: Explore results through tabbed views (Overview, Architecture, Community, Funding)
- **Tech Stack Visualization**: See your technologies represented with icons and detailed tooltips
- **Valuation Estimates**: Get AI-calculated market valuations with currency formatting
- **Funding Simulation**: Mock crowdfunding interface with backer management
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Smooth Animations**: Powered by GSAP for a polished user experience

### CLI Worker
- **Batch Processing**: Analyze entire repositories from the command line
- **Flexible Input**: Process current directory or specify custom paths
- **JSON Output**: Structured data perfect for integration or further processing
- **File Type Filtering**: Automatically handles common development file types
- **Error Handling**: Robust error reporting and graceful failure handling

### AI-Powered Analysis
- **Multi-Model Support**: Currently uses Google Gemini 3 Pro, extensible to OpenAI GPT-4, Anthropic Claude 3, and other LLMs
- **Structured Output**: Consistent JSON schema for all analyses
- **Context-Aware**: Considers file relationships and project structure
- **Market Intelligence**: Provides realistic valuation estimates based on technical complexity

## 🛠 Tech Stack

<div align="center">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Google_Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Google Gemini" />
  <img src="https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white" alt="OpenAI" />
  <img src="https://img.shields.io/badge/Anthropic-191919?style=for-the-badge&logo=anthropic&logoColor=white" alt="Anthropic" />
  <img src="https://img.shields.io/badge/GSAP-0AC775?style=for-the-badge&logo=greensock&logoColor=white" alt="GSAP" />
  <img src="https://img.shields.io/badge/Lucide--React-000000?style=for-the-badge&logo=react&logoColor=white" alt="Lucide React" />
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
</div>

## 📦 Installation

### Prerequisites
- **Node.js** (v16 or higher)
- **AI API Key** (currently supports Google Gemini 3 Pro, extensible to OpenAI GPT-4, Anthropic Claude 3, and other LLM providers)

### Setup Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/krackedrepo.git
   cd krackedrepo
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Copy the example environment file:
     ```bash
     cp .env.example .env.local
     ```
   - Edit `.env.local` and add your AI API key:
     ```env
     GEMINI_API_KEY=your_actual_api_key_here
     # Or for other providers:
     # OPENAI_API_KEY=your_openai_key_here
     # ANTHROPIC_API_KEY=your_anthropic_key_here
     ```

4. **Verify installation:**
   ```bash
   npm run dev
   ```
   The web app should start on `http://localhost:3000`

## 📖 Usage

### Web Application

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Upload files:**
   - Open your browser to `http://localhost:3000`
   - Drag and drop repository files or click to browse
   - Watch the terminal-style conversion process

3. **Explore results:**
   - **Overview**: See project summary, features, roadmap, and valuations
   - **Architecture**: View tech stack with interactive icons
   - **Community**: Mock team profiles and collaboration features
   - **Funding**: Simulated crowdfunding with backer management

### CLI Worker

The CLI worker allows you to analyze repositories from the command line:

```bash
# Analyze current directory
npm run worker

# Analyze specific directory
npm run worker -- ./path/to/your/project

# Analyze another repository
npm run worker -- /home/user/awesome-project
```

**Example Output:**
```json
{
  "projectName": "My Awesome App",
  "tagline": "Revolutionizing task management",
  "overview": "A modern task management application...",
  "techStack": [
    {
      "name": "React",
      "role": "Handles the user interface and component rendering"
    }
  ],
  "features": ["User authentication", "Task creation", "Real-time updates"],
  "roadmap": ["Q1: MVP launch", "Q2: Mobile app", "Q3: API expansion"],
  "suggestedMvpVersion": "1.0.0",
  "valuationUSD": 250000,
  "valuationMYR": 1175000
}
```

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Development Setup

1. **Fork the repository** on GitHub
2. **Clone your fork:**
   ```bash
   git clone https://github.com/yourusername/krackedrepo.git
   cd krackedrepo
   ```
3. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. **Install dependencies:**
   ```bash
   npm install
   ```
5. **Set up your environment** (see Installation section)

### Making Changes

1. **Follow the code style:**
   - Use TypeScript for all new code
   - Follow existing naming conventions
   - Add JSDoc comments for new functions
   - Ensure proper error handling

2. **Test your changes:**
   - Run the development server: `npm run dev`
   - Test the CLI worker: `npm run worker`
   - Verify both web and CLI functionality

3. **Commit your changes:**
   ```bash
   git add .
   git commit -m "Add: Brief description of your changes"
   ```

4. **Push and create a Pull Request:**
   ```bash
   git push origin feature/your-feature-name
   ```
   Then open a PR on GitHub with a clear description of your changes.

### Contribution Guidelines

- **Bug Reports**: Use GitHub Issues with detailed reproduction steps
- **Feature Requests**: Describe the problem and proposed solution
- **Code Reviews**: All PRs require review before merging
- **Documentation**: Update README and code comments as needed

### Areas for Contribution

- **UI/UX Improvements**: Enhance the web interface design
- **AI Integration**: Add support for additional LLM providers (OpenAI, Anthropic, etc.)
- **Additional File Types**: Support more programming languages
- **Testing**: Add unit and integration tests
- **Performance**: Optimize analysis speed and memory usage
- **Internationalization**: Add support for multiple languages

## 👥 Contributors

- **ctaxnagomi** - Project creator and maintainer

We appreciate all contributors! If you've forked this repository and made improvements, please submit a pull request to be added to this list.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **ctaxnagomi**: Project creator and lead developer
- **Google Gemini AI**: For powering the intelligent code analysis
- **React & TypeScript**: For the robust frontend framework
- **GSAP**: For smooth animations
- **Lucide React**: For beautiful icons
- **Vite**: For fast development and building

---

<div align="center">
  <p>Made with ❤️ using AI and modern web technologies</p>
  <p>
    <a href="https://github.com/yourusername/krackedrepo/issues">Report Issues</a> •
    <a href="https://github.com/yourusername/krackedrepo/discussions">Discussions</a> •
    <a href="https://github.com/yourusername/krackedrepo/stargazers">Star on GitHub</a>
  </p>
</div>

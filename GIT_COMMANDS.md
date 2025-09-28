# 🚀 Quick Git Commands for Code Yatra

## First Time Setup (Run these in PowerShell)

```powershell
# Navigate to your project folder
cd "C:\Users\mithun m\OneDrive\Desktop\Code_Yatra"

# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "🚀 Initial commit: Code Yatra portfolio website

Features:
- Modern responsive design with black/white/gold theme
- GSAP animations and smooth interactions  
- Working EmailJS contact form with security features
- SEO optimized with social media meta tags
- Cross-browser compatible and mobile-friendly"

# Set main branch
git branch -M main

# Add your GitHub repository (replace 'yourusername' with your GitHub username)
git remote add origin https://github.com/yourusername/Code-Yatra.git

# Push to GitHub
git push -u origin main
```

## Future Updates

```powershell
# For future changes, use these commands:

# Add changes
git add .

# Commit with descriptive message
git commit -m "✨ Add new feature or fix"

# Push to GitHub
git push
```

## Quick Setup Checklist

Before running the commands:

1. ✅ Create repository on GitHub named "Code-Yatra"
2. ✅ Make sure repository is public (for GitHub Pages)
3. ✅ Replace "yourusername" in the git remote command
4. ✅ Update README.md and meta tags with your info

After pushing:

1. ✅ Go to GitHub repository Settings → Pages
2. ✅ Set source to "Deploy from a branch"
3. ✅ Select "main" branch and "/ (root)"
4. ✅ Your site will be live at: https://yourusername.github.io/Code-Yatra/

## Troubleshooting

If you get permission errors:
```powershell
# Make sure you're logged into GitHub
# You might need to use GitHub Desktop or generate a personal access token
```

If files are too large:
```powershell
# Check which files are large
git ls-files | xargs du -h | sort -hr | head -20

# Remove large files and use .gitignore
```

## 🎉 Success!

Once pushed successfully, your Code Yatra portfolio will be live on GitHub Pages!

Remember to:
- Update your LinkedIn and resume with the live portfolio URL
- Test the site on different devices
- Share it with the coding community
- Keep updating it with new projects

**Happy coding! 🚀**
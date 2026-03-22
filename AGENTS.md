# AGENTS.md - Agent Coding Guidelines for Jekyll Theme Minimal

## Project Overview

This is the Jekyll Theme Minimal - a GitHub Pages theme written in
Ruby and SCSS. The project uses:
- **Ruby** (>= 2.4.0) for build tooling
- **Jekyll** (> 3.5, < 5.0) for static site generation
- **SCSS** for stylesheets
- **HTMLProofer** for testing rendered HTML (currently disabled due to Ruby 4.0.1 compatibility)
- **RuboCop** for Ruby linting (using rubocop-github)
- **w3c_validators** for HTML validation (currently disabled due to Ruby 4.0.1 compatibility)

---

## Build / Lint / Test Commands

### Setup / Installation
```bash
script/bootstrap          # Install bundler and dependencies
```

### Running the full build and test suite
```bash
script/cibuild            # Runs: jekyll build, htmlproofer, rubocop, validate-html
```

### Individual commands
```bash
bundle exec jekyll build                    # Build the site to _site/
bundle exec jekyll serve                     # Serve locally (for manual testing)
bundle exec htmlproofer ./_site --check-html --check-sri    # Test HTML output
bundle exec rubocop -D --config .rubocop.yml # Lint Ruby files
bundle exec script/validate-html              # Validate HTML with W3C validators
```

### Running a single test
There is no granular test runner. To test specific functionality:
1. Run `bundle exec jekyll build` to build the site
2. Run `bundle exec htmlproofer ./_site --check-html --check-sri` to test output
3. Run `bundle exec rubocop <file.rb>` to lint specific Ruby files

### Publishing the gem
```bash
gem build jekyll-theme-minimal.gemspec
gem push jekyll-theme-minimal-*.gem
```
Note: Bump version in `jekyll-theme-minimal.gemspec` before publishing.

---

## Code Style Guidelines

### General Principles
- Follow the [Jekyll Style Guide](https://ben.balter.com/jekyll-style-guide)
- Each pull request should implement **one** feature or bug fix
- Do not commit changes to files irrelevant to your feature or bug fix
- Include screenshots for visual changes (before and after)
- Update documentation if changing user-facing functionality

### Ruby Code Style
- Inherit from `rubocop-github` configuration (see `.rubocop.yml`)
- Use frozen string literals: `# frozen_string_literal: true` at the top of all Ruby files
- Follow standard Ruby naming conventions (snake_case for methods/variables, CamelCase for classes)
- Exclude `_site/**/*` and `vendor/**/*` from linting
- Use 2-space indentation (Ruby convention)
- Prefer single quotes for strings unless interpolation is needed
- Use `%w[]` for word arrays and `%i[]` for symbol arrays
- Avoid rescue without specifying exception class

### SCSS / CSS Style
- Place SCSS files in `_sass/` directory
- Follow the existing structure:
  - `_sass/jekyll-theme-minimal.scss` - main theme styles
  - `_sass/minimal.scss` - minimal overrides
  - `_sass/fonts.scss` - font definitions
  - `_sass/rouge-github.scss` - syntax highlighting
- Use SCSS variables for colors and spacing
- Keep styles modular and component-based
- Use 2-space indentation (SCSS convention)
- Prefer CSS custom properties (variables) for themeable values

### File Organization
```
_includes/    - Jekyll include templates
_layouts/     - Jekyll layout templates
_sass/        - SCSS stylesheets
assets/       - Static assets (images, JS)
docs/         - Documentation
script/       - Build scripts
```

### Error Handling
- Jekyll build errors will be caught by `jekyll build`
- HTML issues will be caught by HTMLProofer
- Ruby style issues will be caught by RuboCop
- Fix all errors before submitting a PR

### Git Commit Guidelines
- Write [good commit messages](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html)
- Do not bump version numbers (maintainers will do this)
- Create a new branch for each feature/fix: `git checkout -b my-branch-name`

### Testing Requirements
- Run `script/cibuild` before submitting any PR
- Ensure all tests pass locally
- Test visual changes with `bundle exec jekyll serve` and browser inspection

---

## Common Issues / Troubleshooting

### Ruby version issues
- Ensure Ruby >= 2.4.0 is installed
- Use `rbenv` or `rvm` if multiple Ruby versions are needed

### HTMLProofer failures
- Ensure Jekyll built successfully first
- Check for broken internal links
- Verify SRI (Subresource Integrity) hashes are valid

### RuboCop failures
- Run `bundle exec rubocop -D --autocorrect` to auto-fix some issues
- Review `.rubocop.yml` for specific configuration

---

## Resources

- [Jekyll Documentation](https://jekyllrb.com/)
- [Jekyll Style Guide](https://ben.balter.com/jekyll-style-guide)
- [rubocop-github](https://github.com/github/rubocop-github)
- [HTMLProofer](https://github.com/gjtorikian/html-proofer)

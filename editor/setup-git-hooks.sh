#!/bin/bash
set -e

#* GIT HOOKS *#
echo "🔨 Installing git hooks..."
npm install --global git-conventional-commits 1>/dev/null 2>&1
git config core.hooksPath editor/.git-hooks 1>/dev/null 2>&1

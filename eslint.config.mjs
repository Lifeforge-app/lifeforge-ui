// Plugin imports grouped by type
import pluginJs from '@eslint/js'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import pluginReact from 'eslint-plugin-react'
import reactCompiler from 'eslint-plugin-react-compiler'
import sonarjs from 'eslint-plugin-sonarjs'
import path from 'path'
import process from 'process'
import tseslint from 'typescript-eslint'

const projectRoot = process.cwd()
const srcPath = path.resolve(projectRoot, 'src')

/** @type {import('eslint').Linter.Config[]} */
export default [
  // File patterns
  {
    files: ['./src/**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    ignores: ['node_modules/', 'dist/', 'vite.config.ts', 'tailwind.config.cjs']
  },

  // Core ESLint configurations
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,

  // React configurations
  pluginReact.configs.flat.recommended,
  {
    plugins: {
      'react-compiler': reactCompiler
    },
    rules: {
      'react-compiler/react-compiler': 'error',
      'react/react-in-jsx-scope': 'off'
    }
  },

  // JSX A11y
  {
    files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
    ...jsxA11y.flatConfigs.recommended,
    languageOptions: {
      ...jsxA11y.flatConfigs.recommended.languageOptions
    }
  },

  // SonarJS
  sonarjs.configs.recommended,

  // Consolidated settings
  {
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
          moduleDirectory: ['node_modules', 'src']
        },
        alias: {
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
          map: [
            ['@components', path.resolve(srcPath, 'components')],
            ['@providers', path.resolve(srcPath, 'providers')],
            ['@hooks', path.resolve(srcPath, 'hooks')],
            ['@interfaces', path.resolve(srcPath, 'interfaces')],
            ['@utils', path.resolve(srcPath, 'utils')],
            ['@constants', path.resolve(srcPath, 'constants')]
          ]
        }
      },
      react: {
        version: 'detect'
      }
    }
  }
]

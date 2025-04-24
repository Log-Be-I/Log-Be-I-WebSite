import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";


export default [
  {
    ignores: ['node_modules', 'dist'],   // 무시할 폴더
  },
  {
    files: ['src/**/*.{js,jsx}'],        // 검사할 파일 범위
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      react: require('eslint-plugin-react'),
      prettier: require('eslint-plugin-prettier'),
      tailwindcss: require('eslint-plugin-tailwindcss'),
    },
    rules: {
      // 기본 JS 규칙
      semi: ['error', 'always'],
      quotes: ['error', 'single'],

      // React 관련 권장 규칙
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',

      // Prettier 연동
      'prettier/prettier': 'error',

      // Tailwind class 정렬 검사
      'tailwindcss/classnames-order': 'warn',
    },
  },
];

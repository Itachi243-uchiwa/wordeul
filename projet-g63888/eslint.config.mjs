import globals from 'globals';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';

import path from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import pluginJs from '@eslint/js';

// Mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({ baseDirectory: __dirname, recommendedConfig: pluginJs.configs.recommended });

const eslintConfig = {
    // Configuration ESLint
    settings: {
        react: {
            version: '17.0.2'
        }
    },
    // Configuration globale pour tous les fichiers
    languageOptions: {
        parser: '@typescript-eslint/parser'
    },
    rules: {
        // Ajoutez vos règles globales ici
    }
};

// Configuration spécifique pour les fichiers JavaScript
const jsConfig = {
    files: ['*.js'],
    rules: {
        // Ajoutez vos règles spécifiques pour les fichiers JavaScript ici
    }
};

// Exportez votre configuration ESLint
export default [eslintConfig, jsConfig];

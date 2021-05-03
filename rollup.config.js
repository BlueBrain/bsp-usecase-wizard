
import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import json from "@rollup/plugin-json";
import replace from '@rollup/plugin-replace';
import copy from 'rollup-plugin-copy';
import css from 'rollup-plugin-css-only';


const production = !process.env.ROLLUP_WATCH;

const baseUrl = process.env.BASE_URL || '';
const callbackUrl = process.env.CALLBACK_URL || `${baseUrl}/index.html`;
const pjson = require('./package.json');
const appVersion = pjson.version || '';

console.log('BASE_URL:', baseUrl);
console.log('CALLBACK_URL:', callbackUrl);
console.log('VERSION', appVersion);

function serve() {
	let server;
	
	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

export default {
	input: 'src/main.ts',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js'
	},
	plugins: [
		svelte({
			compilerOptions: {
				// enable run-time checks when not in production
				dev: !production
			},
			preprocess: sveltePreprocess(),
		}),
		// we'll extract any component CSS out into
		// a separate file - better for performance
		css({ output: 'style_bundle.css' }),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),
		postcss({
			extract: false,
			minimize: true,
			use: [
				['sass', {
					includePaths: [
						'./theme',
						'./node_modules'
					]
				}]
			]
		}),
		typescript({
			sourceMap: !production,
			inlineSources: !production
		}),
		json(),
		replace({
			preventAssignment: true,
			processEnvs: JSON.stringify({
				baseUrl,
				appVersion,
			}),
		}),
		copy({
			targets: [
				{
					src: 'public/index.html',
					dest: 'public/build',
					transform: (contents) => {
						return contents.toString().replace(/{{BASE_URL}}/g, baseUrl);
					},
				},
				{
					src: 'public/callback.html',
					dest: 'public/build',
					transform: (contents) => {
						return contents.toString().replace(/{{CALLBACK_URL}}/g, callbackUrl);
					},
				},
				{
					src: ['public/favicon.ico', 'public/global.css', 'public/silent-renew.html'],
					dest: 'public/build',
				},
			],
		}),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false,
	}
};

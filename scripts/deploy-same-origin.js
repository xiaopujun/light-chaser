#!/usr/bin/env node

const fs = require('fs/promises');
const path = require('path');
const {spawnSync} = require('child_process');

const repoRoot = path.resolve(__dirname, '..');
const frontendDir = path.join(repoRoot, 'frontend');
const backendDir = path.join(repoRoot, 'backend');
const frontendDistDir = path.join(frontendDir, 'dist');
const backendStaticDir = path.join(backendDir, 'src', 'main', 'resources', 'static');
const backendJarName = 'lc-server.jar';
const releaseDocPath = path.join(repoRoot, 'docs', '部署运维说明.md');
const releaseBundleDir = path.join(backendDir, 'target', 'lc-server-release');
const releaseZipPath = path.join(backendDir, 'target', 'lc-server-release.zip');

const args = new Set(process.argv.slice(2));
const dryRun = args.has('--dry-run');
const skipFrontendBuild = args.has('--skip-frontend-build');
const skipBackendBuild = args.has('--skip-backend-build');
const javaHome = getOptionValue('--java-home') || process.env.JAVA_HOME || process.env.JDK_HOME || '';
const mavenHome = getOptionValue('--maven-home') || process.env.MAVEN_HOME || '';

if (args.has('--help') || args.has('-h')) {
    printHelp();
    process.exit(0);
}

const pnpmCommand = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm';
const mvnCommand = getCommandFromHome(mavenHome, process.platform === 'win32' ? 'mvn.cmd' : 'mvn');
const backendEnv = buildBackendEnv(javaHome);

main().catch((error) => {
    console.error(`[same-origin] ${error.message}`);
    process.exit(1);
});

async function main() {
    log(`Repository root: ${repoRoot}`);

    if (!skipFrontendBuild) {
        runCommand(pnpmCommand, ['build'], frontendDir, 'Build frontend');
    } else {
        log('Skip frontend build');
    }

    await ensureFrontendDist();
    await copyFrontendDist();

    if (!skipBackendBuild) {
        assertJavaVersionAtLeast(backendEnv, 17);
        runCommand(mvnCommand, ['clean', 'package', '-DskipTests'], backendDir, 'Build backend', backendEnv);
    } else {
        log('Skip backend build');
    }

    if (!dryRun) {
        await ensureBackendStaticIndex();
        const backendJarPath = await findBackendJar();
        log(`Backend jar: ${backendJarPath}`);
        const releasePath = await createReleaseBundle(backendJarPath);
        log(`Release zip: ${releasePath}`);
    } else {
        log(`[dry-run] Would create ${releaseZipPath} containing ${backendJarName} and ${path.basename(releaseDocPath)}`);
    }

    log('Same-origin deployment package is ready.');
    log(`Frontend assets: ${backendStaticDir}`);
    log(`Backend jar directory: ${path.join(backendDir, 'target')}`);
    log(`Release zip: ${releaseZipPath}`);
}

function printHelp() {
    console.log(`Usage:
  node scripts/deploy-same-origin.js [options]

Options:
  --dry-run               Print actions without changing files or running builds
  --skip-frontend-build    Reuse the existing frontend/dist output
  --skip-backend-build     Skip the Maven package step
  --java-home <path>       Use a specific JDK home for the backend build
  --maven-home <path>      Use a specific Maven home for the backend build
  -h, --help               Show this help

What it does:
  1. Builds the frontend SPA
  2. Copies frontend/dist into backend/src/main/resources/static
  3. Packages the backend so the jar serves the frontend from the same origin
  4. Bundles lc-server.jar and 部署运维说明.md into backend/target/lc-server-release.zip
`);
}

function log(message) {
    console.log(`[same-origin] ${message}`);
}

function getOptionValue(optionName) {
    const inlineValue = process.argv.find((arg) => arg.startsWith(`${optionName}=`));
    if (inlineValue) {
        return inlineValue.slice(optionName.length + 1);
    }

    const optionIndex = process.argv.indexOf(optionName);
    if (optionIndex === -1) {
        return '';
    }

    return process.argv[optionIndex + 1] || '';
}

function getCommandFromHome(homeDir, defaultCommand) {
    if (!homeDir) {
        return defaultCommand;
    }
    return path.join(homeDir, 'bin', defaultCommand);
}

function buildBackendEnv(selectedJavaHome) {
    if (!selectedJavaHome) {
        return process.env;
    }
    const nextEnv = {...process.env};
    nextEnv.JAVA_HOME = selectedJavaHome;
    nextEnv.PATH = `${path.join(selectedJavaHome, 'bin')}${path.delimiter}${nextEnv.PATH || ''}`;
    return nextEnv;
}

function runCommand(command, commandArgs, cwd, label, env = process.env) {
    log(label);
    if (dryRun) {
        log(`[dry-run] ${command} ${commandArgs.join(' ')} (cwd: ${cwd})`);
        return;
    }
    const result = spawnSync(command, commandArgs, {
        cwd,
        stdio: 'inherit',
        env,
    });
    if (result.error) {
        throw result.error;
    }
    if (result.status !== 0) {
        throw new Error(`${command} ${commandArgs.join(' ')} failed with exit code ${result.status}`);
    }
}

function assertJavaVersionAtLeast(env, minMajorVersion) {
    if (dryRun) {
        log(`[dry-run] Would validate that Java ${minMajorVersion}+ is available for the backend build`);
        return;
    }

    const javaCommand = process.platform === 'win32' ? 'java.exe' : 'java';
    const selectedJavaHome = env.JAVA_HOME || '';
    const command = selectedJavaHome ? path.join(selectedJavaHome, 'bin', javaCommand) : javaCommand;
    const result = spawnSync(command, ['-version'], {
        cwd: backendDir,
        env,
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'pipe'],
    });

    if (result.error) {
        throw new Error(`Unable to execute Java: ${result.error.message}`);
    }

    const output = `${result.stderr || ''}${result.stdout || ''}`;
    const majorVersion = parseJavaMajorVersion(output);
    if (Number.isNaN(majorVersion)) {
        throw new Error(`Unable to detect Java version from output: ${output.trim()}`);
    }
    if (majorVersion < minMajorVersion) {
        throw new Error(`Java ${minMajorVersion}+ is required for the backend build, but the current Java version is ${majorVersion}. Set --java-home to a JDK 17 installation and try again.`);
    }
}

function parseJavaMajorVersion(versionOutput) {
    const match = versionOutput.match(/version\s+"([^"]+)"/);
    if (!match) {
        return Number.NaN;
    }
    const versionText = match[1];
    if (versionText.startsWith('1.')) {
        return Number.parseInt(versionText.split('.')[1], 10);
    }
    return Number.parseInt(versionText.split('.')[0], 10);
}

async function ensureFrontendDist() {
    try {
        await fs.access(frontendDistDir);
    } catch {
        throw new Error(`Frontend dist not found: ${frontendDistDir}`);
    }
}

async function copyFrontendDist() {
    if (dryRun) {
        log(`[dry-run] Would refresh ${backendStaticDir} from ${frontendDistDir}`);
        return;
    }

    await fs.rm(backendStaticDir, {recursive: true, force: true});
    await fs.mkdir(backendStaticDir, {recursive: true});
    await fs.cp(frontendDistDir, backendStaticDir, {recursive: true});
}

async function ensureBackendStaticIndex() {
    const indexPath = path.join(backendStaticDir, 'index.html');
    try {
        await fs.access(indexPath);
    } catch {
        throw new Error(`Frontend index.html was not copied to backend static resources: ${indexPath}`);
    }
}

async function findBackendJar() {
    const targetDir = path.join(backendDir, 'target');
    const candidatePath = path.join(targetDir, backendJarName);
    try {
        await fs.access(candidatePath);
        return candidatePath;
    } catch {
        const entries = await fs.readdir(targetDir, {withFileTypes: true});
        const jars = entries
            .filter((entry) => entry.isFile() && entry.name.endsWith('.jar') && !entry.name.startsWith('original-'))
            .map((entry) => path.join(targetDir, entry.name));

        if (jars.length === 0) {
            throw new Error(`No backend jar was found in ${targetDir}`);
        }

        return jars[0];
    }
}

async function createReleaseBundle(backendJarPath) {
    await fs.access(releaseDocPath);

    await fs.rm(releaseBundleDir, {recursive: true, force: true});
    await fs.rm(releaseZipPath, {force: true});
    await fs.mkdir(releaseBundleDir, {recursive: true});

    const releaseJarPath = path.join(releaseBundleDir, backendJarName);
    const releaseDocBundlePath = path.join(releaseBundleDir, path.basename(releaseDocPath));
    await fs.copyFile(backendJarPath, releaseJarPath);
    await fs.copyFile(releaseDocPath, releaseDocBundlePath);

    const javaMajorVersion = detectJavaMajorVersion(backendEnv);
    const jarCommand = getCommandFromHome(backendEnv.JAVA_HOME || '', process.platform === 'win32' ? 'jar.exe' : 'jar');
    const jarArgs = javaMajorVersion >= 9
        ? ['--create', '--no-manifest', '--file', releaseZipPath, '-C', releaseBundleDir, '.']
        : ['cMf', releaseZipPath, '-C', releaseBundleDir, '.'];

    try {
        runCommand(jarCommand, jarArgs, releaseBundleDir, 'Create release zip', backendEnv);
    } catch (error) {
        await fs.rm(releaseZipPath, {force: true});
        throw error;
    } finally {
        await fs.rm(releaseBundleDir, {recursive: true, force: true});
    }

    return releaseZipPath;
}

function detectJavaMajorVersion(env) {
    const javaCommand = process.platform === 'win32' ? 'java.exe' : 'java';
    const selectedJavaHome = env.JAVA_HOME || '';
    const command = selectedJavaHome ? path.join(selectedJavaHome, 'bin', javaCommand) : javaCommand;
    const result = spawnSync(command, ['-version'], {
        cwd: backendDir,
        env,
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'pipe'],
    });

    if (result.error) {
        throw new Error(`Unable to execute Java: ${result.error.message}`);
    }

    const output = `${result.stderr || ''}${result.stdout || ''}`;
    const majorVersion = parseJavaMajorVersion(output);
    if (Number.isNaN(majorVersion)) {
        throw new Error(`Unable to detect Java version from output: ${output.trim()}`);
    }

    return majorVersion;
}

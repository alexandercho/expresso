const { spawn } = require('node:child_process');

const installTargets = [
    {
        name: 'root',
        args: ['install']
    },
    {
        name: 'backend',
        args: ['--dir', 'backend', 'install']
    },
    {
        name: 'frontend',
        args: ['--dir', 'frontend', 'install']
    }
];

const createPnpmProcess = (args) => {
    if (process.env.npm_execpath) {
        return {
            command: process.execPath,
            args: [process.env.npm_execpath, ...args]
        };
    }

    return {
        command: process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm',
        args
    };
};

const runInstall = ({ name, args }) =>
    new Promise((resolve, reject) => {
        const pnpmProcess = createPnpmProcess(args);
        const child = spawn(pnpmProcess.command, pnpmProcess.args, {
            cwd: process.cwd(),
            env: process.env,
            stdio: 'inherit'
        });

        child.on('error', (error) => {
            reject(new Error(`Failed to install ${name}: ${error.message}`));
        });

        child.on('exit', (code, signal) => {
            if (code === 0) {
                resolve();
                return;
            }

            if (signal) {
                reject(new Error(`${name} install stopped by signal ${signal}.`));
                return;
            }

            reject(new Error(`${name} install exited with code ${code}.`));
        });
    });

const installAll = async () => {
    for (const target of installTargets) {
        console.log(`\n☕ Installing ${target.name} dependencies...\n`);
        await runInstall(target);
    }

    console.log('\n☕ All dependencies installed.\n');
};

installAll().catch((error) => {
    console.error(`\n${error.message}\n`);
    process.exit(1);
});

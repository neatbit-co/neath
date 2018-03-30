const { src, task, exec, context } = require("fuse-box/sparky");
const { FuseBox, QuantumPlugin, HTMLPlugin } = require("fuse-box");
const TsNameOfPlugin = require("./ts-nameof-plugin");
const rimraf = require("rimraf");
 
context(class {
    getConfig() {
        return FuseBox.init({
            homeDir: "src",
            output: "dist/$name.js",
            target : `server@esnext`,
            sourceMaps: { inline: false, vendor: false }, //Not needed as we are debugging with vscode
            plugins: [
                HTMLPlugin(),
                TsNameOfPlugin,
                this.isProduction && QuantumPlugin({
                    uglify: true,
                    treeshake : true,
                    bakeApiIntoBundle: "server"
                })
            ]
        });
    }
})

task("default", async context => {
    const fuse = context.getConfig();
    fuse.dev({ port: 4445, httpServer: false });
    fuse.bundle("server")
        .watch()
        .instructions("> [index.ts]")
        .completed((proc) => {   
            proc.start();
            /* proc.require({
                close: ({ FuseBox }) => {
                    FuseBox.import(FuseBox.mainFile).shutdown();
                }
            }); */
        });

    await fuse.run();
});

task("build:prod", ["clean"], async context => {
    context.isProduction = true;
    const fuse = context.getConfig();
    fuse.bundle("server")
        .instructions("> [index.ts]");

    await fuse.run()
});

task("clean", context => {
    rimraf.sync("./dist");
});
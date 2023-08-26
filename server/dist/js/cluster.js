"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cluster_1 = __importDefault(require("cluster"));
function startWorker() {
    var worker = cluster_1.default.fork();
    console.log("CLUSTER: Worker %d started", worker.id);
}
if (cluster_1.default.isMaster) {
    require("os")
        .cpus()
        .forEach(function () {
        startWorker();
    });
    // log any workers that disconnect; if a worker disconnects, it
    // should then exit, so we'll wait for the exit event to spawn
    // a new worker to replace it
    cluster_1.default.on("disconnect", function (worker) {
        console.log("CLUSTER: Worker %d disconnected from the cluster.", worker.id);
    });
    // when a worker dies (exits), create a worker to replace it
    cluster_1.default.on("exit", function (worker, code, signal) {
        console.log("CLUSTER: Worker %d died with exit code %d (%s)", worker.id, code, signal);
        startWorker();
    });
}
else {
    // start our app on worker; see meadowlark.js
    require("./app.ts")();
}

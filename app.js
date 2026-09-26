const fs = require("fs");
const EventEmitter = require("events");

const emitter = new EventEmitter();

let file1Content = "";
let file2Content = "";
let filesRead = 0;

// Read file 1 asynchronously
fs.readFile("file1.txt", "utf8", (err, data) => {
    if (err) {
        console.error("Error reading file1.txt:", err);
        return;
    }

    file1Content = data;
    filesRead++;

    if (filesRead === 2) {
        emitter.emit("filesReady");
    }
});

// Read file 2 asynchronously
fs.readFile("file2.txt", "utf8", (err, data) => {
    if (err) {
        console.error("Error reading file2.txt:", err);
        return;
    }

    file2Content = data;
    filesRead++;

    if (filesRead === 2) {
        emitter.emit("filesReady");
    }
});

// Event Emitter
emitter.on("filesReady", () => {
    const mergedContent = file1Content + "\n" + file2Content;

    fs.writeFile("merged.txt", mergedContent, "utf8", (err) => {
        if (err) {
            console.error("Error writing merged.txt:", err);
            return;
        }

        console.log("Files merged successfully!");
    });
});
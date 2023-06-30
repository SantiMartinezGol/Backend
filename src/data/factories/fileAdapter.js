import fs from "fs";

class FileAdapter {
  async init() {
 
    if (!fs.existsSync("data.json")) {
      fs.writeFileSync("data.json", JSON.stringify([]));
    }
  }

  async close() {
 
  }
}

export default FileAdapter;
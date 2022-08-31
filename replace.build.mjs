import { getLastCommit } from "git-last-commit";
import path from "path";
import replace from "replace-in-file";

getLastCommit(async (err, commit) => {
  if (err) {
    return;
  }

  const envFiles = ["environment.prod.ts", "environment.ts"];
  const buildDateTime = new Date(Number(commit.committedOn) * 1000);
  const buildTimeStamp = `${buildDateTime.getUTCFullYear()}-${
    (buildDateTime.getUTCMonth() + 1).toString().padStart(2, "0")
  }-${buildDateTime.getUTCDate().toString().padStart(2, "0")} ${
    buildDateTime.getUTCHours().toString().padStart(2, "0")
  }:${buildDateTime.getUTCMinutes().toString().padStart(2, "0")} UTC`;
  const options = {
    from: /{BUILD_TIMESTAMP}/g,
    to: buildTimeStamp,
    allowEmptyPaths: false,
  };

  try {
    envFiles.forEach(async (file) => {
      await replace({
        ...options,
        files: path.resolve(process.cwd(), "src/environments", file),
      });
    });
  } catch (error) {
    console.error(error);
  }
});

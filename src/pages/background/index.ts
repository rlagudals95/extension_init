import { getCookie } from "./getCookie";

// @ts-check
/** @typedef {{ numberOfProcessedImages: number, imagesToDownload: string[], options: any, next: () => void }} Task */

/** @type {Set<Task>} */
const tasks = new Set();

chrome.runtime.onMessage.addListener(startDownload);

//chrome.downloads.onDeterminingFilename.addListener(suggestNewFilename);

function startDownload(
  /** @type {any} */ message: any,
  /** @type {chrome.runtime.MessageSender} */ sender: chrome.runtime.MessageSender,
  /** @type {(response?: any) => void} */ resolve: (response?: any) => void
) {
  if (!(message && message.type === "downloadImages")) return;

  downloadImages({
    numberOfProcessedImages: 0,
    imagesToDownload: message.imagesToDownload,
    options: message.options,
    next() {
      this.numberOfProcessedImages += 1;
      if (this.numberOfProcessedImages === this.imagesToDownload.length) {
        tasks.delete(this);
      }
    },
  }).then(resolve);

  return true;
}

async function downloadImages(/** @type {Task} */ task: any) {
  tasks.add(task);
  let downloadCount;

  let thumbDownloadCount = 0;
  let optDownloadCount = 0;
  let DescDownloadCount = 0;

  for (const image of task.imagesToDownload) {
    if (!image.imageUrl) {
      image.imageUrl = "";
    }
    await new Promise((resolve: any) => {
      let filename = "";
      let imageTypeName;
      if (task.options.folder_name) {
        filename += `${task.options.folder_name}/`;
      }

      if (image.imageType === "thumb") {
        downloadCount = image.fixedFileIndex
          ? String(image.fixedFileIndex).padStart(2, "0")
          : String(thumbDownloadCount + 1).padStart(2, "0");
        imageTypeName = "섬네일";
        thumbDownloadCount++;
      } else if (image.imageType === "opt") {
        downloadCount = image.fixedFileIndex
          ? String(image.fixedFileIndex).padStart(2, "0")
          : String(optDownloadCount + 1).padStart(2, "0");
        imageTypeName = "옵션";
        optDownloadCount++;
      } else if (image.imageType === "desc") {
        downloadCount = image.fixedFileIndex
          ? String(image.fixedFileIndex).padStart(2, "0")
          : String(DescDownloadCount + 1).padStart(2, "0");
        imageTypeName = "상세페이지";
        DescDownloadCount++;
      }

      filename += `${image.imageType}-${imageTypeName}-${downloadCount}.jpg`;

      chrome.downloads.download(
        {
          url: image.imageUrl,
          filename: filename,
        },
        (downloadId) => {
          if (downloadId == null) {
            if (chrome.runtime.lastError) {
              console.error(
                `${image.imageUrl}:`,
                chrome.runtime.lastError.message
              );
            }
            task.next();
          }
          resolve();
        }
      );
    });
  }
}

// 파일명 추측 함수 사용안함
/** @type {Parameters<chrome.downloads.DownloadDeterminingFilenameEvent['addListener']>[0]} */
function suggestNewFilename(item: any, suggest: any) {
  const task: any = [...tasks][0];
  if (!task) {
    suggest();
    return;
  }

  let newFilename = "";
  if (task.options.folder_name) {
    newFilename += `${task.options.folder_name}/`;
  }
  if (task.options.new_file_name) {
    const regex = /(?:\.([^.]+))?$/;
    const fileName: string = item!.filename;
    const extension = regex.exec(fileName)![1];
    const numberOfDigits = task.imagesToDownload.length.toString().length;
    const formattedImageNumber = `${task.numberOfProcessedImages + 1}`.padStart(
      numberOfDigits,
      "0"
    );
    newFilename += `${task.options.new_file_name}${formattedImageNumber}.${extension}`;
  } else {
    newFilename += item.filename;
  }

  suggest({ filename: normalizeSlashes(newFilename) });
  task.next();
}

function normalizeSlashes(filename: string) {
  return filename.replace(/\\/g, "/").replace(/\/{2,}/g, "/");
}

const onMessageListener = function (
  message: any
  // sender: any,
  // sendResponse: any
) {
  switch (message.type) {
    case "bglog":
      console.log(message.obj);
      break;
  }
  return true;
};
chrome.runtime.onMessage.addListener(onMessageListener);

getCookie;

import * as fs from "fs";
import * as path from "path";
import * as urllib from "urllib";
import * as zlib from "zlib";
import * as tf from "@tensorflow/tfjs-node";
import * as hub from "@tensorflow-models/universal-sentence-encoder";
import { createWriteStream, promises as fsPromises } from "fs";
import { Readable } from "stream";
import { UploadFile } from "fastify-multipart";

let recommender: SemanticSearch | null = null;

function downloadPdf(url: string, outputFilePath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    urllib
      .request(url, { streaming: true })
      .pipe(zlib.createGunzip())
      .pipe(createWriteStream(outputFilePath))
      .on("finish", resolve)
      .on("error", reject);
  });
}

function preprocess(text: string): string {
  text = text.replace("\n", " ");
  text = text.replace(/\s+/g, " ");
  return text;
}

function pdfToText(
  filePath: string,
  startPage = 1,
  endPage?: number
): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const doc = new fitz.Document(filePath);
    const totalPages = doc.pageCount;
    if (!endPage || endPage > totalPages) {
      endPage = totalPages;
    }

    const textList: string[] = [];

    for (let i = startPage - 1; i < endPage; i++) {
      const text = doc.loadPage(i).getText("text");
      const preprocessedText = preprocess(text);
      textList.push(preprocessedText);
    }

    doc.close();

    resolve(textList);
  });
}

function textToChunks(
  texts: string[],
  wordLength = 150,
  startPage = 1
): string[] {
  const textToks: string[][] = texts.map((t) => t.split(" "));
  const pageNumbers: number[] = [];
  const chunks: string[] = [];

  for (let idx = 0; idx < textToks.length; idx++) {
    const words = textToks[idx];
    for (let i = 0; i < words.length; i += wordLength) {
      let chunk = words.slice(i, i + wordLength);
      if (
        i + wordLength > words.length &&
        chunk.length < wordLength &&
        textToks.length !== idx + 1
      ) {
        textToks[idx + 1] = chunk.concat(textToks[idx + 1]);
        continue;
      }
      chunk = chunk.join(" ").trim();
      chunk = `[Page no. ${idx + startPage}] "${chunk}"`;
      chunks.push(chunk);
    }
  }

  return chunks;
}

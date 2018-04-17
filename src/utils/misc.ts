import * as fs from 'fs';
import { exec } from 'child_process';

export const walkFolders = (startFolder: string): string[] => {
  let results: string[] = [];
  let list: string[] = fs.readdirSync(startFolder);
  list.forEach((file) => {
    let itemPath = `${startFolder}/${file}`;
    let stat = fs.statSync(itemPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walkFolders(itemPath));
    } else {
      results.push(itemPath);
    }
  });
  return results;
};

export const formatTime = (date: Date) => {
  let hh = ('0' + date.getHours()).slice(-2);
  let mm = ('0' + date.getMinutes()).slice(-2);
  let ss = ('0' + date.getSeconds()).slice(-2);
  return `${hh}:${mm}:${ss}`;
};

export const execPromise = (command: string): Promise<{ stdout: any; stderr: any }> => {
  return new Promise((resolve, reject) => {
    exec(command, (err, stdout, stderr) => {
      if (err) {
        return reject(err);
      }
      resolve({ stdout, stderr });
    });
  });
};

export class Debounce {
  private timers: {
    [key: string]: NodeJS.Timer
  } = {};

  constructor (public delay: number = 100) {}

  public run = (key: string, cb: (...args: any[]) => void) => {
    clearTimeout(this.timers[key]);
    this.timers[key] = setTimeout(cb, this.delay);
  }
}

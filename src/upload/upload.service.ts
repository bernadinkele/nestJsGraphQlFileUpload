import { Injectable } from '@nestjs/common';
import { FirebaseAdmin, InjectFirebaseAdmin } from 'nestjs-firebase';

@Injectable()
export class UploadService {
  constructor(
    @InjectFirebaseAdmin() private readonly firebase: FirebaseAdmin,
  ) {}
  private async streamToBuffer(readableStream): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const chunks = [];
      readableStream.on('data', (data) => {
        if (typeof data === 'string') {
          // Convert string to Buffer assuming UTF-8 encoding
          chunks.push(Buffer.from(data, 'utf-8'));
        } else if (data instanceof Buffer) {
          chunks.push(data);
        } else {
          // Convert other data types to JSON and then to a Buffer
          const jsonData = JSON.stringify(data);
          chunks.push(Buffer.from(jsonData, 'utf-8'));
        }
      });
      readableStream.on('end', () => {
        resolve(Buffer.concat(chunks));
      });
      readableStream.on('error', reject);
    });
  }

  private getExtension(filename: string): string {
    const re = /(?:\.([^.]+))?$/;
    return re.exec(filename)[1];
  }
  private generateFileName(): string {
    return `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  }
  async uploadToFirebase({ file, path, fileName }): Promise<any> {
    const buffer = await this.streamToBuffer(file.createReadStream());
    let fullPath = path + '/';
    fullPath += fileName ? fileName : this.generateFileName();
    fullPath += `.${this.getExtension(file.filename)}`;
    const upload = this.firebase.storage
      .bucket('zormor.appspot.com')
      .file(fullPath);
    await upload.save(buffer, {
      public: true,
    });
    return fullPath;
  }

  async deleteFromFirebase({ path }) {
    //TODO: send to queue
    await this.firebase.storage
      .bucket('zormor.appspot.com')
      .file(path)
      .delete();
    return;
  }
}

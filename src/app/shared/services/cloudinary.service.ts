import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {
  cloudinaryEnv = environment.cloudinary;
  private readonly apiUrl = `https://api.cloudinary.com/v1_1/${this.cloudinaryEnv.cloudName}`;
  meta = {signature: '', timestamp: ''};

  constructor(private http: HttpClient) {
    this.getTimspandSignature().then((res: any) => this.meta = res);
  }

  uploadFile(file: File): Observable<any> {
    const fd = new FormData();
    fd.append('file', file);
    fd.append('api_key', this.cloudinaryEnv.apiKey);
    fd.append('timestamp', `${this.meta.timestamp}`),
    fd.append('signature', `${this.meta.signature}`);
    return this.http.post(`${this.apiUrl}/auto/upload`, fd);
  }

   getTimspandSignature = async () =>  {
    const timestamp = new Date().getTime();
    const message = `timestamp=${timestamp}${this.cloudinaryEnv.secret}`;
    const msgUint8 = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-1', msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return {timestamp, signature: hashHex};
  }
}

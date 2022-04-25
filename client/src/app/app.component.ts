import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  inputData:any = '';
  encryptedData:any = '';
  encodedData:any = '';
  decodedData:any = '';
  decryptedData:any = '';

  constructor(private service: DataService) {};

  encryptData() {
    this.service.getEncryptedData(this.encodedData).subscribe(result => {
      this.encryptedData = result.encryptedMsg;
      console.log(this.encryptedData);
    });
  }

  encodeData() {
    this.service.getEncodedData(this.inputData).subscribe(result => {
      this.encodedData = result.encodedMsg;
      console.log(this.encodedData);
    });
  }

  decodeData() {
    this.service.getDecodedData(this.decryptedData).subscribe(result => {
      this.decodedData = result.decodedMsg;
      console.log(this.decodedData);
    });
  }

  decryptData() {
    this.service.getDecryptedData(this.encryptedData).subscribe(result => {
      this.decryptedData = result.decryptedMsg;
      console.log(this.decryptedData);
    });
  }

  resetData() {
    this.inputData = '';
    this.encryptedData = '';
    this.encodedData = '';
    this.decodedData = '';
    this.decryptedData = '';
  }

}
